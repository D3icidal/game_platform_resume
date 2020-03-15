export default class TitleScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'titleScene'
    });
  }

  preload() {
    console.log("titleScene preload")
    this.load.image('background', 'assets/background.jpg');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    console.log("titleScene create")
    var bg = this.add.sprite(50, 50, 'dude');
    // bg.setOrigin(0,0);

    var text = this.add.text(100, 100, 'Welcome to my game!');
    text.setInteractive({
      useHandCursor: true
    });
    text.on('pointerdown', () => this.clickButton());
  }

  clickButton() {
    this.scene.switch('gameScene');
  }

}
