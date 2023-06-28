export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  init() {
    this.meteorTimer = 0;
    this.meteorAcceleration = 1.2;
    this.meteorGenerationTime = null;
    this.explosion = null;
  }

  preload() {
    this.load.setPath("../assets/");
    this.load.image("meteor", "meteor.png");
    this.load.image("background", "sky.png");
    this.load.image("ground", "platform.png");
    this.load.spritesheet('explosion', 'explosion.png', {
      frameWidth: 283, // Largeur d'une image du GIF
      frameHeight: 176, // Hauteur d'une image du GIF
    });
  }

  create() {
    // Ajoute une image de fond
    this.add.image(400, 300, "background").setScale(2);

    // Ajoute le sol
    this.ground = this.physics.add.staticGroup();
    this.ground.create(400, 600, "ground").setScale(2).refreshBody();

    // Crée les météorites
    this.meteors = this.physics.add.group();

    // Crée le texte du score
    this.playText = this.add.text(350, 270, "PLAY", {
      fontSize: "32px",
      fill: "#000",
    });
    this.playText.setInteractive();
    this.playText.on("pointerdown", () => {
      this.scene.start("MainGame");
    });

    // Crée un sprite animé pour le GIF du bonus Slow Time
    this.explosion = this.add.sprite(400, 300, "explosion");
    this.explosion.setScale(0.5);
    this.explosion.setVisible(false);

    // Crée l'animation du GIF
    this.anims.create({
      key: 'explosion-animation',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 5, // Remplacez numFrames par le nombre total d'images du GIF
      }),
      frameRate: 5, // Réglez la vitesse de l'animation selon vos besoins
      repeat: 0, // Ne pas répéter l'animation
    });

    this.explosion.on('animationcomplete', this.hideExplosionGif, this);

    // Crée le texte du score
    this.classementText = this.add.text(300, 330, "CLASSEMENT", {
      fontSize: "32px",
      fill: "#000",
    });
    this.classementText.setInteractive();
    this.classementText.on("pointerdown", () => {
      this.showClassement();
    });

    // Gère les collision entre les météorites et le sol
    this.physics.add.collider(this.meteors, this.ground);
  }

  update(time, delta) {
    // Génère les météorites toutes les secondes
    this.meteorTimer += delta;
    this.meteorGenerationTime = Phaser.Math.Between(200, 1000);
    if (this.meteorTimer > this.meteorGenerationTime) {
      this.generateMeteor();
      this.meteorTimer = 0;
    }

    // Vérifie si les météorites touche le sol
    this.meteors.getChildren().forEach((meteor) => {
      if (meteor.body.touching.down && meteor.active) {
        meteor.destroy();
        this.explosion.setPosition(meteor.x, meteor.y + 25);
        this.explosion.setVisible(true);
        this.explosion.play("explosion-animation");
      }
    });
  }

  generateMeteor() {
    if (!this.gameOver) {
      var x = Phaser.Math.Between(0, 800);
      var meteor = this.meteors.create(x, 0, "meteor").setScale(0.04);
      meteor.setVelocityY(Phaser.Math.Between(200, 900));
      meteor.setCollideWorldBounds(true);
      meteor.setBounce(1);
      meteor.setGravityY(0);
    }
  }

  hideExplosionGif() {
    this.explosion.setVisible(false);
  }

  showClassement() {
    // Show classement scene as overlay
    this.scene.launch("Classement");
    this.playText.disableInteractive();
    this.classementText.disableInteractive();
  }
}