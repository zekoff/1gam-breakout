define(['phaser', 'objects/ball', 'objects/paddle', 'objects/brick', 'config'],
    function(Phaser, Ball, Paddle, Brick, Config) {
        var state = new Phaser.State();
        var paddle;
        var balls;
        var bricks;
        state.create = function() {
            balls = state.add.group();
            bricks = state.add.group();
            paddle = new Paddle(state, true);
            state.physics.arcade.setBoundsToWorld();
            balls.add(new Ball(state, 400, 450));
            balls.forEach(function(ball) {
                ball.body.velocity.set(-100, 500);
            });

            // Experimental level creation
            var level = new Phaser.BitmapData(state.game, 'level', 15, 15);
            level.load('1');
            for (var i = 0; i < 15; i++) {
                for (var j = 0; j < 15; j++) {
                    var pixel = level.getPixel(i, j);
                    var key = null;
                    if (pixel.r && !pixel.g && !pixel.b) key = 'red';
                    else if (!pixel.r && !pixel.g && pixel.b) key = 'blue';
                    else if (pixel.r && pixel.g && !pixel.b) key = 'yellow';
                    else if (!pixel.r && pixel.g && !pixel.b) key = 'green';
                    if (key)
                        bricks.add(new Brick(state, key, i * 64 + 52, j * 32 + 26));
                }
            }
        };
        state.update = function() {
            state.physics.arcade.collide(balls, paddle);
            var cleanup = [];
            state.physics.arcade.collide(bricks, balls, function(brick) {
                cleanup.push(brick);
                // Calling destroy() during iteration causes an exception.
                // Probably the JS/Phaser equivalent of ConcurrentModificationException
            });
            cleanup.forEach(function(brick) {
                brick.destroy();
            });
        };
        return state;
    });