const sqlite3 = require('sqlite3').verbose();

// Créer une nouvelle base de données SQLite
const db = new sqlite3.Database('./database.sqlite');

// Créer la table "score"
db.run(`
CREATE TABLE IF NOT EXISTS user (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    pseudo TEXT NOT NULL UNIQUE,
    mail TEXT UNIQUE,
    pwd TEXT NOT NULL,
    score INTEGER
 )
`);

// Fermer la connexion à la base de données
db.close();
