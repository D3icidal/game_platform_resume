// import 'phaser';

export default {
  type: Phaser.AUTO,
  // parent: ‘platform-resume',
  width: 800,
  height: 600,
  centerX: 400,
  centerY: 300,
  // parent: "game-container",
  pixelArt: true,
  debug: true, //My own debugging features, not phasers
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: .4,
        x: 0
      },
      debug: {
        showBody: true,
        showStaticBody: true
      }
    }
  },
  plugins: {
    scene: [{
      plugin: PhaserMatterCollisionPlugin, // The plugin class
      key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
      mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
    }]
  },
  audio: {
    disableWebAudio: true
  }
};


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
//     // preload: p
