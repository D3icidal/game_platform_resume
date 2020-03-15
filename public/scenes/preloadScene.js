export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'preloadScene'
    });
  }

  preload() {
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


    //fake data to demostrate preloader, load background 20 times
    this.load.image('background', 'assets/dude.png');
    for (var i = 0; i < 20; i++) {
      this.load.image('background_' + i, 'assets/dude.png');
    }
    this.load.on('progress', this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText: loadingText
    });
    this.load.on('complete', this.complete);
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
