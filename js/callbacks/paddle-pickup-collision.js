define(['config'], function(Config) {
    return function(state, paddle, pickup) {
        switch (pickup.type) {
            case 'paddle_size_up':
                if (paddle.scale.x > 1) return;
                paddle.scale.set(2, 1);
                var sizeUpTimer = state.time.create();
                sizeUpTimer.add(Config.buffDurationMs, function() {
                    paddle.scale.set(1);
                });
                sizeUpTimer.start();
                // play sound
                break;
            case 'paddle_size_down':
                if (paddle.scale < 1) return;
                paddle.scale.set(0.5, 1);
                var sizeDownTimer = state.time.create();
                sizeDownTimer.add(Config.debuffDurationMs, function() {
                    paddle.scale.set(1);
                });
                sizeDownTimer.start();
                // play sound
                break;
            case 'coin':
                // increase score
                // play sound
                break;
        }
    };
});