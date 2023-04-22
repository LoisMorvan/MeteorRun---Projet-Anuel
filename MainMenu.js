export default class MainMenu extends Phaser.Scene {

    constructor ()
    {
        super('MainMenu');
    }

    playText;
    meteors;
    meteorTimer = 0;
    meteorAcceleration = 1.2;
    lastMeteorVelocityY = Phaser.Math.Between(100, 300);
    lastMeteorVelocityYAccelerated = false;
    lastAccelerationTime = 0;
    meteorGenerationTime = 1000;

    preload() {
        this.load.setPath('assets/');
        this.load.image('meteor', 'meteor.png');
        this.load.image('background', 'sky.png');
        this.load.image('ground', 'platform.png');
    }

    create() {
        this.add.image(400, 300, 'background').setScale(2);
        this.add.image(400, 600, 'ground').setScale(2);

        // Crée les météorites
        this.meteors = this.physics.add.group();

        // Crée le texte du score
        this.playText = this.add.text(350, 300, 'PLAY', { fontSize: '32px', fill: '#000' });
        this.playText.setInteractive();
        this.input.on('gameobjectdown', () => {

            this.scene.start('MainGame');

        });
    }

    update(time, delta) {

        // Génère les météorites toutes les secondes
        this.meteorTimer += delta;
        if (this.meteorTimer > this.meteorGenerationTime) {
            this.generateMeteor();
            this.meteorTimer = 0;
        }

        // Accélère la chute des météorites toutes les 10 secondes
        if (time - this.lastAccelerationTime > 10000) {
            this.lastAccelerationTime = time;
            this.lastMeteorVelocityY *= this.meteorAcceleration;
            this.lastMeteorVelocityYAccelerated = true;
            this.meteorGenerationTime *= 0.8; // Réduit le temps entre les générations de 20% à chaque accélération
        } else {
            this.lastMeteorVelocityYAccelerated = false;
        }

        // Vérifie si les météorites sont sorties de l'écran en bas
        this.meteors.getChildren().forEach(function (meteor) {
            if (meteor.y > 550 && meteor.active) {
                meteor.destroy();
            }
        });
    }

    generateMeteor() {
        if (!this.gameOver) {
            var x = Phaser.Math.Between(0, 800);
            var meteor = this.meteors.create(x, 0, 'meteor');
            meteor.setVelocityY(this.lastMeteorVelocityY);
            meteor.setCollideWorldBounds(true);
            meteor.setBounce(1);
            meteor.setGravityY(0);
            if (this.lastMeteorVelocityYAccelerated) {
                meteor.velocityYBeforeAccelerate = this.lastMeteorVelocityY;
            }
        }
    }
}
