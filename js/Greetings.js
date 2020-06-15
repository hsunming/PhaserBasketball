class Greetings extends Phaser.Scene {

    constructor() {
            super({ key: "Greetings" });
        } // end constructor

    preload() {
        this.load.image("ball", "assets/ball.png");
    }

    // executed once, after assets are loaded
    create() {

        // Add the ball as our logo
        this.ball = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'ball');
        this.ball.setScale(4);
        this.message = this.add.text(10, 20, "Greetings!", { fontSize: "36px", fill: "#ffffcc" });

        this.message = this.add.text(10, 100, "Move the ball with the Left/Right arrow key to the basket to make win.", { fontSize: "24px", fill: "#ffffcc" });
        this.message = this.add.text(10, 130, "Do not bump into a defender.", { fontSize: "24px", fill: "#ffffcc" });
        this.message = this.add.text(10, 160, "Press ENTER to start playing.", { fontSize: "24px", fill: "#ffffcc" });

        this.message = this.add.text(10, 640, "Started with https://gamedevacademy.org/phaser-3-tutorial/", { fontSize: "20px", fill: "#ffffcc" }); 
        
        // Watch for the ENTER key
        let enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        // Start "Game1" when the user press the ENTER key
        if (this.input.keyboard.keys[13].isDown) {
            this.scene.start("Game1");
        }
    }
}
