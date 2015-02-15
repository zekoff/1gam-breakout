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
requirejs(['phaser', 'state/title', 'state/main', 'state/loading', 'config'],
    function(Phaser, TitleScreen, MainState, Preloader, Config) {
        var game = new Phaser.Game(Config.gameWidth, Config.gameHeight);
        game.state.add('loading', Preloader);
        game.state.add('title', TitleScreen);
        game.state.add('main', new MainState('1'));
        game.state.start('loading');
    },
    function() {
        document.write("JS error");
    }
);