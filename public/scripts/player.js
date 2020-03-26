export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.matter.add.sprite(0, 0, "player", 0);
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
      top: Bodies.rectangle(0, -h * 0.5, w * 0.75, 2, {
        isSensor: true
      }),
      left: Bodies.rectangle(-w * 0.4, 0, 2, h * 0.75, {
        isSensor: true
      }),
      right: Bodies.rectangle(w * 0.4, 0, 2, h * 0.75, {
        isSensor: true
      }),
      bottom: Bodies.rectangle(0, h * 0.5, w * 0.75, 2, {
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

    // Track which sensors are touching something
    this.isTouching = {
      left: false,
      right: false,
      ground: false
    };

    // Jumping is going to have a cooldown
    // this.canJump = true;
    // this.jumpCooldownTimer = null;

    // Before matter's update, reset our record of which surfaces the player is touching.
    scene.matter.world.on("beforeupdate", this.resetTouching, this);

    scene.matterCollision.addOnCollideStart({
      objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
      callback: this.onSensorCollide,
      context: this
    });
    scene.matterCollision.addOnCollideActive({
      objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
      callback: this.onSensorCollide,
      context: this
    });

    // Track the keys

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.events.on("update", this.update, this);
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
    const sprite = this.sprite;
    const velocity = sprite.body.velocity;
// debugger;
    if (this.destroyed) return;
    // debugger;
    // --- Move the player horizontally ---
    if (this.cursors.left.isDown) // if the left arrow key is down
    {
      console.log("left key")
      this.sprite.setVelocityY(-200); // move left
    } else if (this.cursors.right.isDown) // if the right arrow key is down
    {
      this.sprite.setVelocityX(200); // move right
    }
    if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.sprite.body.onFloor()) {
      this.sprite.body.setVelocityY(-500); // jump up
    }

    // Limit horizontal speed, without this the player's velocity would just keep increasing to
    // absurd speeds. We don't want to touch the vertical velocity though, so that we don't
    // interfere with gravity.
    if (velocity.x > 7) sprite.setVelocityX(7);
    else if (velocity.x < -7) sprite.setVelocityX(-7);

    // --- Move the player vertically ---
    //
    // if (isJumpKeyDown && this.canJump && isOnGround) {
    //   sprite.setVelocityY(-11);
    //
    //   // Add a slight delay between jumps since the bottom sensor will still collide for a few
    //   // frames after a jump is initiated
    //   this.canJump = false;
    //   this.jumpCooldownTimer = this.scene.time.addEvent({
    //     delay: 250,
    //     callback: () => (this.canJump = true)
    //   });
    // }

    // Update the animation/texture based on the state of the player's state
    //   if (isOnGround) {
    //     if (sprite.body.force.x !== 0) sprite.anims.play("player-run", true);
    //     else sprite.anims.play("player-idle", true);
    //   } else {
    //     sprite.anims.stop();
    //     sprite.setTexture("player", 10);
    //   }
  }

  destroy() {}

}
