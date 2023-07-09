import { config } from "../main.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver", active: false });
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.setPath("../assets/");
    this.load.image("gameoverBg", "gameoverBg.png");
    this.load.image("btn", "btn.png");
    this.load.image("btnHover", "btnHover.png");
  }

  create() {
    const x = config.width - 100;
    const w = config.width - 2 * x;

    const y = config.height - 140;
    const h = config.height - 2 * y;

    this.background = this.add.image(400, 300, "gameoverBg");

    // Game over title
    this.title = this.add.text(180, y + 0.9 * h, "GAME OVER", {
      fontSize: "70px",
      fill: "#000",
      fontFamily: "Comic Sans MS",
    });

    // Score title
    this.text_score = this.add.text(
      x + 0.65 * w,
      y + 0.6 * h,
      "Score : " + this.score,
      {
        fontSize: "35px",
        fill: "#000",
        fontFamily: "Comic Sans MS",
      }
    );

    this.saveScore();

    this.createGameOverButtons(x, y, w, h);
  }


  saveScore() {
    // Appel API pour enregistrer le score
    fetch("/saveScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: this.score,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if(!data.succes) {
          console.log("Aucun utilisateur connecté"); 
        } else {
          // Le score a été enregistré avec succès
          console.log("Score enregistré :", data);
        }
      })
      .catch(error => {
        console.error("Erreur lors de l'enregistrement du score :", error);
      });
  }

  createGameOverButtons(x, y, w, h) {
    this.btn_menu = this.createButton(
      x + 0.75 * w,
      y + 0.23 * h,
      this.clickMenu
    );

    this.label_menu = this.add.text(
      this.btn_menu.getData("centerX") - 50,
      this.btn_menu.getData("centerY") - 28,
      "Menu",
      {
        fontSize: "40px",
        fill: "#FFF",
        fontFamily: "Comic Sans MS",
      }
    );

    this.btn_retry = this.createButton(
      x + 0.25 * w,
      y + 0.23 * h,
      this.clickRetry
    );

    this.label_retry = this.add.text(
      this.btn_retry.getData("centerX") - 50,
      this.btn_retry.getData("centerY") - 28,
      "Retry",
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
    btn.on('pointerover', () => {
      btn.setTexture('btnHover');
    });

    btn.on('pointerout', () => {
      btn.setTexture('btn');
    });
    btn.on("pointerdown", callback, this);

    btn.setData("centerX", centerX);
    btn.setData("centerY", centerY);

    return btn;
  }

  clickMenu() {
    this.sound.stopAll();
    this.events.emit("clickMenu");
  }

  clickRetry() {
    this.sound.stopAll();
    this.events.emit("clickRetry");
  }
}