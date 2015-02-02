define(['phaser'], function(Phaser) {
    var state = new Phaser.State();
    var paddle;
    var counter = 0;
    state.create = function() {
        state.add.text(400, 300, '1gam-breakout', {
            font: '20px Arial',
            fill: '#FFFFFF',
            align: 'center'
        }).anchor.set(0.5);
        paddle = state.add.sprite(400, 500, 'atlas','paddle');
        paddle.anchor.set(0.5);
    };
    state.update = function() {
        paddle.x = state.rnd.between(300, 500);
        counter += state.time.elapsed;
        if (counter > 3) state.game.state.start('main');
    };
    return state;
});