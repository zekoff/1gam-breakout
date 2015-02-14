define(['phaser'], function(Phaser) {
    var types = ['coin', 'paddle_size_up', 'paddle_size_down'];
    return function(state, x, y, type) {
        if (typeof type === 'undefined') type = state.rnd.pick(types);
        var pickup = state.add.sprite(x, y, type);
        pickup.type = type;
        pickup.anchor.set(0.5);
        state.physics.enable(pickup, Phaser.Physics.ARCADE);
        pickup.outOfBoundsKill = true;
        pickup.body.acceleration.set(0, 150);
        pickup.body.velocity.set(0, 50);
        var spinRate = state.rnd.between(17, 30);
        switch (type) {
            case 'paddle_size_up':
                pickup.tint = 0x00FF00;
                break;
            case 'paddle_size_down':
                pickup.tint = 0xFF0000;
                break;
            case 'coin':
                pickup.animations.add('spin');
                pickup.animations.play('spin', spinRate, true);
                var rotateRate = 0;
                while (Math.abs(rotateRate) < 90)
                    rotateRate = state.rnd.between(-270, 270);
                pickup.update = function() {
                    pickup.angle += rotateRate * state.time.elapsed / 1000;
                };
                break;
        }
        return pickup;
    };
});