import config from '/config/config.js';
import Player from "../scripts/player.js";

export default class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameScene'
    });

  }
  // var player;

  init() {
    console.log("gamescene init")
  };

  preload() {
    console.log("gamescene preload")
    // load images
  }



  create() {
    console.log("mapScene create");

    const map = this.make.tilemap({
      key: "tiledTilemap"
    });

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
    const behindActorLayer = map.createDynamicLayer('Foreground_BehindActor_Layer', playformMysticCliffsTileset, 0, 0);
    const foregroundDecorLayer = map.createDynamicLayer('Foreground_Decor_Layer', playformMysticCliffsTileset, 0, 0);

    //main platform game layer
    const platform = map.createDynamicLayer('MainPlatform_Layer', playformMysticCliffsTileset, 0, 0);

    //overlay layer (ladders, bridges, etc) for playform
    const frontOverlayLayer = map.createDynamicLayer('MainOverlay_Layer', playformMysticCliffsTileset, 0, 0);
    // COLLISIONS
    // platformCollisionLayer    Platform_Collision_Layer
    // // debugger;


    //
    //    Find every object from collision object layer
    //
    const thingy = map.getObjectLayer("Platform_Collision_Layer").objects.forEach(platformObject => {});

    const collisionPlatformLayer = map.getObjectLayer("Platform_Collision_Layer")
    // console.log(collisionPlatformLayer)

    // Set colliding tiles before converting the layer to Matter bodies
    platform.setCollisionByExclusion(-1)
    frontOverlayLayer.setCollisionByExclusion(-1)
    // platformCollisionLayer.setCollisionByExclusion(-1)
    // behindActorLayer.setCollisionByExclusion(-1)
    // platform.setCollisionByProperty({ collides: true });

    // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We haven't mapped out custom collision shapes in Tiled so each colliding tile will get a default rectangle body (similar to AP).
    this.matter.world.convertTilemapLayer(platform);
    this.matter.world.convertTilemapLayer(frontOverlayLayer);
    this.matter.world.convertTilemapLayer(behindActorLayer);
    // this.matter.world.add(platform)




    //
    //     PLAYER
    //
    const {
      x,
      y
    } = map.findObject("Actor", obj => obj.name === "spawn");

    this.player = new Player(this, x, y);

    // this.cameras.main.setBackgroundColor('#ccccff');

    //  The score
    // this.scoreText = this.add.text(16, 16, 'score: 0', {
    //   fontSize: '32px',
    //   fill: '#000'
    // });

    if (config.debug == true) {
      console.log("platform:")
      console.log(platform)
      this.add.image(50, 50, 'dude');

      // Visualize all the matter bodies in the world. Slows down FPS
      this.matter.world.createDebugGraphic();
      // console.log(this.matter.world)
      // console.log(this.matter.world)

      //debugger;
    }



        //    Audio
        const gameMusic = this.sound.add('gameMusic', {
          loop: true,
          volume: .5,
        });
        gameMusic.play();


    //
    //  Configure WORLD CAMERA etc. Game and camera bounds
    //

    this.matter.world.setBounds(0, 0, platform.width, platform.height + 30);
    this.cameras.main.setBounds(0, 0, platform.width, platform.height);

    // Smoothly follow the player
    this.cameras.main.startFollow(this.player.sprite, true, 0.5, 0.5);


    //zoom camera onto player after the game starts
    this.scene.scene.time.addEvent({
      delay: 200,
      callback: () => (this.gameStartZoom())
    });

  } // End of create


  gameStartZoom() {
    console.log("zooming onto player");
    this.cameras.main.zoomTo(2, 3000);

  }



  addObjectToLayer(platformObject) {
    // this.matter.world.add(platformObject);
  }


  update() {
    // console.log("gameScene update");
    //
    // if (gameOver) {
    //   return;
    // }

    //
    // if (this.cursors.up.isDown && this.player.body.touching.down) {
    //   this.player.setVelocityY(-330);
    // }
  }

}
// export default GameScene;
