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
    this.load.image("btn", "btn.png");
    this.load.image("btnHover", "btnHover.png");
    this.load.spritesheet("meteor", "meteor.png", {
      frameWidth: 200,
      frameHeight: 276,
    });
    this.load.image("background", "background.png");
    this.load.image("ground", "ground.png");
    this.load.spritesheet("explosion", "explosion.png", {
      frameWidth: 236, // Largeur d'une image du GIF
      frameHeight: 176, // Hauteur d'une image du GIF
    });
  }

  create() {
    // Ajoute une image de fond
    this.add.image(200, 175, "background").setScale(1);

    // Ajoute le sol
    this.ground = this.physics.add.staticGroup();
    this.ground.create(400, 590, "ground").setScale(2).refreshBody();

    // Crée les météorites
    this.anims.create({
      key: "meteor-animation",
      frames: this.anims.generateFrameNumbers("meteor", {
        start: 0,
        end: 8 - 1, // Remplacez numFrames par le nombre total d'images du GIF
      }),
      frameRate: 8, // Réglez la vitesse de l'animation selon vos besoins
      repeat: -1, // -1 pour répéter l'animation indéfiniment
    });
    this.meteors = this.physics.add.group();

    // Crée le texte du score
    // this.playText = this.add.text(350, 270, "PLAY", {
    //   fontSize: "32px",
    //   fill: "#000",
    // });
    // this.playText.setInteractive();
    // this.playText.on("pointerdown", () => {
    //   this.scene.start("MainGame");
    // });

    // // Crée le texte du score
    // this.classementText = this.add.text(300, 330, "CLASSEMENT", {
    //   fontSize: "32px",
    //   fill: "#000",
    // });
    // this.classementText.setInteractive();
    // this.classementText.on("pointerdown", () => {
    //   this.showClassement();
    // });
    this.createMainMenuButtons();

    // Crée un sprite animé pour le GIF du bonus Slow Time
    this.explosion = this.add.sprite(400, 300, "explosion");
    this.explosion.setScale(0.5);
    this.explosion.setVisible(false);

    // Crée l'animation du GIF
    this.anims.create({
      key: "explosion-animation",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 5, // Remplacez numFrames par le nombre total d'images du GIF
      }),
      frameRate: 10, // Réglez la vitesse de l'animation selon vos besoins
      repeat: 0, // Ne pas répéter l'animation
    });

    this.explosion.on("animationcomplete", this.hideExplosionGif, this);

    // Crée le texte du login
    this.loginText = this.add.text(666, 27, "LOGIN", {
      fontSize: "32px",
      fill: "#000",
    });
    this.loginText.setInteractive();
    this.loginText.on("pointerdown", () => {
      this.scene.launch("Login");
    });

    // Crée le texte d'inscription
    this.registerText = this.add.text(480, 27, "REGISTER", {
      fontSize: "32px",
      fill: "#000",
    });
    this.registerText.setInteractive();
    this.registerText.on("pointerdown", () => {
      this.register();
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
        this.explosion.setPosition(meteor.x, meteor.y + 18);
        this.explosion.setVisible(true);
        this.explosion.play("explosion-animation");
      }
    });
  }

  generateMeteor() {
    if (!this.gameOver) {
      var x = Phaser.Math.Between(0, 800);
      var meteor = this.meteors.create(x, 0, "meteor").setScale(0.22);
      meteor.setVelocityY(Phaser.Math.Between(200, 900));
      meteor.setCollideWorldBounds(true);
      meteor.setBounce(1);
      meteor.setGravityY(0);
      meteor.play("meteor-animation");
    }
  }

  hideExplosionGif() {
    this.explosion.setVisible(false);
  }

  showClassement() {
    // Show classement scene as overlay
    this.scene.launch("Classement");
    this.btn_play.disableInteractive();
    this.btn_classement.disableInteractive();
  }

  createMainMenuButtons() {
    this.btn_play = this.createButton(400, 259, this.clickPlay);

    this.label_play = this.add.text(
      this.btn_play.getData("centerX") - 40,
      this.btn_play.getData("centerY") - 28,
      "Play",
      {
        fontSize: "40px",
        fill: "#FFF",
        fontFamily: "Comic Sans MS",
      }
    );

    this.btn_classement = this.createButton(400, 341, this.clickClassement);

    this.label_classement = this.add.text(
      this.btn_classement.getData("centerX") - 70,
      this.btn_classement.getData("centerY") - 28,
      "Ranking",
      {
        fontSize: "40px",
        fill: "#FFF",
        fontFamily: "Comic Sans MS",
      }
    );
  }

  createButton(centerX, centerY, callback) {
    const btn = this.add.image(centerX, centerY, "btn").setScale(2);
    btn.setInteractive();
    btn.on("pointerover", () => {
      btn.setTexture("btnHover");
    });

    btn.on("pointerout", () => {
      btn.setTexture("btn");
    });
    btn.on("pointerdown", callback, this);

    btn.setData("centerX", centerX);
    btn.setData("centerY", centerY);

    return btn;
  }

  clickClassement() {
    this.showClassement();
  }

  clickPlay() {
    this.scene.start("MainGame");
  }

  register() {
    // Appel API pour enregistrer le score
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo: "Zylau",
        mail: "mailyto@gmail.com",
        pwd: "lemdp2",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Le score a été enregistré avec succès
        console.log("Requête envoyé au back :", data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoie du formulaire :", error);
      });
  }
}
