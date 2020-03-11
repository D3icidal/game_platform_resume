// import 'phaser';
import config from '/config/config.js';
import GameScene from '/scenes/gameScene.js';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}

window.game = new Game();
