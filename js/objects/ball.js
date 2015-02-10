define(['phaser', 'config'], function(Phaser, Config) {
    return function(state, x, y) {
        var ball = state.add.sprite(x || Config.gameWidth / 2,
            y || Config.gameHeight / 2, 'atlas', 'ball');
        state.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.bounce.set(1);
        ball.body.collideWorldBounds = true;
        return ball;
    };
});