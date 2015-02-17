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
                state.add.image(0, 0, 'title_screen');
                state.game.stage.backgroundColor = 0xFFFFFF;
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
                    bouncePoint = state.rnd.frac();
                });
                counter += state.time.elapsed;
                if (counter > 3000 && !eventAdded) {
                    eventAdded = true;
                    state.add.text(Config.gameWidth / 2 + 320,
                        Config.gameHeight * Config.paddleY - 100, "(Click/touch to start)", {
                            font: 'bold 24pt Chewy'
                        }).anchor.set(0.5);
                    state.input.onDown.add(function() {
                        state.game.state.start('main');
                    });
                }
            };
            return state;
        };
    });