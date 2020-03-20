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

    this.load.image('tileImageSet', 'assets/tilesets/platform/tileset.png');

    this.load.tilemapTiledJSON('map', 'assets/tilesets/platform/platformMap.json');

    //does images exist
    console.log(this.textures.exists('tileImageSet'));

  }


  create() {
    console.log("mapScene create")
    if (config.debug == true){
      this.add.image(100, 100, 'star');
    }

    var map = this.make.tilemap({ key: 'map' });
    // var map = this.add.tilemap('tilemap', 'safsafaf');

    var tiles = map.addTilesetImage('tileImageSet', 'tiles');
  	// var tileset = map.addTilesetImage('tileset','tiles');

    var layer = map.createStaticLayer(0, tiles, 0, 0);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

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
