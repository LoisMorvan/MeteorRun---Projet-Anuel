import MainMenu from './MainMenu.js';
import MainGame from './MainGame.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ MainMenu, MainGame ],
};

let game = new Phaser.Game(config);