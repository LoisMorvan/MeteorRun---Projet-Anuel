const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

// Ouvrir la connexion à la base de données SQLite
const db = new sqlite3.Database('./database.sqlite');
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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
    const score = req.body.score;
    
    if (!req.session.user) {
        res.json({ success: false });
        return;
    } else {
        const id = req.session.user.id;
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
                            res.json({ success: true, message: 'Score enregistré avec succès.' });
                        }
                    });
                }
            }
        });
    }
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
    const { pseudo, mail, pwd, pwd_conf } = req.body;

    if (!pseudo || !mail || !pwd || !pwd_conf) {
        res.json({ success: false, message: "Please complete all fields" });
        return;
    }

    if (pwd !== pwd_conf) {
        res.json({ success: false, message: "Passwords do not match" });
        return;
    }

    db.get('SELECT pseudo FROM user WHERE pseudo = ? OR mail = ?', [pseudo, mail], async (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            if (row) {
                console.error("database INSERT FAIL : User " + pseudo + " already exist !");
                res.json({ success: false, message: "Nickname or email is already in use" });
                return;
            }
            else {
                try {
                    const hashedPassword = await bcrypt.hash(pwd, 10);
                    db.run('INSERT INTO user (pseudo, mail, pwd) VALUES (?, ?, ?)', [pseudo, mail, hashedPassword], function (err) {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'Internal Server Error' });
                        } else {
                            const userId = this.lastID; // Récupérer l'ID de l'utilisateur inséré

                            // Inscription réussie, créer une session utilisateur
                            req.session.user = {
                                id: userId, // Utiliser l'ID récupéré
                                pseudo: pseudo,
                                mail: mail
                            };
                            res.json({ success: true });
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

    if (!pseudo || !pwd) {
        res.json({ success: false, message: "Please complete all fields" });
        return;
    }

    db.get('SELECT * FROM user WHERE pseudo = ?', pseudo, async (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (!row) {
                console.error("User " + pseudo + " not found !");
                res.json({ success: false, message: 'Incorrect login information' });
                return;
            } else {
                try {
                    const isPasswordValid = await bcrypt.compare(pwd, row.pwd);
                    if (isPasswordValid) {
                        // Connexion réussie, créer une session utilisateur
                        req.session.user = {
                            id: row.id,
                            pseudo: row.pseudo,
                            mail: row.mail
                        };
                        res.json({ success: true });
                    } else {
                        console.error("Invalid password for user " + pseudo + " !");
                        res.json({ success: false, message: 'Incorrect login information' });
                        return;
                    }
                } catch (e) {
                    console.error(e);
                    res.redirect("/login");
                }
            }
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la suppression de la session :', err);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

app.post('/session', (req, res) => {
    if (req.session.user) {
        res.json({ login: true });
    } else {
        res.json({ login: false });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = db;