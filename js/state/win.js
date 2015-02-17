define(['phaser', 'state/main', 'player-data', 'config'],
    function(Phaser, MainState, playerData, Config) {
        return function() {
            var state = new Phaser.State();
            state.create = function() {
                var particleTypes = ['red', 'yellow', 'blue', 'purple', 'green'];
                for (var i = 0; i < 40; i++) {
                    var x = state.rnd.between(0, Config.gameWidth);
                    var y = state.rnd.between(0, Config.gameHeight);
                    var emitter = state.add.emitter(x, y);
                    emitter.makeParticles('atlas', state.rnd.pick(particleTypes));
                    emitter.setScale(0.3, 0.4, 0.3, 0.4);
                    emitter.setAlpha(0.5, 0, 800, Phaser.Easing.Quadratic.In);
                    emitter.start(false, 800, 50);
                }
                state.add.image(0, 0, 'win_screen');
                state.add.text(500, 450, "Final Score: " + playerData.score, {
                        font: 'bold 30pt Chewy'
                    })
                    .anchor.set(0.5);
                var resetTimer = state.time.create();
                resetTimer.add(3000, function() {
                    state.add.text(500, 550, "(Click/Touch to restart)", {
                        font: '24pt Chewy'
                    }).anchor.set(0.5);
                    state.input.onDown.addOnce(function() {
                        playerData.score = 0;
                        playerData.lives = 3;
                        playerData.fireballActive = false;
                        playerData.pointsSinceBonusLife = 0;
                        playerData.oldScore = 0;
                        state.game.state.remove('main');
                        state.game.state.add('main', new MainState('1'));
                        state.game.state.start('title');
                    });
                });
                resetTimer.start();
            };
            return state;
        };
    });