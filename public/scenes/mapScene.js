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



// WORKING!!!!
    // this.load.image('tiles', '../assets/tilesets/platform/tileset.png');
    // this.load.image('island', '../assets/tilesets/platform/far-grounds.png');
    //
    // this.load.tilemapTiledJSON('test', '../assets/tilesets/platform/simplifiedTest.json');
// end of working example for loading



this.load.image('tiles', '../assets/tilesets/platform/tileset.png');
this.load.image('sky', '../assets/tilesets/platform/sky.png');
this.load.image('clouds', '../assets/tilesets/platform/clouds.png');
this.load.image('sea', '../assets/tilesets/platform/sea.png');
this.load.image('island', '../assets/tilesets/platform/far-grounds.png');

this.load.tilemapTiledJSON('tiledTilemap', '../assets/tilesets/platform/resumePlatformerV2.json');
  }


  create() {
    console.log("mapScene create");

    const map = this.make.tilemap({ key: "tiledTilemap" });


    //sky layer
    const skyImage = map.addTilesetImage("sky_tileset", "sky");
    map.createStaticLayer('Sky_Layer', skyImage, 0, 0);



    //clouds layer
    const cloudsImage = map.addTilesetImage("clouds_tileset", "clouds");
    map.createStaticLayer('Cloud_Layer', cloudsImage, 0, 0);



    // Sea Layer
    const seaTilesetImage = map.addTilesetImage("sea_tileset", "sea");
    const sea_layer = map.createStaticLayer('Sea_Layer', seaTilesetImage, 0, 0);

    //island layer
    const islandImage = map.addTilesetImage("island_tileset", "island");
    map.createStaticLayer('Island_Layer', islandImage, 0, 0);

    //Mist forground clouds layer
    map.createStaticLayer('MistCloud_Layer', cloudsImage, 0, 0);





    const tileset = map.addTilesetImage("mysticcliffs_tileset", "tiles");

    //foreground behind actor layer (trees decor)
    map.createStaticLayer('Foreground_BehindActor_Layer', tileset, 0, 0);

    //main platform game layer
    const platforms = map.createStaticLayer('MainPlatform_Layer', tileset, 0, 0);

    //overlay layer (ladders, bridges, etc) for playform
    map.createStaticLayer('MainOverlay_Layer', tileset, 0, 0);






    // map.createStaticLayer('trees', tileset, 0, 200);



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
