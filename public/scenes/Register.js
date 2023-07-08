import { config } from "../main.js";

export default class Register extends Phaser.Scene {
  constructor() {
    super({ key: "Register", active: false });
  }

  init(data) {
    document.getElementById("name_register").style.display = "block";
    document.getElementById("pwd_register").style.display = "block";
    document.getElementById("email_register").style.display = "block";
    document.getElementById("pwd_confirm_register").style.display = "block";

    this.resetInteractive = data.reset;
    this.MainMenu = data.context;
  }

  preload() {
    this.load.setPath("../assets/");
    this.load.image("registerBg", "menu-bg-vertical.png");
    this.load.image("btn", "btn.png");
    this.load.image("btnHover", "btnHover.png");
    this.load.image("close", "close.png");
  }

  create() {
    const x = config.width - 100;
    const w = config.width - 2 * x;
    const y = config.height - 140;

    this.background = this.add.image(400, 300, "registerBg");
    this.background.setScale(3.5);

    // Register title
    this.title = this.add.text(275, 85, "REGISTER", {
      fontSize: "50px",
      fill: "#000",
      fontFamily: "Comic Sans MS",
    });

    this.createCloseButton(547, 68, this.clickClose);

    this.createRegisterButtons(x, y, w);
  }

  createCloseButton(x, y, callback) {
    this.close = this.add.image(x, y, "close");
    this.close.setScale(0.75);

    this.close.setInteractive();
    this.close.on("pointerdown", callback, this);
  }

  createRegisterButtons(x, y, w) {
    this.btn_register = this.createButton(
      x + 0.5 * w,
      y + 23,
      this.clickRegister
    );

    this.label_menu = this.add.text(
      this.btn_register.getData("centerX") - 67,
      this.btn_register.getData("centerY") - 25,
      "Register",
      {
        fontSize: "35px",
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

  clickRegister() {
    // Get HTML inputs values
    const name = document.getElementById("name_register_input").value;
    const email = document.getElementById("email_register_input").value;
    const pwd = document.getElementById("pwd_register_input").value;
    const pwd_conf = document.getElementById(
      "pwd_confirm_register_input"
    ).value;

    // Test de la récupération des valeurs
    console.log(name, email, pwd, pwd_conf);

    // @TODO
  }

  clickClose() {
    document.getElementById("name_register").style.display = "none";
    document.getElementById("pwd_register").style.display = "none";
    document.getElementById("email_register").style.display = "none";
    document.getElementById("pwd_confirm_register").style.display = "none";

    document.getElementById("name_register_input").value = "";
    document.getElementById("pwd_register_input").value = "";
    document.getElementById("email_register_input").value = "";
    document.getElementById("pwd_confirm_register_input").value = "";

    this.resetInteractive(this.MainMenu);

    this.scene.stop("Register");
  }
}
