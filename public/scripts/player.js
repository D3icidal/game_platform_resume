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

  }

}
