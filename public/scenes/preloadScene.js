import config from '/config/config.js';

export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'preloadScene'
    });

  }

  preload() {
    if (config.debug == true) {
      console.log("\n\n\t\tThomas's DEBUG MODE ENABLED in config.js\n\n\n");
    }

    //PRELOADER gfx
    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    let progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
    let progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    let loadingText = this.add.text(config.centerX, 275, "", {
      fontSize: '28px',
      fill: '#FFF'
    }).setOrigin(.5);



    // Loading and complete functions
    this.load.on('progress', this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText: loadingText
    });

    this.load.on('complete', this.complete.bind(this));



    var fakePreloaderData = [this.load.image('first', 'assets/dude.png')]
    //fake data to demostrate preloader, load background x times
    this.load.image('background', 'assets/dude.png');
    for (var i = 0; i < 25; i++) {
      fakePreloaderData.push(this.load.image('background_' + i, 'assets/dude.png'));
    }


    this.load.audio('titleTheme', [
      // '../assets/audio/ElvenForest.mp3'
      '../assets/audio/ElvenForest_Short.ogg'
    ]);


    // this.load.image('background', 'assets/background.jpg');

    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });

    this.load.image('cliffsTilesetImage', '../assets/tilesets/platform/tileset.png');
    this.load.image('sky', '../assets/tilesets/platform/sky.png');
    this.load.image('clouds', '../assets/tilesets/platform/clouds.png');
    this.load.image('sea', '../assets/tilesets/platform/sea.png');
    this.load.image('island', '../assets/tilesets/platform/far-grounds.png');

    this.load.tilemapTiledJSON('tiledTilemap', '../assets/tilesets/platform/resumePlatformerV2.json');

    // this.load.image('player', '../assets/tilesets/actors/adventure.png');
    // this.load.multiatlas('player', '../assets/tilesets/actors/adventure.json', '../assets/tilesets/actors');
    this.load.atlas('player', '../assets/tilesets/actors/adventurer_sprite.png', '../assets/tilesets/actors/adventurer_sprite.json');

    this.load.atlas('tavern', '../assets/tilesets/screens/tavernScreen.png', '../assets/tilesets/screens/tavernScreen.json');

    this.load.image('tavernTitle', '../assets/tilesets/screens/tavernScreen.png');



  }


  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage * 390, 40));

    percentage = percentage * 100;

    this.loadingText.setText("Packing The Saddlebags... " + Math.round(percentage) + "%");
    // console.log("P:" + percentage);



    console.log("Preloader: " + Math.round(percentage) + "% ...");
  }


  complete(percentage) {
    let percent = percentage.progress * 100

    let titleTextStyle = {
      font: "32px MedievalSharp",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };


    // debugger
    let finishedLoadingText = this.add.text(config.centerX, 75, "Are You Ready To Begin?", titleTextStyle).setOrigin(0.5);

    finishedLoadingText.alpha = 0

    this.tweens.add({
      targets: finishedLoadingText,
      alpha: 1,
      ease: 'Linear',
      duration: 2000,
      // onComplete: this.clickButton.bind(this) //need .bind to keep scope
    });

    this.input.on('pointermove', () => this.scene.switch('titleScene'));

  } //complete()






}
