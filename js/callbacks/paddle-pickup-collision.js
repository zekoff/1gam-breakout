define(['config', 'player-data', 'objects/ball', 'phaser', 'callbacks/show-message'],
    function(Config, playerData, Ball, Phaser, showMessage) {
        var paddleStateTimer = null;
        var fireballTimer = null;
        return function(state, paddle, pickup, balls) {
            if (!paddleStateTimer) paddleStateTimer = state.time.create();
            if (!fireballTimer) fireballTimer = state.time.create();
            switch (pickup.type) {
                case 'paddle_size_up':
                    showMessage(state, 'Paddle size up!');
                    paddleStateTimer.destroy();
                    paddleStateTimer = state.time.create();
                    paddle.scale.set(Config.paddleScale * 2, 1);
                    paddleStateTimer.add(Config.buffDurationMs, function() {
                        paddle.scale.set(Config.paddleScale, 1);
                    });
                    paddleStateTimer.start();
                    playerData.score += Config.scorePaddleSizeIncrease;
                    state.add.audio('powerup').play();
                    break;
                case 'paddle_size_down':
                    showMessage(state, 'Paddle size down...');
                    paddle.scale.set(Config.paddleScale / 2, 1);
                    paddleStateTimer.destroy();
                    paddleStateTimer = state.time.create();
                    paddleStateTimer.add(Config.debuffDurationMs, function() {
                        paddle.scale.set(Config.paddleScale, 1);
                    });
                    paddleStateTimer.start();
                    playerData.score += Config.scorePaddleSizeDecrease;
                    state.add.audio('powerdown').play();
                    break;
                case 'coin':
                    playerData.score += Config.scoreCoinPickup;
                    state.add.audio('coin').play();
                    break;
                case 'multiball':
                    showMessage(state, 'Multiball!');
                    var ball = new Ball(state, paddle);
                    balls.add(ball);
                    ball.startMovement();
                    if (playerData.fireballActive) balls.forEachAlive(function(ball) {
                        ball.tint = 0xFFA500;
                    });
                    state.add.audio('powerup').play();
                    break;
                case 'fireball':
                    showMessage(state, 'Fireball!');
                    if (playerData.fireballActive) return;
                    playerData.fireballActive = true;
                    var emitters = state.add.group();
                    balls.forEachAlive(function(ball) {
                        ball.tint = 0xFFA500;
                        var emitter = state.add.emitter();
                        emitters.add(emitter);
                        emitter.makeParticles('atlas', 'red', 60);
                        emitter.setScale(0.2, 0.3, 0.2, 0.3);
                        emitter.setAlpha(.5, .2, 800, Phaser.Easing.Linear.In);
                        emitter.start(false, 800, 50);
                        var superUpdate = emitter.update;
                        emitter.update = function() {
                            superUpdate.call(emitter);
                            emitter.x = ball.x;
                            emitter.y = ball.y;
                        };
                    });
                    fireballTimer.destroy();
                    fireballTimer = state.time.create();
                    fireballTimer.add(Config.fireballDurationMs, function() {
                        playerData.fireballActive = false;
                        balls.forEachAlive(function(ball) {
                            ball.tint = 0xFFFFFF;
                            emitters.destroy();
                        });
                    });
                    fireballTimer.start();
                    state.add.audio('powerup').play();
                    break;
            }
        };
    });