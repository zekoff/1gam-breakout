define(['phaser', 'config', 'objects/paddle'], function(Phaser, Config, Paddle) {
    var state = new Phaser.State();
    var counter = 0;
    state.create = function() {
        state.add.text(Config.gameWidth / 2, Config.gameHeight / 2, '1gam-breakout', {
            font: '20px Arial',
            fill: '#FFFFFF',
            align: 'center'
        }).anchor.set(0.5);
        new Paddle(state);
    };
    state.update = function() {
        counter += state.time.elapsed;
        if (counter > 3) state.game.state.start('main');
    };
    return state;
});