define(['phaser', 'objects/brick'], function(Phaser, Brick) {
    return function(state, brickGroup, levelImage) {
        var level = state.make.bitmapData().load(levelImage);
        var key;
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                var pixel = level.getPixel(i, j);
                if (pixel.r && !pixel.g && !pixel.b) key = 'red';
                else if (!pixel.r && !pixel.g && pixel.b) key = 'blue';
                else if (pixel.r && pixel.g && !pixel.b) key = 'yellow';
                else if (!pixel.r && pixel.g && !pixel.b) key = 'green';
                else if (pixel.r && !pixel.g && pixel.b) key = 'purple';
                else if (!pixel.r && !pixel.g && !pixel.b) key = 'stone';
                else key = null;
                if (key)
                    brickGroup.add(new Brick(state, key, i * 64 + 52, j * 32 + 26));
            }
        }
    };
});