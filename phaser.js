// Initialisation de Phaser
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

// Variables globales
let player;
let asteroids;
let score = 0;
let scoreText;

function preload() {
  // Chargement des ressources
  this.load.image("player", "chemin/vers/votre/image.png");
  this.load.image("asteroid", "chemin/vers/votre/image.png");
}

function create() {
  // Création des objets du jeu
  player = this.physics.add.sprite(400, 550, "player");
  asteroids = this.physics.add.group({
    key: "asteroid",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  // Configuration des objets du jeu
  player.setCollideWorldBounds(true);

  asteroids.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  // Gestion des collisions
  this.physics.add.collider(player, asteroids, hitAsteroid, null, this);

  // Gestion des entrées utilisateur
  cursors = this.input.keyboard.createCursorKeys();

  // Affichage du score
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#000",
  });
}

function update() {
  // Déplacement du joueur
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  // Gestion de la chute des astéroïdes
  asteroids.children.iterate((child) => {
    if (child.y > 600) {
      child.y = 0;
      child.x = Phaser.Math.Between(0, 800);
      score += 10;
      scoreText.setText("Score: " + score);
    }
  });
}

function hitAsteroid(player, asteroid) {
  // Action à effectuer lorsqu'un astéroïde touche le joueur
  asteroid.disableBody(true, true);
  this.scene.pause();
  // ...
}
