import config from '/config/config.js';

export default class TitleScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'titleScene'
    });
  }

  preload() {
    console.log("titleScene preload")
    this.load.audio('titleTheme', [
      '../assets/audio/ElvenForest.mp3'
    ]);

  } //end of preloader

  create() {
    console.log("titleScene create")


    //    Audio
    const titleMusic = this.sound.add('titleTheme');
    titleMusic.play();


    // debugger;
    //Background

    const tavernAnims = this.anims.create({
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
    this.background = this.add.sprite(config.width / 2, config.height / 2, 'tavern').play('tavernTitle');
    // debugger

    // this.scene.scene.background = this.add.sprite(config.width/2, config.height/2, 'tavern').play('tavernTitle');
    // this.scene.scene.background = this.add.sprite(tavernTitle);


    var titleTextStyle = {
      font: "32px MedievalSharp",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };
    var titleText = this.add.text(config.width / 2, 100, 'The Hiring Of Thomas', titleTextStyle).setOrigin(0.5);
    titleText.setInteractive({
      useHandCursor: true
    });

    if (config.debug == true) {
      this.timedEvent = this.time.delayedCall(3000, this.titleExit, [], this);
    }

    titleText.on('pointerdown', () => this.clickButton());
  } // END OF CREATE()


  titleExit() {
    var titleExitTween = this.tweens.add({
        targets:  this.titleMusic,
        setVolume:   0,
        duration: 200
    });
    debugger
    titleExitTween.setCallback("onComplete", this.clickButton,[],this);
    titleExitTween.play();
  }

  clickButton() {
    this.scene.switch('gameScene')
  }


  update() {
    // debugger
    // this.scene.scene.background.anims.play("titleTavern", true);

  }

}
