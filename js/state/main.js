define(['phaser'], function(Phaser) {
    var state = new Phaser.State();
    var paddle;
    state.create = function() {
        paddle = state.add.sprite(400, 500, 'atlas', 'paddle');
        paddle.anchor.set(0.5);
        state.physics.enable(paddle, Phaser.Physics.ARCADE);
    };
    state.update = function() {
        // Phaser doesn't allow maxvelocity of 0, see physics/arcade/World.js ln 292
        state.physics.arcade.accelerateToPointer(paddle, state.input.activePointer, 1000, 300, 1);
    };
    return state;
});