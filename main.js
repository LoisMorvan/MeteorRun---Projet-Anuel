import MainMenu from "./MainMenu.js";
import MainGame from "./MainGame.js";
import GameOver from "./GameOver.js";

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
