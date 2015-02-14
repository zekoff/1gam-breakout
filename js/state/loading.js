define(['phaser'], function(Phaser) {
    var state = new Phaser.State();
    state.preload = function() {
        // load the preload sprite
    };
    state.create = function() {
        // bind preload sprite and queue other assets for loading
        state.load.spritesheet('coin', 'images/coin_sheet.png', 24, 24);
        state.load.atlas('atlas', 'images/main_atlas.png', 'images/main_atlas.json');
        state.load.image('test_level', 'images/levels/test_level.bmp');
        state.load.image('test_level_2', 'images/levels/test_level_2.bmp');
        state.load.image('paddle_size_up', 'images/paddle_size_up.png');
        state.load.image('paddle_size_down', 'images/paddle_size_down.png');
        state.load.audio('coin','sounds/coin.ogg');
        state.load.audio('powerup','sounds/powerup.ogg');
        state.load.audio('powerdown','sounds/powerdown.ogg');
        state.load.start();
    };
    state.update = function() {
        if (state.load.hasLoaded) state.game.state.start('title');
    };
    return state;
});