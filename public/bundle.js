/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/main.js":
/*!************************!*\
  !*** ./public/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config)\n/* harmony export */ });\n/* harmony import */ var _scenes_MainMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scenes/MainMenu */ \"./public/scenes/MainMenu.js\");\n/* harmony import */ var _scenes_MainGame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/MainGame */ \"./public/scenes/MainGame.js\");\n/* harmony import */ var _scenes_GameOver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/GameOver */ \"./public/scenes/GameOver.js\");\n\r\n\r\n\r\n\r\n// Configurer le jeu Phaser\r\nconst config = {\r\n  type: Phaser.AUTO,\r\n  width: 800,\r\n  height: 600,\r\n  physics: {\r\n    default: \"arcade\",\r\n    arcade: {\r\n      gravity: { y: 0 },\r\n      debug: false,\r\n    },\r\n  },\r\n  scene: [_scenes_MainMenu__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _scenes_MainGame__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _scenes_GameOver__WEBPACK_IMPORTED_MODULE_2__[\"default\"]],\r\n};\r\n\r\n// Créer une instance du jeu Phaser\r\nconst game = new Phaser.Game(config);\n\n//# sourceURL=webpack://meteorrun/./public/main.js?");

/***/ }),

/***/ "./public/scenes/GameOver.js":
/*!***********************************!*\
  !*** ./public/scenes/GameOver.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameOver)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ \"./public/main.js\");\n// const { config, Phaser } = require(\"./main.js\");\r\n\r\n\r\nclass GameOver extends Phaser.Scene {\r\n  constructor() {\r\n    super({ key: \"GameOver\", active: false });\r\n  }\r\n\r\n  init(data) {\r\n    this.score = data.score;\r\n  }\r\n\r\n  create() {\r\n    const x = _main_js__WEBPACK_IMPORTED_MODULE_0__.config.width - 100;\r\n    const w = _main_js__WEBPACK_IMPORTED_MODULE_0__.config.width - 2 * x;\r\n\r\n    const y = _main_js__WEBPACK_IMPORTED_MODULE_0__.config.height - 140;\r\n    const h = _main_js__WEBPACK_IMPORTED_MODULE_0__.config.height - 2 * y;\r\n\r\n    this.background = this.add.graphics({ x: x, y: y });\r\n    this.background.fillStyle(\"0xFFF092\", 1);\r\n    this.background.fillRoundedRect(0, 0, w, h, 0);\r\n\r\n    // Game over title\r\n    this.title = this.add.text(200, y + 0.9 * h, \"GAME OVER\", {\r\n      fontSize: \"75px\",\r\n      fill: \"#000\",\r\n    });\r\n\r\n    // Score title\r\n    this.text_score = this.add.text(\r\n      x + 0.7 * w,\r\n      y + 0.6 * h,\r\n      \"Score : \" + this.score,\r\n      {\r\n        fontSize: \"40px\",\r\n        fill: \"#000\",\r\n      }\r\n    );\r\n\r\n    this.createGameOverButtons(x, y, w, h);\r\n  }\r\n\r\n  createGameOverButtons(x, y, w, h) {\r\n    this.btn_menu = this.createButton(\r\n      x + 0.75 * w,\r\n      y + 0.23 * h,\r\n      this.clickMenu\r\n    );\r\n\r\n    this.label_menu = this.add.text(\r\n      this.btn_menu.getData(\"centerX\") - 50,\r\n      this.btn_menu.getData(\"centerY\") - 20,\r\n      \"Menu\",\r\n      {\r\n        fontSize: \"40px\",\r\n        fill: \"#FFF\",\r\n      }\r\n    );\r\n\r\n    this.btn_retry = this.createButton(\r\n      x + 0.25 * w,\r\n      y + 0.23 * h,\r\n      this.clickRetry\r\n    );\r\n\r\n    this.label_retry = this.add.text(\r\n      this.btn_retry.getData(\"centerX\") - 57,\r\n      this.btn_retry.getData(\"centerY\") - 20,\r\n      \"Retry\",\r\n      {\r\n        fontSize: \"40px\",\r\n        fill: \"#FFF\",\r\n      }\r\n    );\r\n  }\r\n\r\n  createButton(centerX, centerY, callback) {\r\n    const w = 4.5 * 50;\r\n    const h = 2 * 50;\r\n    const r = 10;\r\n\r\n    const x = centerX - 0.5 * w;\r\n    const y = centerY - 0.5 * h;\r\n\r\n    const btn = this.add.graphics({ x: x, y: y });\r\n\r\n    btn.fillStyle(\"0x387155\", 1);\r\n    btn.fillRoundedRect(0, 0, w, h, r);\r\n\r\n    btn.setDataEnabled();\r\n    btn.setData(\"centerX\", centerX);\r\n    btn.setData(\"centerY\", centerY);\r\n\r\n    // Button imputs\r\n    const hit_area = new Phaser.Geom.Rectangle(0, 0, w, h);\r\n    btn.setInteractive(hit_area, Phaser.Geom.Rectangle.Contains);\r\n\r\n    // Gestion visuelle du clic sur le bouton\r\n    btn.myDownCallback = () => {\r\n      btn.clear();\r\n      btn.fillStyle(\"0x60BFB8\", 1);\r\n      btn.fillRoundedRect(0, 0, w, h, r);\r\n    };\r\n\r\n    btn.myOutCallback = () => {\r\n      btn.clear();\r\n      btn.fillStyle(\"0x387155\", 1);\r\n      btn.fillRoundedRect(0, 0, w, h, r);\r\n    };\r\n\r\n    btn.on(\"pointerup\", callback, this);\r\n    btn.on(\"pointerdown\", btn.myDownCallback, this);\r\n    btn.on(\"pointerout\", btn.myOutCallback, this);\r\n\r\n    return btn;\r\n  }\r\n\r\n  clickMenu() {\r\n    this.events.emit(\"clickMenu\");\r\n  }\r\n\r\n  clickRetry() {\r\n    this.events.emit(\"clickRetry\");\r\n  }\r\n}\r\n\r\n// module.exports = GameOver;\n\n//# sourceURL=webpack://meteorrun/./public/scenes/GameOver.js?");

/***/ }),

