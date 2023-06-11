export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  init() {
    this.meteorTimer = 0;
    this.meteorAcceleration = 1.2;
    this.lastMeteorVelocityY = Phaser.Math.Between(100, 300);
    this.lastMeteorVelocityYAccelerated = false;
    this.lastAccelerationTime = 0;
    this.meteorGenerationTime = 1000;
  }

  preload() {
    this.load.setPath("../assets/");
    this.load.image("meteor", "meteor.png");
    this.load.image("background", "sky.png");
    this.load.image("ground", "platform.png");
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

    // Vérifie si les météorites touche le sol
    this.meteors.getChildren().forEach(function (meteor) {
      if (meteor.body.touching.down && meteor.active) {
        meteor.destroy();
      }
    });
  }

  generateMeteor() {
    if (!this.gameOver) {
      var x = Phaser.Math.Between(0, 800);
      var meteor = this.meteors.create(x, 0, "meteor").setScale(0.04);
      meteor.setVelocityY(this.lastMeteorVelocityY);
      meteor.setCollideWorldBounds(true);
      meteor.setBounce(1);
      meteor.setGravityY(0);
      if (this.lastMeteorVelocityYAccelerated) {
        meteor.velocityYBeforeAccelerate = this.lastMeteorVelocityY;
      }
    }
  }

  showClassement() {
    // Show classement scene as overlay
    this.scene.launch("Classement");
    this.playText.disableInteractive();
    this.classementText.disableInteractive();
  }
}