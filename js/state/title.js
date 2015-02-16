define(['phaser', 'config', 'objects/paddle', 'objects/ball', 'callbacks/compute-reflect-angle'],
    function(Phaser, Config, Paddle, Ball, computeReflectAngle) {
        return function() {
            var state = new Phaser.State();
            var counter = 0;
            var paddle;
            var ball;
            var bouncePoint = 0.5;
            var eventAdded = false;
            state.create = function() {
                state.game.stage.backgroundColor = 0xDDDDFF;
                state.add.text(Config.gameWidth / 2, Config.gameHeight / 2, '1gam-breakout', {
                    font: '20px Arial',
                    fill: '#FFFFFF',
                    align: 'center'
                }).anchor.set(0.5);
                paddle = new Paddle(state);
                ball = new Ball(state, paddle);
                ball.startMovement();
                state.physics.arcade.setBoundsToWorld();
            };
            state.update = function() {
                paddle.x = ball.x - paddle.width * bouncePoint + paddle.width / 2;
                state.physics.arcade.overlap(paddle, ball, function(paddle, ball) {
                    state.physics.arcade.velocityFromAngle(computeReflectAngle(paddle, ball),
                        Config.ballSpeed, ball.body.velocity);
                    // set new bounce location
                    bouncePoint = state.rnd.frac();
                });
                counter += state.time.elapsed;
                if (counter > 3000 && !eventAdded) {
                    eventAdded = true;
                    state.add.text(Config.gameWidth / 2,
                        Config.gameHeight * Config.paddleY, "(Click/touch to start)").anchor.set(0.5);
                    state.input.onDown.add(function() {
                        state.game.state.start('main');
                    });
                }
            };
            return state;
        };
    });