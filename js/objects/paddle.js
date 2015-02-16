define(['phaser', 'config'], function(Phaser, Config) {
    return function(state, inputEnabled) {
        var paddle = state.add.sprite(0, 0, 'atlas', 'paddle');
        paddle.anchor.set(0.5);
        state.physics.enable(paddle, Phaser.Physics.ARCADE);
        paddle.x = Config.gameWidth / 2;
        paddle.y = Config.gameHeight * Config.paddleY;
        paddle.body.immovable = true;
        paddle.scale.set(Config.paddleScale, 1);
        if (inputEnabled) {
            paddle.inputEnabled = true;
            paddle.input.enableDrag();
            paddle.input.allowVerticalDrag = false;
        }
        return paddle;
    };
});