/***/ "./public/scenes/MainGame.js":
/*!***********************************!*\
  !*** ./public/scenes/MainGame.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MainGame)\n/* harmony export */ });\n// const { Phaser } = require('./main.js');\r\n\r\nclass MainGame extends Phaser.Scene {\r\n  constructor() {\r\n    super(\"MainGame\");\r\n  }\r\n\r\n  init() {\r\n    this.score = 0;\r\n    this.gameOver = false;\r\n    this.meteorTimer = 0;\r\n    this.meteorAcceleration = 1.2;\r\n    this.lastMeteorVelocityY = Phaser.Math.Between(100, 300);\r\n    this.lastMeteorVelocityYAccelerated = false;\r\n    this.lastAccelerationTime = 0;\r\n    this.meteorGenerationTime = 1000;\r\n  }\r\n\r\n  preload() {\r\n    this.load.setPath(\"../assets/\");\r\n    this.load.image(\"player\", \"player.png\");\r\n    this.load.image(\"meteor\", \"meteor.png\");\r\n    this.load.image(\"background\", \"sky.png\");\r\n    this.load.image(\"ground\", \"platform.png\");\r\n  }\r\n\r\n  create() {\r\n    // Ajoute une image de fond\r\n    this.add.image(400, 300, \"background\").setScale(2);\r\n\r\n    // Ajoute le sol\r\n    this.ground = this.physics.add.staticGroup();\r\n    this.ground.create(400, 600, \"ground\").setScale(2).refreshBody();\r\n\r\n    // Crée le joueur\r\n    this.player = this.physics.add\r\n      .sprite(400, 500, \"player\")\r\n      .setScale(0.4)\r\n      .setVelocityY(100);\r\n    this.player.setCollideWorldBounds(true);\r\n\r\n    // Crée les météorites\r\n    this.meteors = this.physics.add.group();\r\n\r\n    // Crée les flèches du clavier\r\n    this.cursors = this.input.keyboard.createCursorKeys();\r\n\r\n    // Crée le texte du score\r\n    this.scoreText = this.add.text(16, 16, \"Score: 0\", {\r\n      fontSize: \"32px\",\r\n      fill: \"#000\",\r\n    });\r\n\r\n    // Gère la collision entre les météorites, le joueur et le sol\r\n    this.physics.add.collider(\r\n      this.player,\r\n      this.meteors,\r\n      this.hitMeteor,\r\n      null,\r\n      this\r\n    );\r\n    this.physics.add.collider(this.player, this.ground);\r\n    this.physics.add.collider(this.meteors, this.ground);\r\n  }\r\n\r\n  update(time, delta) {\r\n    // Déplace le joueur selon les flèches du clavier\r\n    if (this.cursors.left.isDown) {\r\n      this.player.setVelocityX(-300);\r\n    } else if (this.cursors.right.isDown) {\r\n      this.player.setVelocityX(300);\r\n    } else {\r\n      this.player.setVelocityX(0);\r\n    }\r\n\r\n    // Met à jour le score\r\n    this.scoreText.setText(\"Score: \" + this.score);\r\n\r\n    // Génère les météorites toutes les secondes\r\n    this.meteorTimer += delta;\r\n    if (this.meteorTimer > this.meteorGenerationTime) {\r\n      this.generateMeteor();\r\n      this.meteorTimer = 0;\r\n    }\r\n\r\n    // Accélère la chute des météorites toutes les 10 secondes\r\n    if (time - this.lastAccelerationTime > 10000) {\r\n      this.lastAccelerationTime = time;\r\n      this.lastMeteorVelocityY *= this.meteorAcceleration;\r\n      this.lastMeteorVelocityYAccelerated = true;\r\n      this.meteorGenerationTime *= 0.8; // Réduit le temps entre les générations de 20% à chaque accélération\r\n    } else {\r\n      this.lastMeteorVelocityYAccelerated = false;\r\n    }\r\n\r\n    // Vérifie si les météorites touche le sol\r\n    this.meteors.getChildren().forEach((meteor) => {\r\n      if (meteor.body.touching.down && meteor.active) {\r\n        meteor.destroy();\r\n        this.score += 1;\r\n      }\r\n    });\r\n  }\r\n\r\n  generateMeteor() {\r\n    if (!this.gameOver) {\r\n      var x = Phaser.Math.Between(0, 800);\r\n      var meteor = this.meteors.create(x, 0, \"meteor\").setScale(0.04);\r\n      meteor.setVelocityY(this.lastMeteorVelocityY);\r\n      meteor.setCollideWorldBounds(true);\r\n      meteor.setBounce(1);\r\n      meteor.setGravityY(0);\r\n      if (this.lastMeteorVelocityYAccelerated) {\r\n        meteor.velocityYBeforeAccelerate = this.lastMeteorVelocityY;\r\n      }\r\n    }\r\n  }\r\n\r\n  hitMeteor() {\r\n    // Arrête le jeu\r\n    if (this.gameOver == true) return;\r\n\r\n    this.physics.pause();\r\n    this.player.setTint(0xff0000);\r\n    this.gameOver = true;\r\n\r\n    this.time.addEvent({\r\n      delay: 1000,\r\n      callback: this.showGameOver,\r\n      callbackScope: this,\r\n    });\r\n  }\r\n\r\n  showGameOver() {\r\n    // Show game over scene as overlay\r\n    this.scoreText.setVisible(false);\r\n    this.scene.launch(\"GameOver\", { score: this.score });\r\n    const panel = this.scene.get(\"GameOver\");\r\n\r\n    panel.events.on(\"clickMenu\", this.handleGoMenu, this);\r\n    panel.events.on(\"clickRetry\", this.handleRetry, this);\r\n  }\r\n\r\n  closeGameOver() {\r\n    this.scene.stop(\"GameOver\");\r\n  }\r\n\r\n  handleGoMenu() {\r\n    this.closeGameOver();\r\n    this.scene.start(\"MainMenu\");\r\n  }\r\n\r\n  handleRetry() {\r\n    this.closeGameOver();\r\n    this.scene.restart();\r\n  }\r\n}\r\n\r\n// module.exports = MainGame;\n\n//# sourceURL=webpack://meteorrun/./public/scenes/MainGame.js?");

