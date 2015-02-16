define(['phaser', 'objects/ball', 'objects/paddle',
        'objects/brick', 'objects/pickup', 'callbacks/compute-reflect-angle',
        'callbacks/brick-ball-collision', 'callbacks/paddle-pickup-collision', 'config',
        'level', 'player-data', 'callbacks/show-message'
    ],
    function(Phaser, Ball, Paddle,
        Brick, Pickup, computeReflectAngle,
        brickBallCollision, paddlePickupCollision, Config,
        createLevel, playerData, showMessage) {
        return function makeMain(level) {
            var DEBUG = true;
            var state = new Phaser.State();
            var paddle;
            var balls;
            var bricks;
            var pickups;
            var ballInPlay = false;
            var hud;
            state.create = function() {
                state.game.stage.backgroundColor = 0xDDDDFF;
                var backgroundKey = 'background' + level.toString();
                if (state.cache.checkImageKey(backgroundKey)) {
                    var background = state.add.image(0, 0, backgroundKey);
                    background.alpha = 0.4;
                    background.height = Config.gameHeight;
                    background.width = Config.gameWidth;
                }
                balls = state.add.group();
                bricks = state.add.group();
                pickups = state.add.group();
                hud = state.add.group();
                paddle = new Paddle(state);
                state.physics.arcade.setBoundsToWorld();
                state.physics.arcade.checkCollision.down = false;
                readyBall();
                createLevel(state, bricks, level);
                var scoreText = state.add.text(Config.gameWidth - 5, 25, null, {
                    align: 'right',
                    font: Config.hudTextFont
                }, hud);
                scoreText.anchor.set(1, 0.5);
                scoreText.update = function() {
                    this.text = "Score: " + playerData.score;
                };
                var livesText = state.add.text(5, 25, null, {
                    align: 'left',
                    font: Config.hudTextFont
                }, hud);
                livesText.anchor.set(0, 0.5);
                livesText.update = function() {
                    if (playerData.lives > 0)
                        this.text = "Lives: " + (playerData.lives - 1);
                };
            };
            state.update = function() {
                if (ballInPlay)
                    state.physics.arcade.overlap(paddle, balls, function(paddle, ball) {
                        state.physics.arcade.velocityFromAngle(computeReflectAngle(paddle, ball),
                            Config.ballSpeed, ball.body.velocity);
                        state.add.audio('paddle_bounce').play();
                    });
                if (ballInPlay) paddle.x = state.input.position.x;
                var collisionFunction = playerData.fireballActive ? state.physics.arcade.overlap : state.physics.arcade.collide;
                collisionFunction.call(state.physics.arcade, bricks, balls, function(brick) {
                    brickBallCollision(state, brick);
                    if (!brick.health) {
                        if (state.rnd.frac() <= Config.pickupProbability)
                            pickups.add(new Pickup(state, brick.body.center.x, brick.body.center.y));
                        var coinChance = state.rnd.frac();
                        while (coinChance < Config.coinChance) {
                            pickups.add(new Pickup(state, brick.body.center.x, brick.body.center.y, 'coin'));
                            coinChance = state.rnd.frac();
                        }
                    }
                });
                state.physics.arcade.overlap(paddle, pickups, function(paddle, pickup) {
                    paddlePickupCollision(state, paddle, pickup, balls);
                    pickup.kill();
                });
                if (!bricks.total && !pickups.total) {
                    levelTransition();
                }
                if (!balls.total && ballInPlay) {
                    ballInPlay = false;
                    if (!--playerData.lives) {
                        gameOver();
                    }
                    else {
                        state.add.audio('powerdown').play();
                        readyBall();
                    }
                }
                // ugh
                var scoreChange = playerData.score - playerData.oldScore;
                playerData.oldScore = playerData.score;
                playerData.pointsSinceBonusLife += scoreChange;
                if (playerData.pointsSinceBonusLife > Config.extraLifeScore) {
                    playerData.lives++;
                    playerData.pointsSinceBonusLife -= Config.extraLifeScore;
                    showMessage(state, "Extra life every " + Config.extraLifeScore + " points!");
                    state.add.audio('powerup').play();
                }
            };
            if (DEBUG)
                state.render = function() {
                    state.time.advancedTiming = true;
                    state.game.debug.text("FPS: " + state.time.fps, Config.gameWidth / 2, 25, '#FFFFFF');
                    state.input.keyboard.onDownCallback = levelTransition;
                    state.input.keyboard.onDownCallback = function() {
                        playerData.score += 10000;
                    };
                };
            var levelTransition = function() {
                playerData.fireballActive = false;
                var nextLevel = parseInt(level, 10) + 1;
                if (nextLevel > Config.totalLevels) {
                    state.game.state.start('win');
                }
                else {
                    state.game.state.remove('main');
                    state.game.state.add('main',
                        new makeMain(nextLevel.toString()));
                    state.game.state.start('main');
                }
            };
            var readyBall = function() {
                playerData.fireballActive = false;
                var ball = new Ball(state, paddle);
                pickups.removeAll(true);
                balls.add(ball);
                showMessage(state, "(Click/touch to launch)");
                state.input.onDown.addOnce(function() {
                    ball.startMovement();
                    ballInPlay = true;
                });
            };
            var gameOver = function() {
                state.add.audio('gameover').play();
                var resetTimer = state.time.create();
                resetTimer.add(3000, function() {
                    playerData.score = 0;
                    playerData.lives = 3;
                    playerData.fireballActive = false;
                    playerData.pointsSinceBonusLife = 0;
                    playerData.oldScore = 0;
                    state.game.state.start('title');
                });
                resetTimer.start();
            };
            return state;
        };
    });