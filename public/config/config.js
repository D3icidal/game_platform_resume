// import 'phaser';

export default {
    type: Phaser.AUTO,
    // parent: ‘platform-resume',
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 300,
          x: 0
        },
        debug: true
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
//     // preload: preload,
//     // create: create,
//     // update: update
//   }
// };
