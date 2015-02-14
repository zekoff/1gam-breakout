define(['phaser', 'config'], function(Phaser, Config) {
    return function(state, x, y, speed) {
        var ball = state.add.sprite(x || Config.gameWidth / 2,
            y || Config.gameHeight * Config.paddleY - 40, 'atlas', 'ball');
        state.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.bounce.set(1);
        ball.body.collideWorldBounds = true;
        state.physics.arcade.velocityFromAngle(270 + state.rnd.angle() / 4, speed || Config.ballSpeed,
            ball.body.velocity);
        return ball;
    };
});