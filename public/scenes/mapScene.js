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



this.load.image('cliffsTilesetImage', '../assets/tilesets/platform/tileset.png');
this.load.image('sky', '../assets/tilesets/platform/sky.png');
this.load.image('clouds', '../assets/tilesets/platform/clouds.png');
this.load.image('sea', '../assets/tilesets/platform/sea.png');
this.load.image('island', '../assets/tilesets/platform/far-grounds.png');

this.load.tilemapTiledJSON('tiledTilemap', '../assets/tilesets/platform/resumePlatformerV2.json');
  }


  create() {
    console.log("mapScene create");

    const map = this.make.tilemap({ key: "tiledTilemap" });

//    TILESETS (uses loaded images as tilesets, once per layer)
// map.addTilesetImage('tileset_name_in_Tiled', 'phaser_loadImage_name')
    const skyTileset = map.addTilesetImage("sky_tileset", "sky");
    const cloudsTileset = map.addTilesetImage("clouds_tileset", "clouds");
    const seaTileset = map.addTilesetImage("sea_tileset", "sea");
    const islandTileset = map.addTilesetImage("island_tileset", "island");
    const playformMysticCliffsTileset = map.addTilesetImage("mysticcliffs_tileset", "cliffsTilesetImage");


//    LAYERS  - ORDER MATTERS
// (top code is furthest back in layers)
// map.createStaticLayer('LayerName_in_Tiled', phaser_Tileset_name)
    map.createStaticLayer('Sky_Layer', skyTileset, 0, 0);
    map.createStaticLayer('Cloud_Layer', cloudsTileset, 0, 0);
    map.createStaticLayer('Sea_Layer', seaTileset, 0, 0);
    map.createStaticLayer('Island_Layer', islandTileset, 0, 0);
    map.createStaticLayer('MistCloud_Layer', cloudsTileset, 0, 0);

    //foreground behind actor layer (trees decor)
    map.createStaticLayer('Foreground_BehindActor_Layer', playformMysticCliffsTileset, 0, 0);

    //main platform game layer
    const platforms = map.createStaticLayer('MainPlatform_Layer', playformMysticCliffsTileset, 0, 0);

    //overlay layer (ladders, bridges, etc) for playform
    map.createStaticLayer('MainOverlay_Layer', playformMysticCliffsTileset, 0, 0);






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
