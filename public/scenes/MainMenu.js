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
    this.load.audio("music", "Run Away Theme.wav");
    this.load.audio("exploSound", "explosion.mp3");
    this.load.image("btn", "btn.png");
    this.load.image("btn_blue", "btn-blue.png");
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

    // Ajoute une musique de fond
    this.music = this.sound.add("music", { loop: true });
    this.music.play();

    this.exploSound = this.sound.add("exploSound", {
      loop: false,
      volume: 0.33,
    });

    // Crée les météorites
    this.anims.create({
      key: "meteor-animation",
      frames: this.anims.generateFrameNumbers("meteor", {
        start: 0,
        end: 8 - 1, // Remplacez numFrames par le nombre total d'images du GIF
      }),
      frameRate: 10, // Réglez la vitesse de l'animation selon vos besoins
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
        this.exploSound.play();
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
    this.scene.launch("Classement", {
      reset: this.resetInteractive,
      context: this,
    });
    this.disableButtons();
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

    this.btn_play.setDepth(1);
    this.label_play.setDepth(1);

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

    this.btn_classement.setDepth(1);
    this.label_classement.setDepth(1);

    const accountX = 35;

    this.btn_login = this.createButton(700, accountX, this.clickLogin, true);

    this.label_login = this.add.text(
      this.btn_login.getData("centerX") - 40,
      this.btn_login.getData("centerY") - 21,
      "Login",
      {
        fontSize: "32px",
        fill: "#FFF",
        fontFamily: "Comic Sans MS",
      }
    );

    this.btn_login.setDepth(1);
    this.label_login.setDepth(1);

    this.btn_register = this.createButton(
      485,
      accountX,
      this.clickRegister,
      true
    );

    this.label_register = this.add.text(
      this.btn_register.getData("centerX") - 62,
      this.btn_register.getData("centerY") - 20,
      "Register",
      {
        fontSize: "32px",
        fill: "#FFF",
        fontFamily: "Comic Sans MS",
      }
    );

    this.btn_register.setDepth(1);
    this.label_register.setDepth(1);
  }

  clickLogin() {
    this.disableButtons();

    this.scene.launch("Login", {
      reset: this.resetInteractive,
      context: this,
    });
  }

  clickRegister() {
    this.disableButtons();

    this.register();

    this.scene.launch("Register", {
      reset: this.resetInteractive,
      context: this,
    });
  }

  createButton(centerX, centerY, callback, account = false) {
    var btn;
    if (account) {
      btn = this.add.image(centerX, centerY, "btn_blue").setScale(1.5);
      btn.setInteractive();
    } else {
      btn = this.add.image(centerX, centerY, "btn").setScale(2);
      btn.setInteractive();
      btn.on("pointerover", () => {
        btn.setTexture("btnHover");
      });

      btn.on("pointerout", () => {
        btn.setTexture("btn");
      });
    }

    btn.on("pointerdown", callback, this);

    btn.setData("centerX", centerX);
    btn.setData("centerY", centerY);

    return btn;
  }

  clickClassement() {
    this.showClassement();
  }

  clickPlay() {
    this.sound.stopAll();
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

  disableButtons() {
    this.btn_play.destroy();
    this.btn_classement.destroy();
    this.btn_login.destroy();
    this.btn_register.destroy();

    this.label_play.destroy();
    this.label_classement.destroy();
    this.label_login.destroy();
    this.label_register.destroy();
  }

  resetInteractive(context) {
    context.createMainMenuButtons();
  }
}
