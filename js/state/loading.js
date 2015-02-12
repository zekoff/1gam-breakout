define(['phaser'], function(Phaser) {
    var state = new Phaser.State();
    state.preload = function() {
        // load the preload sprite
    };
    state.create = function() {
        // bind preload sprite and queue other assets for loading
        state.load.spritesheet('coin', 'images/coin_sheet.png', 24, 24);
        state.load.atlas('atlas', 'images/main_atlas.png', 'images/main_atlas.json');
        state.load.image('1','images/levels/test-level.bmp');
        state.load.start();
    };
    state.update = function() {
        if (state.load.hasLoaded) state.game.state.start('title');
    };
    return state;
});