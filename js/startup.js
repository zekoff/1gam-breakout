/* global requirejs */
requirejs.config({
    baseUrl: './js',
    shim: {
        'phaser': {
            exports: 'Phaser'
        }
    },
    paths: {
        phaser: ['https://cdnjs.cloudflare.com/ajax/libs/phaser/2.2.2/phaser.min']
    }
});
requirejs(['game', 'state/title'],
    function(Game, TitleScreen) {
        Game.state.add('title', TitleScreen, true);
    },
    function() {
        document.write("JS error");
    }
);