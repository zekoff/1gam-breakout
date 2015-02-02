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
requirejs(['phaser', 'state/title', 'state/main', 'state/loading'],
    function(Phaser, TitleScreen, MainState, Preloader) {
        var game = new Phaser.Game();
        game.state.add('loading', Preloader);
        game.state.add('title', TitleScreen);
        game.state.add('main', MainState);
        game.state.start('loading');
    },
    function() {
        document.write("JS error");
    }
);