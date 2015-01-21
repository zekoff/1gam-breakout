var Phaser = Phaser || {};

var game = new Phaser.Game();
game.state.add('loading',{preload:preload},true);

function preload() {
    console.log('preload');
    // load assets, etc.
    game.state.add('main',{
        create: create,
        update: update
    },true);
}

function create() {
    console.log('create');
    game.add.text(400,300,'worked',{font:'20px Arial', fill:'#FFFFFF',align:'center'}).anchor.set(0.5);
}

function update() {
    
}