/***/ }),

/***/ "./public/scenes/MainMenu.js":
/*!***********************************!*\
  !*** ./public/scenes/MainMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MainMenu)\n/* harmony export */ });\n// const { Phaser } = require('./main.js');\r\n//const Phaser = require('phaser');\r\n\r\nclass MainMenu extends Phaser.Scene {\r\n  constructor() {\r\n    super(\"MainMenu\");\r\n  }\r\n\r\n  init() {\r\n    this.meteorTimer = 0;\r\n    this.meteorAcceleration = 1.2;\r\n    this.lastMeteorVelocityY = Phaser.Math.Between(100, 300);\r\n    this.lastMeteorVelocityYAccelerated = false;\r\n    this.lastAccelerationTime = 0;\r\n    this.meteorGenerationTime = 1000;\r\n  }\r\n\r\n  preload() {\r\n    this.load.setPath(\"../assets/\");\r\n    this.load.image(\"meteor\", \"meteor.png\");\r\n    this.load.image(\"background\", \"sky.png\");\r\n    this.load.image(\"ground\", \"platform.png\");\r\n  }\r\n\r\n  create() {\r\n    // Ajoute une image de fond\r\n    this.add.image(400, 300, \"background\").setScale(2);\r\n\r\n    // Ajoute le sol\r\n    this.ground = this.physics.add.staticGroup();\r\n    this.ground.create(400, 600, \"ground\").setScale(2).refreshBody();\r\n\r\n    // Crée les météorites\r\n    this.meteors = this.physics.add.group();\r\n\r\n    // Crée le texte du score\r\n    this.playText = this.add.text(350, 300, \"PLAY\", {\r\n      fontSize: \"32px\",\r\n      fill: \"#000\",\r\n    });\r\n    this.playText.setInteractive();\r\n    this.playText.on(\"pointerdown\", () => {\r\n      this.scene.start(\"MainGame\");\r\n    });\r\n\r\n    // Gère les collision entre les météorites et le sol\r\n    this.physics.add.collider(this.meteors, this.ground);\r\n  }\r\n\r\n  update(time, delta) {\r\n    // Génère les météorites toutes les secondes\r\n    this.meteorTimer += delta;\r\n    if (this.meteorTimer > this.meteorGenerationTime) {\r\n      this.generateMeteor();\r\n      this.meteorTimer = 0;\r\n    }\r\n\r\n    // Accélère la chute des météorites toutes les 10 secondes\r\n    if (time - this.lastAccelerationTime > 10000) {\r\n      this.lastAccelerationTime = time;\r\n      this.lastMeteorVelocityY *= this.meteorAcceleration;\r\n      this.lastMeteorVelocityYAccelerated = true;\r\n      this.meteorGenerationTime *= 0.8; // Réduit le temps entre les générations de 20% à chaque accélération\r\n    } else {\r\n      this.lastMeteorVelocityYAccelerated = false;\r\n    }\r\n\r\n    // Vérifie si les météorites touche le sol\r\n    this.meteors.getChildren().forEach(function (meteor) {\r\n      if (meteor.body.touching.down && meteor.active) {\r\n        meteor.destroy();\r\n      }\r\n    });\r\n  }\r\n\r\n  generateMeteor() {\r\n    console.log(\"alo\", this.meteors);\r\n\r\n    if (!this.gameOver) {\r\n      var x = Phaser.Math.Between(0, 800);\r\n      var meteor = this.meteors.create(x, 0, \"meteor\").setScale(0.04);\r\n      meteor.setVelocityY(this.lastMeteorVelocityY);\r\n      meteor.setCollideWorldBounds(true);\r\n      meteor.setBounce(1);\r\n      meteor.setGravityY(0);\r\n      if (this.lastMeteorVelocityYAccelerated) {\r\n        meteor.velocityYBeforeAccelerate = this.lastMeteorVelocityY;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n// module.exports = MainMenu;\n\n//# sourceURL=webpack://meteorrun/./public/scenes/MainMenu.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./public/main.js");
/******/ 	
/******/ })()
;