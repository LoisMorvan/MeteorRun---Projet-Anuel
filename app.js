const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Ouvrir la connexion à la base de données SQLite
const db = new sqlite3.Database('./database.sqlite');
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// API pour récupérer les meilleurs scores des joueurs
app.get('/scores', (req, res) => {
    db.all(`SELECT pseudo, score FROM user 
            WHERE score IS NOT null
            ORDER BY score DESC 
            LIMIT 10`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log("/scores Request successful");
            res.json(rows);
        }
    });
});

// API enregistrer le meilleur score 
app.post('/saveScore', (req, res) => {
    const { id, score } = req.body;

    db.get('SELECT score FROM user WHERE id = ?', id, (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const oldScore = row.score;

            if (oldScore && score <= oldScore) {
                // Le nouveau score est inférieur ou égal à l'ancien score, ne mettez pas à jour la base de données
                res.json({ success: false, message: 'Le score actuel est inférieur ou égal à l\'ancien score.' });
            } else {
                db.run('UPDATE user SET score = ? WHERE id = ?', [score, id], (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        console.log("Database UPDATE :\t user " + id + " ; score " + score);
                        res.json({ success: true, message: 'Score enregistré avec succès.' });
                    }
                });
            }
        }
    });
});

// API pour voir toutes les données dans la base
app.get('/user', (req, res) => {
    db.all('SELECT * FROM user ', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log("/user Request successful");
            res.json(rows);
        }
    });
});

// API pour enregistrer un nouveau user
app.post("/register", async (req, res) => {
    const { pseudo, mail } = req.body;

    db.get('SELECT pseudo FROM user WHERE pseudo = ?', pseudo, async (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            if (row) {
                console.error("database INSERT FAIL : User " + pseudo + " already exist !");
                res.json({ success: false, message: 'User déjà inscrit.' });
            }
            else {
                try {
                    const hashedPassword = await bcrypt.hash(req.body.pwd, 10);
                    db.run('INSERT INTO user (pseudo, mail, pwd) VALUES (?, ?, ?)', [pseudo, mail, hashedPassword], (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'Internal Server Error' });
                        } else {
                            console.log("Database INSERT :\t user " + pseudo + " ; mail " + mail + " ; pwd " + hashedPassword);
                            res.json({ success: true, message: 'User crée avec succès.' });
                        }
                    });
                    
                } catch (e) {
                    console.error(e);
                    res.redirect("/register");
                }
            }
        }
    });
});

// API pour la connexion d'un utilisateur
app.post("/login", async (req, res) => {
    const { pseudo, pwd } = req.body;
  
    db.get('SELECT * FROM user WHERE pseudo = ?', pseudo, async (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (!row) {
          console.error("User " + pseudo + " not found !");
          res.json({ success: false, message: 'Identifiants invalides.' });
        } else {
          try {
            const isPasswordValid = await bcrypt.compare(pwd, row.pwd);
            if (isPasswordValid) {
              // Connexion réussie, créer une session utilisateur
              req.session.user = {
                id: row.id,
                pseudo: row.pseudo,
                mail: row.mail
                // Ajoutez d'autres données utilisateur si nécessaire
              };
              res.json({ success: true, message: 'Connexion réussie.' });
            } else {
              console.error("Invalid password for user " + pseudo + " !");
              res.json({ success: false, message: 'Identifiants invalides.' });
            }
          } catch (e) {
            console.error(e);
            res.redirect("/login");
          }
        }
      }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = db;