import MainMenu from "./scenes/MainMenu";
import MainGame from "./scenes/MainGame";
import GameOver from "./scenes/GameOver";

// Configurer le jeu Phaser
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

// Créer une instance du jeu Phaser
const game = new Phaser.Game(config);