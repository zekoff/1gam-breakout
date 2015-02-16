define(['phaser', 'jquery', 'config'], function(Phaser, $, Config) {
    var state = new Phaser.State();
    var finishedFlickrLoading = false;
    var paddleSprite;
    state.preload = function() {
        state.load.atlas('atlas', 'assets/images/main_atlas.png', 'assets/images/main_atlas.json');
    };
    state.create = function() {
        paddleSprite = state.add.sprite(0, Config.gameHeight / 2, 'atlas', 'paddle');
        paddleSprite.x = Config.gameWidth / 2 - paddleSprite.width / 2;
        state.load.setPreloadSprite(paddleSprite);
        state.add.text(Config.gameWidth / 2, Config.gameHeight / 2 - 200,
            "Loading 1gam-breakout...", {
                fill: '#FFFFFF'
            }).anchor.set(0.5);
        state.load.crossOrigin = 'anonymous';
        state.load.spritesheet('coin', 'assets/images/coin_sheet.png', 24, 24);
        state.load.image('paddle_size_up', 'assets/images/paddle_size_up.png');
        state.load.image('paddle_size_down', 'assets/images/paddle_size_down.png');
        state.load.image('fireball', 'assets/images/fireball.png');
        state.load.image('multiball', 'assets/images/multiball.png');
        state.load.audio('coin', 'assets/sounds/coin.ogg');
        state.load.audio('powerup', 'assets/sounds/powerup.ogg');
        state.load.audio('powerdown', 'assets/sounds/powerdown.ogg');
        state.load.audio('brick_hit', 'assets/sounds/brick_hit.ogg');
        state.load.audio('paddle_bounce', 'assets/sounds/paddle_bounce.ogg');
        state.load.audio('gameover', 'assets/sounds/gameover.ogg');
        state.load.atlas('levels', 'assets/images/levels/level_atlas.png', 'assets/images/levels/level_atlas.json');
        var endpoint = 'https://api.flickr.com/services/rest/';
        endpoint += '?method=flickr.galleries.getPhotos';
        endpoint += '&api_key=3283425b51c87f8f31485ce36b6e9b5c';
        endpoint += '&gallery_id=66911286-72157648726328108';
        endpoint += '&format=json&nojsoncallback=1';
        $.get(endpoint).done(function(data) {
            for (var j = 0; j < data.photos.photo.length; j++) {
                var photo = data.photos.photo[j];
                var location = "https://farm";
                location += photo.farm + '.staticflickr.com/' + photo.server + '/';
                location += photo.id + '_' + photo.secret + '.jpg';
                state.load.image('background' + (j + 1).toString(), location);
            }
        }).always(function() {
            state.load.start();
            finishedFlickrLoading = true;
        });
    };
    state.update = function() {
        if (state.load.hasLoaded && finishedFlickrLoading)
            state.game.state.start('title');
    };
    return state;
});