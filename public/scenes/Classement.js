import { config } from "../main.js";

export default class Classement extends Phaser.Scene {
    constructor() {
        super({ key: "Classement", active: false });
    }

    init() {
        // Récupérer les meilleurs scores des joueurs depuis la base de données
        // Utilisez les appels à la base de données appropriés pour récupérer les scores et les pseudonymes des joueurs
        // Assurez-vous d'adapter cela à votre propre code et configuration de base de données

        // Exemple avec une requête asynchrone à une API fictive
        fetch("/scores")
            .then(response => response.json())
            .then(data => {
                // Utilisez les données récupérées pour mettre à jour le classement
                this.ClassementData = data;
                this.create();
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du classement:", error);
            });
    }

    preload() {
        this.load.setPath("../assets/");
        this.load.image("classementBg", "classementBg.png");
        this.load.image("btn", "btn.png");
        this.load.image("btnHover", "btnHover.png");
    }

    create() {
        const x = config.width - 100;
        const w = config.width - 2 * x;

        const y = config.height - 50;
        const h = config.height - 2 * y;

        this.background = this.add.image(400, 300, "classementBg");

        // Titre du classement
        this.title = this.add.text(320, y + 0.98 * h, "Ranking", {
            fontSize: "40px",
            fill: "#000",
            fontFamily: "Comic Sans MS",
        });

        // Libellés des colonnes
        this.addColumnLabel(220, 120, "Rank");
        this.addColumnLabel(350, 120, "Pseudo");
        this.addColumnLabel(540, 120, "Score");

        if (this.ClassementData && this.ClassementData.length > 0) {
            // Affichage des meilleurs scores
            let yOffset = 150;
            let rank = 1;
            this.ClassementData.forEach((entry) => {
                const rankText = rank.toString();
                const pseudoText = entry.pseudo;
                const scoreText = entry.score.toString();

                this.addEntry(230, yOffset, rankText);
                this.addEntry(320, yOffset, pseudoText);
                this.addEntry(540, yOffset, scoreText);

                yOffset += 30;
                rank++;
            });
        }

        this.createClassementButton(x, y, w, h);
    }

    addColumnLabel(x, y, label) {
        this.add.text(x, y, label, {
            fontSize: "20px",
            fill: "#000",
            fontFamily: "Comic Sans MS",
        });
    }

    addEntry(x, y, text) {
        this.add.text(x, y, text, {
            fontSize: "20px",
            fill: "#000",
            fontFamily: "Comic Sans MS",
        });
    }

    createClassementButton(x, y, w, h) {
        const buttonX = 400;
        const buttonY = 500;

        // Bouton pour revenir au menu principal
        this.btn_menu = this.createButton(buttonX, buttonY, this.clickMenu);

        this.label_menu = this.add.text(
            buttonX,
            buttonY,
            "Menu",
            {
                fontSize: "40px",
                fill: "#FFF",
                fontFamily: "Comic Sans MS",
            }
        ).setOrigin(0.5);
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
        // Revenir au menu principal
        this.scene.stop("Classement");
        this.scene.start("MainMenu");
    }
}
