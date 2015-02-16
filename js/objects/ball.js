define(['phaser', 'config'], function(Phaser, Config) {
    return function(state, paddle, speed) {
        var ball = state.add.sprite(0, 0, 'atlas', 'ball');
        ball.anchor.set(0.5);
        state.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.x = paddle.x;
        ball.y = paddle.y - 27;
        ball.body.bounce.set(1);
        ball.body.collideWorldBounds = true;
        ball.checkWorldBounds = true;
        ball.outOfBoundsKill = true;
        ball.startMovement = function() {
            state.physics.arcade.velocityFromAngle(270 + state.rnd.angle() / 4,
                speed || Config.ballSpeed, ball.body.velocity);
        };
        return ball;
    };
});