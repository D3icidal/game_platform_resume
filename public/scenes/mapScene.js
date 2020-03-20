import config from '/config/config.js';

export default class MapScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'mapScene'
    });

  }


  init() {
    console.log("mapScene init")

  };



  preload() {
    console.log("mapScene preload")
    // this.load.image('fargroundsTile', '../assets/tilesets/platform/far-grounds.png');
    // this.load.image('skyTile', '../assets/tilesets/platform/sky.png');
    // this.load.image('cloudTile', '../assets/tilesets/platform/clouds.png');
    // this.load.image('seaTile', '../assets/tilesets/platform/sea.png');


      // this.load.tilemapCSV('platformMap', '../assets/tilesets/platform/platformMap_MainPlatform.csv');

    this.load.image('tiles', '../assets/tilesets/platform/tileset.png');

    this.load.tilemapTiledJSON('test', '../assets/tilesets/platform/simplifiedTest.json');

    //does images exist
    // console.log(this.textures.exists('tileImageSet'));
  }


  create() {
    console.log("mapScene create");

    const map = this.make.tilemap({ key: "test" });

    const tileset = map.addTilesetImage("tileset", "tiles");

    const platforms = map.createStaticLayer('MainLayer', tileset, 0, 200);
    // debugger;

  	// var tileset = map.addTilesetImage('tileset','tiles');

    // var layer = this.map.createStaticLayer("World", tileset, 0, 0);

    // this.cameras.main.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
    // debugger;

  }

  update() {

  }



  collectStar(player, star) {

  }

  hitBomb(player, bomb) {

  }


  end() {

  }




}

// export default GameScene;
