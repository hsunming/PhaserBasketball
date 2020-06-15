// our game's configuration
let config = {
    type: Phaser.AUTO,
    width: 1155,
    height:680,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Greetings, Game1, Game2, Won, Lost]  // will start with first one in array
};

// create the game, and pass it the configuration
let gameScene = new Phaser.Game(config);

