class Game1 extends Phaser.Scene {

  constructor() {
      super({ key: "Game1" });
  } // end constructor   


  // some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
  init() {
    this.playerSpeed = 10;
    this.enemyMinX = 50;
    this.enemyMaxX = 1105;
    this.enemyMinY = 50;
    this.enemyMaxY = 630;
  }

  // load asset files for our game
  preload() {
  
    // load images
    this.load.image('court', 'assets/court.png');
    this.load.image('defense', 'assets/defense.png');
    this.load.image('basket', 'assets/basket.png');

    this.load.spritesheet('offense', 'assets/offense.png', { frameWidth: 64, frameHeight: 64 });

    // Load sounds
    this.load.audio('cheering', 'assets/cheering.mp3');
  }


// executed once, after assets were loaded
  create() {

    // Background image
    let court = this.add.sprite(0, 0, 'court');
    court.setOrigin(0,0);     // change origin to the top-left of the sprite
    court.setScale(1.5);

    // Watch for left arrow and right arrow
    let upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    let downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    let rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    let leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    // The player and its settings
    this.player = this.physics.add.sprite(40, this.sys.game.config.height / 2, 'offense');
    this.player.setScale(1);

    //  Our player animations, turning, and walking right.
    this.anims.create({
        key: "up",
        frames: [{ key: "offense", frame: 1 }],
        frameRate: 20
    });

      this.anims.create({
        key: "down",
        frames: [{ key: "offense", frame: 2 }],
        frameRate: 20
    });

    this.anims.create({
      key: "left",
      frames: [{ key: "offense", frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: [{ key: "offense", frame: 3 }],
      frameRate: 20
    });


    // goal
    this.basket = this.add.sprite(1120, 335, 'basket');

    // group of enemies
    this.enemies = this.add.group({
      setScale: { x: 1.5, y: 1.5},
      key: 'defense',
      repeat: 4,
      setXY: {
        x: 200,
        y: 100,
        stepX: 200,
        stepY: 40
      }
    });


    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

    // set speeds
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        // enemy.speedX = Math.random() * 10 + 1;  // real game
        // enemy.speedY = Math.random() * 10 + 1;  // real game
        enemy.speedX = Math.random() * 1 + 1;  // slowed down for debugging
        enemy.speedY = Math.random() * 1 + 1;  // slowed down for debugging
      }, this);

  }


  // executed on every frame (60 times per second)
  update() {
  
    // check for up arrow press
    if (this.input.keyboard.keys[38].isDown) {
      this.player.y -= this.playerSpeed;
      this.player.anims.play("up", true);
    }
    // check for down arrow press
    else if (this.input.keyboard.keys[40].isDown)
    {
      this.player.y += this.playerSpeed;
      this.player.anims.play("down", true);
    }
    // check for left arrow press
    else if (this.input.keyboard.keys[37].isDown)
    {
      this.player.x -= this.playerSpeed;
      this.player.anims.play("left", true);
    }
    // check for right arrow press
    else if (this.input.keyboard.keys[39].isDown)
    {
      this.player.x += this.playerSpeed;
      this.player.anims.play("right", true);
    }
    else{
      this.player.anims.play("right");
    }


  // enemy movement
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;
  
    for (let i = 0; i < numEnemies; i++) {
      // move defense
      enemies[i].y += enemies[i].speedY;
      // enemies[i].x += Math.floor(Math.random() * Math.floor(6)) - 3;
      enemies[i].x += enemies[i].speedX;

      // reverse movement if reached the edges
      if (enemies[i].y >= this.enemyMaxY && enemies[i].speedY > 0) {
        enemies[i].speedY *= -1;
      } else if (enemies[i].y <= this.enemyMinY && enemies[i].speedY < 0) {
        enemies[i].speedY *= -1;
      }

      if (enemies[i].x >= this.enemyMaxX && enemies[i].speedX > 0) {
        enemies[i].speedX *= -1;
      } else if (enemies[i].x <= this.enemyMinX && enemies[i].speedX < 0) {
        enemies[i].speedX *= -1;
      }

      // defense collision
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
        this.scene.start("Lost");  // jump to scene with that key name
      };
      
    }

    // basket collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.basket.getBounds())) {
      let cheering = this.sound.add('cheering');
      cheering.play();
      let enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

      this.message = this.add.text(10, 160, "You scored. Press ENTER to play next game.", { fontSize: "24px", fill: "#ffffcc" });

      if (this.input.keyboard.keys[13].isDown) {
        this.sound.stopAll();
        this.scene.start("Game2");
      }
    }
  };
  
}
