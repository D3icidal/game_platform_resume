import config from '/config/config.js';

export default class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameScene'
    });
    // var platforms = this.platforms;
    // var stars = this.stars
    // var player = this.player;
    // var cursors = this.cursors;
    // var bombs = this.bombs;
    // var scoreText = this.scoreText;
    // var collectStar = this.collectStar;
    // var hitBomb = this.hitBomb;
    // var gameOver = this.gameOver;


    // var platforms;
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
    map.createStaticLayer('Foreground_BehindActor_Layer', playformMysticCliffsTileset, 0, 0);

    //main platform game layer
    const platforms = map.createDynamicLayer('MainPlatform_Layer', playformMysticCliffsTileset, 0, 0);
    // platforms.setCollisionByExclusion([-1]);

    //overlay layer (ladders, bridges, etc) for playform
    map.createStaticLayer('MainOverlay_Layer', playformMysticCliffsTileset, 0, 0);


    platforms.setCollisionByProperty({ collides: true });
    // platforms.setCollisionByProperty({ collides: true });


    this.matter.world.convertTilemapLayer(platforms);





    // set the boundaries of our game world
    // this.physics.world.bounds.width = platforms.width;
    // this.physics.world.bounds.height = platforms.height;


    // The player and its settings
    this.player = this.matter
      .add.sprite(75, 100, 'player');
    this.player.setBounce(0.2); // our player will bounce from items

    const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
    var { width: orgw , height: orgh } = this.player;
    var w = orgw/2;
    var h = orgh;
    const mainBody = Bodies.rectangle(0, 0, w * 0.5, h, { chamfer: { radius: 10 } });
    this.player.sensors = {
      top: Bodies.rectangle(0, -h * 0.5, w * 0.75, 2, { isSensor: true }),
      left: Bodies.rectangle(-w * 0.4, 0, 2, h * 0.75, { isSensor: true }),
      right: Bodies.rectangle(w * 0.4, 0, 2, h * 0.75, { isSensor: true }),
      bottom: Bodies.rectangle(0, h * 0.5, w * 0.75, 2, { isSensor: true })
    };
    const compoundBody = Body.create({
      parts: [mainBody, this.player.sensors.top, this.player.sensors.bottom, this.player.sensors.left, this.player.sensors.right],
      frictionStatic: 0,
      frictionAir: 0.02,
      friction: 0.1
    });

    this.player
      .setExistingBody(compoundBody)
      .setScale(1)
      .setFixedRotation() // Sets inertia to infinity so the player can't rotate
      .setPosition(75, 100);


    // this.matter.world.convertTilemapLayer(player);



    //  Player physics properties. Give the little guy a slight bounce.
    // this.player.setBounce(0.2);
    // this.player.setCollideWorldBounds(true);


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
    this.player.play('idle', true)


    //  Input Events
    // this.cursors = this.input.keyboard.createCursorKeys();
    // Track the keys
    const { LEFT, RIGHT, UP, A, D, W } = Phaser.Input.Keyboard.KeyCodes;
    this.leftInput = new MultiKey(scene, [LEFT, A]);
    this.rightInput = new MultiKey(scene, [RIGHT, D]);
    this.jumpInput = new MultiKey(scene, [UP, W]);

    this.scene.events.on("update", this.update, this);

    // // set background color, so the sky is not black
    // this.cameras.main.setBackgroundColor('#ccccff');

    //  Now var's create some ledges
    // this.platforms.create(600, 400, 'ground'


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

    //  Collide the player and the stars with the platforms
    // this.physics.add.collider(this.player, this.platforms);
    // this.physics.add.collider(this.stars, this.platforms);
    // this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    //
    // this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    if (config.debug == true) {
      console.log(playerIdleFramenames)
      this.add.image(50, 50, 'dude');

      // Visualize all the matter bodies in the world. Note: this will be slow so go ahead and comment
      // it out after you've seen what the bodies look like.
      this.matter.world.createDebugGraphic();


      //debugger;
    }
  }

  update() {
    // console.log("gameScene update");
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
