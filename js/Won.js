class Won extends Phaser.Scene {

    constructor() {
            super({ key: "Won" });
        } // end constructor

    preload() {
        this.load.image("won", "assets/won.png");
    }

    // executed once, after assets were loaded
    create() {
        //  A simple background for our game
        this.add.image(550, 350, "won");
        this.message = this.add.text(10, 40, "YOU WON!", { fontSize: "36px", fill: "#ffffcc" });

        this.message = this.add.text(10, 640, "Started with https://gamedevacademy.org/phaser-3-tutorial/", { fontSize: "20px", fill: "#ffffcc" });
    }
}