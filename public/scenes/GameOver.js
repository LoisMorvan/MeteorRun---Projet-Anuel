import { config } from "../main.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver", active: false });
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    const x = config.width - 100;
    const w = config.width - 2 * x;

    const y = config.height - 140;
    const h = config.height - 2 * y;

    this.background = this.add.graphics({ x: x, y: y });
    this.background.fillStyle("0xFFF092", 1);
    this.background.fillRoundedRect(0, 0, w, h, 0);

    // Game over title
    this.title = this.add.text(200, y + 0.9 * h, "GAME OVER", {
      fontSize: "75px",
      fill: "#000",
    });

    // Score title
    this.text_score = this.add.text(
      x + 0.7 * w,
      y + 0.6 * h,
      "Score : " + this.score,
      {
        fontSize: "40px",
        fill: "#000",
      }
    );

    this.createGameOverButtons(x, y, w, h);
  }

  createGameOverButtons(x, y, w, h) {
    this.btn_menu = this.createButton(
      x + 0.75 * w,
      y + 0.23 * h,
      this.clickMenu
    );

    this.label_menu = this.add.text(
      this.btn_menu.getData("centerX") - 50,
      this.btn_menu.getData("centerY") - 20,
      "Menu",
      {
        fontSize: "40px",
        fill: "#FFF",
      }
    );

    this.btn_retry = this.createButton(
      x + 0.25 * w,
      y + 0.23 * h,
      this.clickRetry
    );

    this.label_retry = this.add.text(
      this.btn_retry.getData("centerX") - 57,
      this.btn_retry.getData("centerY") - 20,
      "Retry",
      {
        fontSize: "40px",
        fill: "#FFF",
      }
    );
  }

  createButton(centerX, centerY, callback) {
    const w = 4.5 * 50;
    const h = 2 * 50;
    const r = 10;

    const x = centerX - 0.5 * w;
    const y = centerY - 0.5 * h;

    const btn = this.add.graphics({ x: x, y: y });

    btn.fillStyle("0x387155", 1);
    btn.fillRoundedRect(0, 0, w, h, r);

    btn.setDataEnabled();
    btn.setData("centerX", centerX);
    btn.setData("centerY", centerY);

    // Button imputs
    const hit_area = new Phaser.Geom.Rectangle(0, 0, w, h);
    btn.setInteractive(hit_area, Phaser.Geom.Rectangle.Contains);

    // Gestion visuelle du clic sur le bouton
    btn.myDownCallback = () => {
      btn.clear();
      btn.fillStyle("0x60BFB8", 1);
      btn.fillRoundedRect(0, 0, w, h, r);
    };

    btn.myOutCallback = () => {
      btn.clear();
      btn.fillStyle("0x387155", 1);
      btn.fillRoundedRect(0, 0, w, h, r);
    };

    btn.on("pointerup", callback, this);
    btn.on("pointerdown", btn.myDownCallback, this);
    btn.on("pointerout", btn.myOutCallback, this);

    return btn;
  }

  clickMenu() {
    this.events.emit("clickMenu");
  }

  clickRetry() {
    this.events.emit("clickRetry");
  }
}