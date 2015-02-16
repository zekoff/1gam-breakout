define(['phaser', 'jquery'], function(Phaser, $) {
    var state = new Phaser.State();
    var finishedFlickrLoading = false;
    state.preload = function() {
        // load the preload sprite
    };
    state.create = function() {
        // bind preload sprite and queue other assets for loading
        state.load.crossOrigin = 'anonymous';
        state.load.spritesheet('coin', 'assets/images/coin_sheet.png', 24, 24);
        state.load.atlas('atlas', 'assets/images/main_atlas.png', 'assets/images/main_atlas.json');
        state.load.image('test_level', 'assets/images/levels/test_level.bmp');
        state.load.image('test_level_2', 'assets/images/levels/test_level_2.bmp');
        state.load.image('paddle_size_up', 'assets/images/paddle_size_up.png');
        state.load.image('paddle_size_down', 'assets/images/paddle_size_down.png');
        state.load.image('fireball', 'assets/images/fireball.png');
        state.load.image('multiball', 'assets/images/multiball.png');
        state.load.audio('coin', 'assets/sounds/coin.ogg');
        state.load.audio('powerup', 'assets/sounds/powerup.ogg');
        state.load.audio('powerdown', 'assets/sounds/powerdown.ogg');
        state.load.audio('brick_hit', 'assets/sounds/brick_hit.ogg');
        state.load.audio('paddle_bounce', 'assets/sounds/paddle_bounce.ogg');
        for (var i = 1; i <= 7; i++)
            state.load.image(i, 'assets/images/levels/' + i + '.png');
        state.load.start();
        var endpoint = 'https://api.flickr.com/services/rest/';
        endpoint += '?method=flickr.galleries.getPhotos';
        endpoint += '&api_key=3283425b51c87f8f31485ce36b6e9b5c';
        endpoint += '&gallery_id=66911286-72157648726328108';
        endpoint += '&format=json&nojsoncallback=1';
        $.get(endpoint).done(function(data) {
            for (var j = 0; j < data.photos.photo.length; j++) {
                // var photo = data.photos.photo[j];
                // var location = "https://farm";
                // location += photo.farm + '.staticflickr.com/' + photo.server + '/';
                // location += photo.id + '_' + photo.secret + '.jpg';
                // state.load.image('background' + (j + 1).toString(), location);
            }
        }).always(function() {
            finishedFlickrLoading = true;
        });
    };
    state.update = function() {
        if (state.load.hasLoaded && finishedFlickrLoading)
            state.game.state.start('title');
    };
    return state;
});