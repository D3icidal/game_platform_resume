import config from '/config/config.js';
import Player from "../scripts/player.js";

export default class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameScene'
    });
    // var platform = this.platform;
    // var stars = this.stars
    // var player = this.player;
    // var cursors = this.cursors;
    // var bombs = this.bombs;
    // var scoreText = this.scoreText;
    // var collectStar = this.collectStar;
    // var hitBomb = this.hitBomb;
    // var gameOver = this.gameOver;


    // var platform;
    // var stars;
    // var player;
    // var cursors;
    // var bombs;
    // var scoreText;
    // var collectStar;
    // var hitBomb;
    // var gameOver;
  }
  // var player;

  init() {
    console.log("gamescene init")
  };

  preload() {
    console.log("gamescene preload")
    // load images


    this.load.image('cliffsTilesetImage', '../assets/tilesets/platform/tileset.png');
    this.load.image('sky', '../assets/tilesets/platform/sky.png');
    this.load.image('clouds', '../assets/tilesets/platform/clouds.png');
    this.load.image('sea', '../assets/tilesets/platform/sea.png');
    this.load.image('island', '../assets/tilesets/platform/far-grounds.png');

    this.load.tilemapTiledJSON('tiledTilemap', '../assets/tilesets/platform/resumePlatformerV2.json');

    // this.load.image('player', '../assets/tilesets/actors/adventure.png');
    // this.load.multiatlas('player', '../assets/tilesets/actors/adventure.json', '../assets/tilesets/actors');
    this.load.atlas('player', '../assets/tilesets/actors/adventurer_sprite.png', '../assets/tilesets/actors/adventurer_sprite.json');
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

    //main platform game layer
    const platform = map.createDynamicLayer('MainPlatform_Layer', playformMysticCliffsTileset, 0, 0);

    //overlay layer (ladders, bridges, etc) for playform
    const frontOverlayLayer = map.createDynamicLayer('MainOverlay_Layer', playformMysticCliffsTileset, 0, 0);



    // Set colliding tiles before converting the layer to Matter bodies
    platform.setCollisionByExclusion(-1)
    behindActorLayer.setCollisionByExclusion(-1)
    frontOverlayLayer.setCollisionByExclusion(-1)
    // platform.setCollisionByProperty({ collides: true });
    // behindActorLayer.setCollisionByProperty({ collides: true });
    // frontOverlayLayer.setCollisionByProperty({ collides: true });

    // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
    // haven't mapped out custom collision shapes in Tiled so each colliding tile will get a default
    // rectangle body (similar to AP).
    this.matter.world.convertTilemapLayer(platform);
    this.matter.world.convertTilemapLayer(frontOverlayLayer);
    this.matter.world.convertTilemapLayer(behindActorLayer);
    // this.matter.world.add(platform)

    // set the boundaries of our game world
    // this.physics.world.bounds.width = platform.width;
    // this.physics.world.bounds.height = platform.height;


//
//     PLAYER
//
    const { x, y } = map.findObject("Actor", obj => obj.name === "spawn");
    this.player = new Player(this, x, y);

    // this.matter.world.convertTilemapLayer(this.player);

    //  Our player animations
    // player.setFrame(0);
    var playerIdleFramenames = this.anims.generateFrameNames('player', {
      start: 0,
      end: 3,
      zeroPad: 2,
      prefix: 'adventurer-idle-',
      // suffix: '.png'
    });


    this.anims.create({
      key: 'idle',
      frames: playerIdleFramenames,
      frameRate: 5,
      repeat: -1
    });
    this.player.sprite.anims.play('idle', true)


    //  Input Events
    // this.cursors = this.input.keyboard.createCursorKeys();
    // Track the keys


    // // set background color, so the sky is not black
    // this.cameras.main.setBackgroundColor('#ccccff');

    //  Now var's create some ledges
    // this.platform.create(600, 400, 'ground'


    //  Our player animations, turning, walking left and walking right.
    // this.anims.create({
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers('dude', {
    //     start: 0,
    //     end: 3
    //   }),
    //   frameRate: 10,
    //   repeat: -1
    // });
    //
    // this.anims.create({
    //   key: 'turn',
    //   frames: [{
    //     key: 'dude',
    //     frame: 4
    //   }],
    //   frameRate: 20
    // });
    //
    // this.anims.create({
    //   key: 'right',
    //   frames: this.anims.generateFrameNumbers('dude', {
    //     start: 5,
    //     end: 8
    //   }),
    //   frameRate: 10,
    //   repeat: -1
    // });



    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    // this.stars = this.physics.add.group({
    //   key: 'star',
    //   // repeat: 11,
    //   repeat: 3,
    //   setXY: {
    //     x: 12,
    //     y: 0,
    //     stepX: 70
    //   }
    // });

    // this.stars.children.iterate(function(child) {
    //  Give each star a slightly different bounce
    // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    // });

    //  The score
    // this.scoreText = this.add.text(16, 16, 'score: 0', {
    //   fontSize: '32px',
    //   fill: '#000'
    // });

    //  Collide the player and the stars with the platform
    // this.physics.add.collider(this.player, this.platform);
    // this.physics.add.collider(this.stars, this.platform);
    // this.physics.add.collider(this.bombs, this.platform);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    //
    // this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    if (config.debug == true) {
      console.log(playerIdleFramenames)
      console.log("platform:")
      console.log(platform)
      this.add.image(50, 50, 'dude');

      // Visualize all the matter bodies in the world. Slows down FPS
      this.matter.world.createDebugGraphic();
      // console.log(this.matter.world)
      // console.log(this.matter.world)


      //debugger;
    }
  }

  update() {
    console.log("gameScene update");
// debugger;
    // if (gameOver) {
    //   return;
    // }

    // if (this.cursors.left.isDown) {
    //   this.player.setVelocityX(-160);
    //
    //   this.player.anims.play('left', true);
    // } else if (this.cursors.right.isDown) {
    //   this.player.setVelocityX(160);
    //
    //   this.player.anims.play('right', true);
    // } else {
    //   this.player.setVelocityX(0);
    //
    //   this.player.anims.play('turn');
    // }
    //
    // if (this.cursors.up.isDown && this.player.body.touching.down) {
    //   this.player.setVelocityY(-330);
    // }
  }

}
// export default GameScene;
