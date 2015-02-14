define(function() {
    return function(paddle, ball) {
        var leftPaddleBound = paddle.body.center.x - paddle.width / 2;
        var hitLocation = ball.body.center.x - leftPaddleBound;
        var normalizedLocation = hitLocation / paddle.width;
        var reflectAngle = 120 * normalizedLocation;
        return 210 + reflectAngle;
    };
});