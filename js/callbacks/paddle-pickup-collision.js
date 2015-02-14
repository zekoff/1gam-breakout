define(['config'], function(Config) {
    var paddleStateTimer = null;
    return function(state, paddle, pickup) {
        if (!paddleStateTimer) paddleStateTimer = state.time.create();
        switch (pickup.type) {
            case 'paddle_size_up':
                paddleStateTimer.destroy();
                paddleStateTimer = state.time.create();
                paddle.scale.set(2, 1);
                paddleStateTimer.add(Config.buffDurationMs, function() {
                    paddle.scale.set(1);
                });
                paddleStateTimer.start();
                state.score += Config.scorePaddleSizeIncrease;
                state.add.audio('powerup').play();
                break;
            case 'paddle_size_down':
                paddle.scale.set(0.5, 1);
                paddleStateTimer.destroy();
                paddleStateTimer = state.time.create();
                paddleStateTimer.add(Config.debuffDurationMs, function() {
                    paddle.scale.set(1);
                });
                paddleStateTimer.start();
                state.score += Config.scorePaddleSizeDecrease;
                state.add.audio('powerdown').play();
                break;
            case 'coin':
                state.score += Config.scoreCoinPickup;
                state.add.audio('coin').play();
                break;
        }
    };
});