define(['phaser', 'objects/ball', 'objects/paddle',
        'objects/brick', 'objects/pickup', 'callbacks/compute-reflect-angle',
        'callbacks/brick-ball-collision', 'callbacks/paddle-pickup-collision', 'config',
        'level', 'player-data'
    ],
    function(Phaser, Ball, Paddle,
        Brick, Pickup, computeReflectAngle,
        brickBallCollision, paddlePickupCollision, Config,
        createLevel, playerData) {
        return function makeMain(level) {
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
                createLevel(state, bricks, level);
                var scoreText = state.add.text(Config.gameWidth / 2, 25, null, {
                    fill: '#FFFFFF'
                });
                scoreText.anchor.set(0.5);
                scoreText.update = function() {
                    this.text = "Score: " + playerData.score;
                };
            };
            state.update = function() {
                state.physics.arcade.overlap(paddle, balls, function(paddle, ball) {
                    state.physics.arcade.velocityFromAngle(computeReflectAngle(paddle, ball),
                        Config.ballSpeed, ball.body.velocity);
                    state.add.audio('paddle_bounce').play();
                });
                state.physics.arcade.collide(bricks, balls, function(brick) {
                    brickBallCollision(state, brick);
                    if (brick.health === 0 &&
                        state.rnd.frac() <= Config.pickupProbability)
                        pickups.add(new Pickup(state, brick.body.center.x, brick.body.center.y));
                });
                state.physics.arcade.overlap(paddle, pickups, function(paddle, pickup) {
                    paddlePickupCollision(state, paddle, pickup);
                    pickup.kill();
                });
                if (bricks.total === 0 && pickups.total === 0) {
                    state.game.state.remove('main');
                    state.game.state.add('main',
                        new makeMain((parseInt(level, 10) + 1).toString()));
                    state.game.state.start('main');
                }
            };
            if (DEBUG)
                state.render = function() {
                    state.time.advancedTiming = true;
                    state.game.debug.text("FPS: " + state.time.fps, 20, 25, '#FFFFFF');
                    state.input.keyboard.onDownCallback = function() {
                        state.game.state.remove('main');
                        state.game.state.add('main',
                            new makeMain((parseInt(level, 10) + 1).toString()));
                        state.game.state.start('main');
                    };
                };
            return state;
        };
    });