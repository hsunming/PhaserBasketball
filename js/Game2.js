class Game2 extends Phaser.Scene {

  constructor() {
      super({ key: "Game2" });
  } // end constructor   


  // load asset files for our game
  preload() {
  
    // load images
    this.load.image('court2', 'assets/court2.png');
    this.load.image('basket2', 'assets/basket2.png');
    this.load.image('ball', 'assets/ball.png');

    // Load sounds
    this.load.audio('cheering', 'assets/cheering.mp3');

  }

  // executed once, after assets were loaded
  create() {

    // Background image
    let court = this.add.sprite(0, 450, 'court2');
    court.setOrigin(0,0);     // change origin to the top-left of the sprite
    court.setScale(0.95);

    this.message = this.add.text(10, 20, "Click to adjust angle and strength of your shot.", { fontSize: "24px", fill: "#ffffcc" });
    this.message = this.add.text(10, 40, "Release your click to shoot the basketball.", { fontSize: "24px", fill: "#ffffcc" });

    this.xMax = this.sys.game.config.width;
    this.yMax = this.sys.game.config.height;

    this.basket = this.add.image(1100, 300, 'basket2');
    this.basket.setScale(0.5);

    this.ball = this.physics.add.image(100, 600, 'ball');
    this.ball.setScale(0.8);

    // Variables used to help with program flow
    this.clicked = false;
    this.gotLocation = false;

    // Variables to track mouse location
    this.mouseX = 0;
    this.mouseY = 0;

    // Setup line that will show the player the strengh and direction of the shot
    this.graphics = this.add.graphics({ lineStyle: { color: 0x6666ff }, fillStyle: { color: 0x6666ff } });
    this.line = new Phaser.Geom.Line(100, 600, 100, 600);
    this.graphics.strokeLineShape(this.line);

    // Draw square above the basket that player should shoot the ball to
    this.rect = new Phaser.Geom.Rectangle(1085, 240, 20, 20);
    this.graphics.fillRectShape(this.rect);
  }


  // executed on every frame (60 times per second)
  update() {

    // Run this when the user clicks the mouse button and we have not gotten a location
    // to calculate the strengh and direction of the shot
    if (this.input.activePointer.isDown && !this.gotLocation) {
      this.mouseX = this.input.mousePointer.x;
      this.mouseY = this.input.mousePointer.y;

      // Draw line from ball to mouse location
      this.graphics.clear();
      this.line.setTo(100, 600, this.mouseX, this.mouseY);
      this.graphics.strokeLineShape(this.line);
      this.graphics.fillRectShape(this.rect);
      
      // Keep tracked of mouse being clicked
      this.clicked = true;
    }

    // Run this only if mouse has been clicked but no longer down and we have not gotten a location
    // to calculate the strength and direction of the shot
    if (!this.input.activePointer.isDown && this.clicked && !this.gotLocation) {
      this.gotLocation = true;
      console.log("up");
      console.log(this.mouseX);
      console.log(this.mouseY);
      this.ball.body.gravity.y = 200;
      this.graphics.clear();
      this.graphics.fillRectShape(this.rect);
    }

    // Run this once we gotten a location and we can use it to calculate the strength and direction
    // of the shot and we will start moving the ball according to the mouse click release location
    if (this.gotLocation) {
      this.velocityX = this.mouseX - 100;
      this.velocityY = this.mouseY - 600;
      console.log("XY:")
      console.log(this.velocityX);
      console.log(this.velocityY);
      console.log(this.velocityX * 0.03);
      console.log(this.velocityY * 0.03);
      this.ball.x += this.velocityX * 0.03
      this.ball.y += this.velocityY * 0.03

      // If the center of the ball touches the square above the basket, player wins.
      if ((this.ball.x > 1085) && (this.ball.x < 1105) && (this.ball.y < 250) && (this.ball.y > 230)) {
        let cheering = this.sound.add('cheering');
        cheering.play();
        this.scene.start("Won");
      }
    }

    // If the ball goes out of bounds, the player looses
    if ((this.ball.x > this.xMax) || (this.ball.x < 0) || (this.ball.y < 0) || (this.ball.y > this.yMax)) {
      this.scene.start("Lost");
    }
  }
}
