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
requirejs(['phaser', 'state/title', 'state/main'],
    function(Phaser, TitleScreen, MainState) {
        var game = new Phaser.Game();
        game.state.add('title', TitleScreen);
        game.state.add('main', MainState);
        game.state.start('title');
    },
    function() {
        document.write("JS error");
    }
);