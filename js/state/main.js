define(['phaser', 'objects/ball', 'objects/paddle', 'objects/brick','objects/pickup', 'callbacks/compute-reflect-angle','callbacks/brick-ball-collision', 'config', 'level'],
    function(Phaser, Ball, Paddle, Brick, Pickup, computeReflectAngle, brickBallCollision, Config, createLevel) {
        var DEBUG = true;
        var state = new Phaser.State();
        var paddle;
        var balls;
        var bricks;
        var pickups;
        state.create = function() {
            balls = state.add.group();
            bricks = state.add.group();
            pickups = state.add.group();
            paddle = new Paddle(state, true);
            state.physics.arcade.setBoundsToWorld();
            balls.add(new Ball(state));
            // Experimental level creation
            createLevel(state, bricks, 'test_level');
        };
        state.update = function() {
            state.physics.arcade.overlap(paddle, balls, function(paddle, ball) {
                state.physics.arcade.velocityFromAngle(computeReflectAngle(paddle, ball), Config.ballSpeed, ball.body.velocity);
            });
            state.physics.arcade.collide(bricks, balls, function(brick) {
                brickBallCollision(state,brick);
                // Chance to spawn pickup
                if (state.rnd.frac() > Config.pickupProbability) return;
                pickups.add(new Pickup(state, brick.body.center.x, brick.body.center.y));
            });
            state.physics.arcade.overlap(paddle, pickups, function(paddle, pickup){
                
            });
        };
        if (DEBUG)
            state.render = function() {
                state.time.advancedTiming = true;
                state.game.debug.text("FPS: " + state.time.fps, 20, 25, '#FFFFFF');
            };
        return state;
    });