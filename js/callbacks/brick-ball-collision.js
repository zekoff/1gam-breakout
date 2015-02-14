define(['phaser'], function(Phaser) {
    return function(state, brick) {
        brick.damage(1);
        switch (brick.health) {
            case 2:
                brick.setFrame(state.cache.getFrameData('atlas').getFrameByName('stone_chipped'));
                break;
            case 1:
                brick.setFrame(state.cache.getFrameData('atlas').getFrameByName('stone_cracked'));
                break;
            case 0:
                var emitter = state.add.emitter(brick.body.center.x, brick.body.center.y);
                emitter.makeParticles('atlas', brick.frame);
                emitter.setScale(0.2, 0.4, 0.2, 0.4);
                emitter.setAlpha(1, 0, 500, Phaser.Easing.Quadratic.In);
                emitter.start(true, 500, null, 20);
                break;
        }
    };
});