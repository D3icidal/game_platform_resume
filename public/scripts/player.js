export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.matter.add.sprite(0, 0, "player", 0);

    const canJump = false;
    const jumpCooldownTimer = null;


    const {
      Body,
      Bodies
    } = Phaser.Physics.Matter.Matter; // Native Matter modules
    var {
      width: orgw,
      height: orgh
    } = this.sprite;
    var w = orgw / 2;
    var h = orgh;
    // const { width: w, height: h } = this.sprite;
    const mainBody = Bodies.rectangle(0, 0, w * 0.5, h, {
      chamfer: {
        radius: 10
      }
    });
    this.sensors = {
      top: Bodies.rectangle(0, -h * 0.5, w * 0.5, 2, {
        isSensor: true
      }),
      left: Bodies.rectangle(-w * 0.4, 0, 2, h * 0.75, {
        isSensor: true
      }),
      right: Bodies.rectangle(w * 0.4, 0, 2, h * 0.75, {
        isSensor: true
      }),
      bottom: Bodies.rectangle(0, h * 0.5, w * 0.25, 2, {
        isSensor: true
      })
    };
    const compoundBody = Body.create({
      parts: [mainBody, this.sensors.top, this.sensors.bottom, this.sensors.left, this.sensors.right],
      frictionStatic: 0,
      frictionAir: 0.02,
      friction: 0.1
    });

    this.sprite
      .setExistingBody(compoundBody)
      .setScale(1)
      .setFixedRotation() // Sets inertia to infinity so the player can't rotate
      .setPosition(x, y);


    this.canJump = true;

    //create and track player collisions
    this.initCollisionTracking();

    //create animation frames
    this.initPlayerAnimations();


    // Track the keys
    this.cursors = this.scene.input.keyboard.createCursorKeys();


    // Before matter's update, reset our record of which surfaces the player is touching.
    scene.matter.world.on("beforeupdate", this.resetTouching, this);


    this.scene.events.on("update", this.update, this);

    this.destroyed = false;
    this.scene.events.on("update", this.update, this);
    this.scene.events.once("shutdown", this.destroy, this);
    this.scene.events.once("destroy", this.destroy, this)

  } //end of create()


  initCollisionTracking() {
    // Track which sensors are touching something
    this.isTouching = {
      left: false,
      right: false,
      ground: false
    };

    // Jumping is going to have a cooldown
    // this.canJump = false;
    // this.jumpCooldownTimer = null;


    this.scene.matterCollision.addOnCollideStart({
      objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
      callback: this.onSensorCollide,
      context: this
    });
    this.scene.matterCollision.addOnCollideActive({
      objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
      callback: this.onSensorCollide,
      context: this
    });
  }


  initPlayerAnimations() {
    //  Our player animations

    //  IDLE
    var playerIdleFramenames = this.scene.anims.generateFrameNames('player', {
      start: 0,
      end: 3,
      zeroPad: 2,
      prefix: 'adventurer-idle-',
      // suffix: '.png'
    });

    this.scene.anims.create({
      key: 'idle',
      frames: playerIdleFramenames,
      frameRate: 5,
      repeat: -1
    });
    this.sprite.anims.play('idle', true)



    //  RUN
    var playerRunFrameNames = this.scene.anims.generateFrameNames('player', {
      start: 0,
      end: 5,
      zeroPad: 2,
      prefix: 'adventurer-run-',
      // suffix: '.png'
    });

    this.scene.anims.create({
      key: 'run',
      frames: playerRunFrameNames,
      frameRate: 5,
      repeat: -1
    });
    this.sprite.anims.play('run', true)


    //  JUMP
    var playerJumpFrameNames = this.scene.anims.generateFrameNames('player', {
      start: 0,
      end: 3,
      zeroPad: 2,
      yoyo: true,
      prefix: 'adventurer-jump-',
      // suffix: '.png'
    });

    this.scene.anims.create({
      key: 'jump',
      frames: playerJumpFrameNames,
      frameRate: 5,
      repeat: 0
    });
    this.sprite.anims.play('jump', true)
  }



  onSensorCollide({
    bodyA,
    bodyB,
    pair
  }) {
    if (bodyB.isSensor) return; // We only care about collisions with physical objects
    if (bodyA === this.sensors.left) {
      this.isTouching.left = true;
      if (pair.separation > 0.5) this.sprite.x += pair.separation - 0.5;
    } else if (bodyA === this.sensors.right) {
      this.isTouching.right = true;
      if (pair.separation > 0.5) this.sprite.x -= pair.separation - 0.5;
    } else if (bodyA === this.sensors.bottom) {
      this.isTouching.ground = true;
    }
  }



  resetTouching() {
    this.isTouching.left = false;
    this.isTouching.right = false;
    this.isTouching.ground = false;
  }
  //
  // freeze() {
  //   this.sprite.setStatic(true);
  // }


  update() {
    if (this.destroyed) return;

    const sprite = this.sprite;
    const velocity = sprite.body.velocity;
    const isOnGround = this.isTouching.ground;
    const isInAir = !isOnGround;

    if (this.destroyed) return;
    // debugger;
    // --- Move the player horizontally ---
    if (this.cursors.left.isDown) // if the left arrow key is down
    {
      this.sprite.setFlipX(true);
      this.sprite.setVelocityX(-2); // move left
    } else if (this.cursors.right.isDown) // if the right arrow key is down
    {
      this.sprite.setFlipX(false);
      this.sprite.setVelocityX(2); // move right
    }
    if ((this.cursors.space.isDown || this.cursors.up.isDown) && isOnGround) {
      this.sprite.setVelocityY(-5); // jump up
    }


    // Limit horizontal speed increases
    if (velocity.x > 7) sprite.setVelocityX(7);
    else if (velocity.x < -7) sprite.setVelocityX(-7);

    if (this.cursors.up.isDown && this.canJump && isOnGround) {
      sprite.setVelocityY(-5);
      console.log("play jump anime")
      sprite.anims.play("jump", true)
      // Add a slight delay between jumps since the bottom sensor will still collide for a few
      // frames after a jump is initiated
      this.canJump = false;
      this.jumpCooldownTimer = this.scene.time.addEvent({
        delay: 2000,
        callback: () => (this.canJump = true)
      });
    }


    // Update the animation/texture based on the state of the player's state
    if (isOnGround) {
      if (sprite.body.velocity.x !== 0) {
        console.log("play run anime")
        sprite.anims.play("run", true)
      } else {
        console.log("play idle anime")
        sprite.anims.play("idle", true)
      }
    } else {
    }

    // debugger


  } //END OF UPDATE()


  destroy() {
    // Clean up any listeners that might trigger events after the player is officially destroyed
    this.scene.events.off("update", this.update, this);
    this.scene.events.off("shutdown", this.destroy, this);
    this.scene.events.off("destroy", this.destroy, this);
    if (this.scene.matter.world) {
      this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
    }
    const sensors = [this.sensors.bottom, this.sensors.left, this.sensors.right];
    this.scene.matterCollision.removeOnCollideStart({
      objectA: sensors
    });
    this.scene.matterCollision.removeOnCollideActive({
      objectA: sensors
    });
    if (this.jumpCooldownTimer) this.jumpCooldownTimer.destroy();

    this.destroyed = true;
    this.sprite.destroy();

  }

}
