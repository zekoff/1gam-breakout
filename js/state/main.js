define(['phaser', 'objects/ball', 'objects/paddle', 'config'],
    function(Phaser, Ball, Paddle, Config) {
        var state = new Phaser.State();
        var paddle;
        var balls = [];
        state.create = function() {
            paddle = new Paddle(state, true);
            state.physics.arcade.setBoundsToWorld();
            balls.push(new Ball(state, 400, 450));
            balls[0].body.velocity.set(200, 500);
        };
        state.update = function() {
            state.physics.arcade.collide(balls, paddle);
        };
        return state;
    });