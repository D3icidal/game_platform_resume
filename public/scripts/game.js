import config from '/config/config.js';
import TitleScene from '/scenes/titleScene.js';
import GameScene from '/scenes/gameScene.js';

// Our game scene
var gameScene = new GameScene();
var titleScene = new TitleScene();

//* Game scene */
// var config = {
//   type: Phaser.AUTO,
//   // parent: ‘platform-resume',
//   width: 800,
//   height: 600,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: {
//         y: 300,
//         x: 0
//       },
//       debug: true
//     }
//   },
//   scene: {
//     // preload: preload,
//     // create: create,
//     // update: update
//   }
// };

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

// Our game scene
var scene = new Phaser.Scene("game");
var game = new Phaser.Game(config);

// load scenes
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// start title
game.scene.start('titleScene');
// game.scene.start('gameScene');


function preload() {

}


function collectStar(player, star) {
  star.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    stars.children.iterate(function(child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}

// function addPlayer(self, playerInfo) {
//   self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
//   if (playerInfo.team === 'blue') {
//     self.ship.setTint(0x0000ff);
//   } else {
//     self.ship.setTint(0xff0000);
//   }
//   self.ship.setDrag(100);
//   self.ship.setAngularDrag(100);
//   self.ship.setMaxVelocity(200);
// }
