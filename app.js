const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Ouvrir la connexion à la base de données SQLite
const db = new sqlite3.Database('./database.sqlite');

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
            res.json(rows);
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = db;