define(['phaser', 'objects/ball', 'objects/paddle', 'objects/brick', 'config', 'level'],
    function(Phaser, Ball, Paddle, Brick, Config, createLevel) {
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
            createLevel(state, bricks, 'test_level');
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