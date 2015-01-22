var Phaser = Phaser || {};

var game = new Phaser.Game();
game.state.add('loading',{preload:preload,create:create},true);

function preload() {
    console.log('preload');
    // load assets, etc.
    game.load.image('paddle','images/paddle.png');
    game.state.add('main',{
        create: create,
        update: update
    });
}

function create() {
    console.log('create');
    game.add.text(400,300,'worked',{font:'20px Arial', fill:'#FFFFFF',align:'center'}).anchor.set(0.5);
    game.add.sprite(400,500,'paddle').anchor.set(0.5);
}

function update() {
    
}