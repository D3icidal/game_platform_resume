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

  init() {
    console.log("gamescene init")
  };

  preload() {
    console.log("gamescene preload")
    // load images
    this.load.image('dude', '../assets/dude.png');

    //Tilesets
    // this.load.atlas('player', '../assets/tilesets/actors/adventure.png', '../assets/tilesets/actors/adventure.json');

    this.load.image('platformTiles', '../assets/tilesets/platform/tileset.png');
    this.load.image('fargroundsTile', '../assets/tilesets/platform/far-grounds.png');
    this.load.image('skyTile', '../assets/tilesets/platform/sky.png');
    this.load.image('cloudTile', '../assets/tilesets/platform/clouds.png');
    this.load.image('seaTile', '../assets/tilesets/platform/sea.png');

    this.load.tilemapTiledJSON('platformMap', '../assets/tilesets/platform/platformMap.json');
  }

  create() {
    console.log("gamescene create")
    if (config.debug == true){
      this.add.image(50, 50, 'dude');
    }

    // this.socket = io();
    // this.socket.on('currentPlayers', function(players) {
    //   Object.keys(players).forEach(function(id) {
    //     if (players[id].playerId === self.socket.id) {
    //       // addPlayer(self, players[id]);
    //     }
    //   });
    // });

    //this should be in the create area
    const tilemap = this.add.tilemap({key: "map"});
    // const map = this.make.tilemap('platformMap');

    const platformTileset = map.addTilesetImage("mainPlatformTileset", 'platformTiles');
    // const fargrounds = map.addTilesetImage('far_Island','fargroundsTile');
    // const clouds = map.addTilesetImage('clouds', 'cloudTile');
    // const sky = map.addTilesetImage('sky', 'skyTile');
    // const sea = map.addTilesetImage('sea', 'seaTile');

    console.log(this.cache.tilemap.get("platformMap").data);
    console.log(tilemap);

    const platformLayer = map.createStaticLayer("MainPlatform", platformTileset, 50, 50);
    // const skys = map.createStaticLayer("Sky", this.sky, 50, 50);
    // const mainForeground = map.createStaticLayer('Main Foreground', this.tileset, 50, 50);
    // const mainTileLayer = map.createStaticLayer('Main Tile Layer', this.tileset, 50, 50);
    // const behindActor = map.createStaticLayer('Behind Actor', this.tileset, 50, 50);


    if (config.debug == true){
      this.add.image(50, 50, 'dude');
    }

    //  A simple background for our game
    // this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();






    // // set background color, so the sky is not black
    // this.cameras.main.setBackgroundColor('#ccccff');

    //  Now var's create some ledges
    // this.platforms.create(600, 400, 'ground');
    // this.platforms.create(50, 250, 'ground');
    // this.platforms.create(750, 220, 'ground');

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{
        key: 'dude',
        frame: 4
      }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: 'star',
      // repeat: 11,
      repeat: 3,
      setXY: {
        x: 12,
        y: 0,
        stepX: 70
      }
    });

    this.stars.children.iterate(function(child) {

      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  update() {
    console.log("gameScene update");
    // if (gameOver) {
    //   return;
    // }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }



  collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate(function(child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      this.bomb = this.bombs.create(x, 16, 'bomb');
      this.bomb.setBounce(1);
      this.bomb.setCollideWorldBounds(true);
      this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      this.bomb.allowGravity = false;

    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
  }


  end() {

  }




}

// export default GameScene;
