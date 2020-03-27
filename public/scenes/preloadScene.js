import config from '/config/config.js';

export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'preloadScene'
    });

  }



  preload() {
    // console.log(this.config.arcade.debug)
    if (config.debug == true){
      console.log("\n\n\t\tThomas's DEBUG MODE ENABLED in config.js\n\n\n");
    }






    // set bounds so the camera won't go outside the game world
    // this.cameras.main.setBounds(0, 0, this.map.widthInPixels, map.heightInPixels);
    // // make the camera follow the player
    // this.cameras.main.startFollow(player);




    // this.load.image('background', 'assets/background.jpg');

    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });


    //PRELOADER
    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    var progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
    var progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    var loadingText = this.add.text(250, 260, "Loading: ", {
      fontSize: '32px',
      fill: '#FFF'
    });




    //fake data to demostrate preloader, load background x times
    this.load.image('background', 'assets/dude.png');
    for (var i = 0; i < 10; i++) {
      this.load.image('background_' + i, 'assets/dude.png');
    }
    this.load.on('progress', this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText: loadingText
    });



    this.load.atlas('tavern', '../assets/tilesets/screens/tavernScreen.png', '../assets/tilesets/screens/tavernScreen.json');

    this.load.image('tavernTitle', '../assets/tilesets/screens/tavernScreen.png');



    this.load.on('complete', this.complete);
    this.load.on('complete', () => this.scene.switch('titleScene'));

    

  }



  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage * 390, 40));

    percentage = percentage * 100;

    this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
    // console.log("P:" + percentage);
    console.log("Preloader: " + Math.round(percentage) + "% ...");
  }

  complete(percentage) {
    var percent = percentage.progress * 100
    if (percent == 100) {
      console.log("Preloader: Complete!");
    } else {
      console.log("Preloader complete() called when percent at: " + percent);
    }
  }


}
