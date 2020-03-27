import config from '/config/config.js';

export default class TitleScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'titleScene'
    });
  }

  preload() {
    console.log("titleScene preload")


  } //end of preloader

  create() {
    console.log("titleScene create")

    var tavernAnims = this.anims.create({
      key: 'tavernTitle',
      frames: this.anims.generateFrameNames('tavern', {
        prefix: 'frame_00_delay-0.15s-',
        start: 0,
        end: 11,
        zeroPad: 2,
        suffix: '.gif'
      }),
      frameRate: 5,
      repeat: -1
    });



    // this.background = this.add.sprite(config.width/2, config.height/2, 'tavern').play('tavernTitle');
    this.background = this.add.sprite(config.width/2, config.height/2, 'tavern').play('tavernTitle');
    // debugger

    // this.scene.scene.background = this.add.sprite(config.width/2, config.height/2, 'tavern').play('tavernTitle');
    // this.scene.scene.background = this.add.sprite(tavernTitle);


    var titleTextStyle = { font: "32px MedievalSharp", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    var titleText = this.add.text(config.width/2, 100, 'The Hiring Of Thomas', titleTextStyle).setOrigin(0.5);
    titleText.setInteractive({
      useHandCursor: true
    });

    if (config.debug == true) {
      // var bg = this.add.sprite(50, 50, 'dude');
      this.timedEvent = this.time.delayedCall(3000, this.clickButton, [], this);
    }

    titleText.on('pointerdown', () => this.clickButton());
  } // END OF CREATE()


  clickButton() {
    this.scene.switch('gameScene');
  }

  debugMapScene() {
    this.scene.switch('mapScene');
  }


  update() {
    // debugger
    // this.scene.scene.background.anims.play("titleTavern", true);

  }

}
