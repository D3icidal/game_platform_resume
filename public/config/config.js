// import 'phaser';

export default {
  type: Phaser.AUTO,
  // parent: ‘platform-resume',
  width: 800,
  height: 600,
  debug: true, //My own debugging features, not phasers
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: .05,
        x: 0
      },
      debug: {
        showBody: true,
        showStaticBody: true
      }
    }
  },
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
