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

    create() {
        const x = config.width - 100;
        const w = config.width - 2 * x;

        const y = config.height - 50;
        const h = config.height - 2 * y;

        this.background = this.add.graphics({ x: x, y: y });
        this.background.fillStyle("0xFFF092", 1);
        this.background.fillRoundedRect(0, 0, w, h, 0);

        // Titre du classement
        this.title = this.add.text(300, y + 0.95 * h, "Classement", {
            fontSize: "40px",
            fill: "#000",
        });

        // Libellés des colonnes
        this.addColumnLabel(220, 120, "Rang");
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
            fontStyle: "bold",
        });
    }

    addEntry(x, y, text) {
        this.add.text(x, y, text, {
            fontSize: "20px",
            fill: "#000",
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
                fontSize: "20px",
                fill: "#FFF",
            }
        ).setOrigin(0.5);
    }


    createButton(centerX, centerY, callback) {
        const btn = this.add.graphics();
        btn.fillStyle("0x387155", 1);
        btn.fillRoundedRect(centerX - 100, centerY - 30, 200, 60, 10);
        btn.setInteractive(new Phaser.Geom.Rectangle(centerX - 100, centerY - 30, 200, 60), Phaser.Geom.Rectangle.Contains);

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
