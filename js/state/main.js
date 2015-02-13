define(['phaser', 'objects/ball', 'objects/paddle', 'objects/brick', 'config', 'level'],
    function(Phaser, Ball, Paddle, Brick, Config, createLevel) {
        var DEBUG = true;
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
            createLevel(state, bricks, 'test_level_2');
        };
        state.update = function() {
            state.physics.arcade.collide(balls, paddle);
            state.physics.arcade.collide(bricks, balls, function(brick) {
                brick.damage(1);
                if (brick.health === 2)
                    brick.setFrame(state.cache.getFrameData('atlas').getFrameByName('stone_chipped'));
                else if (brick.health === 1)
                    brick.setFrame(state.cache.getFrameData('atlas').getFrameByName('stone_cracked'));
            });
        };
        if (DEBUG)
            state.render = function() {
                state.time.advancedTiming = true;
                state.game.debug.text("FPS: " + state.time.fps, 20, 25, '#FFFFFF');
            };
        return state;
    });