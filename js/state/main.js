define(['phaser', 'objects/ball'], function(Phaser, Ball) {
    var state = new Phaser.State();
    var paddle;
    var balls = [];
    state.create = function() {
        paddle = state.add.sprite(400, 500, 'atlas', 'paddle');
        paddle.anchor.set(0.5);
        state.physics.enable(paddle, Phaser.Physics.ARCADE);
        state.physics.arcade.setBoundsToWorld();
        paddle.body.immovable = true;
        balls.push(new Ball(state, 400, 450));
        balls[0].body.velocity.set(200,500);
        paddle.inputEnabled = true;
        paddle.input.enableDrag();
        paddle.input.allowVerticalDrag = false;
    };
    state.update = function() {
        state.physics.arcade.collide(balls,paddle);
    };
    return state;
});