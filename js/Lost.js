class Lost extends Phaser.Scene {

    constructor() {
            super({ key: "Lost" });
        } // end constructor

    preload() {
        this.load.image("practice", "assets/practice.jpg");
    }

    // executed once, after assets were loaded
    create() {
        //  A simple background for our game
        this.add.image(580, 350, "practice");
        this.message = this.add.text(10, 40, "YOU LOST! Go Practice...", { fontSize: "36px", fill: "#ffffcc" });

        this.message = this.add.text(10, 640, "Started with https://gamedevacademy.org/phaser-3-tutorial/", { fontSize: "20px", fill: "#ffffcc" });  
    }

}