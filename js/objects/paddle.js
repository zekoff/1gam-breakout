define(['phaser', 'config'], function(Phaser, Config) {
    return function(state, inputEnabled) {
        var paddle = state.add.sprite(Config.gameWidth / 2,
            Config.gameHeight * Config.paddleY, 'atlas', 'paddle');
        paddle.anchor.set(0.5);
        state.physics.enable(paddle, Phaser.Physics.ARCADE);
        paddle.body.immovable = true;
        paddle.body.collideWorldBounds = true;
        if (inputEnabled) {
            paddle.inputEnabled = true;
            paddle.input.enableDrag();
            paddle.input.allowVerticalDrag = false;
        }
        return paddle;
    };
});