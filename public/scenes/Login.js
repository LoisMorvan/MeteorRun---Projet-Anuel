import { config } from "../main.js";

export default class Login extends Phaser.Scene {
  constructor() {
    super({ key: "Login", active: false });
  }

  init() {
    document.getElementById("name_login").style.display = "block";
    document.getElementById("pwd_login").style.display = "block";
  }

  preload() {
    this.load.setPath("../assets/");
    this.load.image("loginBg", "menu-bg-vertical.png");
    this.load.image("btn", "btn.png");
    this.load.image("btnHover", "btnHover.png");
  }

  create() {
    const x = config.width - 100;
    const w = config.width - 2 * x;

    const y = config.height - 140;
    const h = config.height - 2 * y;

    this.background = this.add.image(400, 300, "loginBg");
    this.background.setScale(3.5);

    // Game over title
    this.title = this.add.text(180, y + 0.9 * h, "LOGIN", {
      fontSize: "70px",
      fill: "#000",
      fontFamily: "Comic Sans MS",
    });

    this.createGameOverButtons(x, y, w, h);
  }

  createGameOverButtons(x, y, w, h) {
    this.btn_menu = this.createButton(x + 0.5 * w, y, this.clickMenu);

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
  }

  createButton(centerX, centerY, callback) {
    const btn = this.add.image(centerX, centerY, "btn").setScale(1.5);
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

  clickMenu() {
    // @TODO
    this.events.emit("clickMenu");
  }
}
