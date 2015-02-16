define(['phaser'], function(Phaser) {
    var types = ['paddle_size_up', 'paddle_size_down', 'multiball', 'fireball'];
    return function(state, x, y, type) {
        if (typeof type === 'undefined') type = state.rnd.pick(types);
        var pickup = state.add.sprite(x, y, type);
        pickup.type = type;
        pickup.anchor.set(0.5);
        state.physics.enable(pickup, Phaser.Physics.ARCADE);
        pickup.checkWorldBounds = true;
        pickup.outOfBoundsKill = true;
        pickup.body.acceleration.set(0, 70);
        pickup.body.velocity.set(0, 20);
        pickup.scale.set(0.8);
        switch (type) {
            case 'paddle_size_up':
                pickup.tint = 0x00FF00;
                break;
            case 'paddle_size_down':
                pickup.tint = 0xFF0000;
                break;
            case 'coin':
                pickup.animations.add('spin');
                var spinRate = state.rnd.between(17, 30);
                pickup.animations.play('spin', spinRate, true);
            case 'multiball':
            case 'fireball':
                var rotateRate = 0;
                while (Math.abs(rotateRate) < 90)
                    rotateRate = state.rnd.between(-270, 270);
                pickup.update = function() {
                    pickup.angle += rotateRate * state.time.elapsed / 1000;
                };
                break;
        }
        if (type === 'coin') {
            pickup.scale.set(0.5);
            pickup.body.acceleration.set(0, 70);
            pickup.body.velocity.set(state.rnd.between(-5, 5), state.rnd.between(-50, 10));
        }
        return pickup;
    };
});