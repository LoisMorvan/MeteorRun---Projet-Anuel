const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Ouvrir la connexion à la base de données SQLite
const db = new sqlite3.Database('./database.sqlite');

app.use(express.static(path.join(__dirname, 'public')));

// API pour récupérer les meilleurs scores des joueurs
app.get('/scores', (req, res) => {
    db.all('SELECT * FROM user ORDER BY score DESC LIMIT 10', (err, rows) => {
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