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
require(['breakout']);