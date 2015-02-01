define(['phaser'], function(Phaser) {
    var state = new Phaser.State();
    var paddle;
    state.preload = function() {
        state.load.image('paddle', 'images/paddle.png');
        console.log("finished preload");
    };
    state.create = function() {
        console.log('create');
        state.add.text(400, 300, '1gam-breakout', {
            font: '20px Arial',
            fill: '#FFFFFF',
            align: 'center'
        }).anchor.set(0.5);
        paddle = state.add.sprite(400, 500, 'paddle').anchor.set(0.5);
    };
    state.update = function() {
        paddle.x = state.rnd.between(300, 500);
    };
    return state;
});