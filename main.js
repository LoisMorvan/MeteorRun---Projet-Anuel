import MainMenu from "./MainMenu.js";
import MainGame from "./MainGame.js";
import GameOver from "./GameOver.js";

const sqlite3 = require('sqlite3').verbose();

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [MainMenu, MainGame, GameOver],
};

let game = new Phaser.Game(config);

// Ouvrir une connexion à la base de données SQLite
export const db = new sqlite3.Database('./database.sqlite');