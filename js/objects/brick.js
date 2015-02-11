define(['phaser', 'config'], function(Phaser, Config) {
    return function(state, type, x, y) {
        var brick = state.add.sprite(x || Config.gameWidth / 2,
            Config.gameHeight / 2, 'atlas', type || 'red');
        brick.anchor.set(0.5);
        state.physics.enable(brick, Phaser.Physics.ARCADE);
        brick.body.immovable = true;
        return brick;
    };
});