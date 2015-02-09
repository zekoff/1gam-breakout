define(['phaser'], function(Phaser){
    var Ball = function(state, x, y) {
        var ball = state.add.sprite(x || 0, y || 0, 'atlas', 'ball');
        state.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.bounce.set(1);
        ball.body.collideWorldBounds = true;
        return ball;
    };
    return Ball;
});