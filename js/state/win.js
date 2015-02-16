define(['phaser', 'state/main', 'player-data'],
    function(Phaser, MainState, playerData) {
        return function() {
            var state = new Phaser.State();
            state.create = function() {
                // set up fireworks display
                state.add.text(500, 200, "YOU WIN").anchor.set(0.5);
                state.add.text(500, 300, "Final Score: " + playerData.score)
                    .anchor.set(0.5);
                var resetTimer = state.time.create();
                resetTimer.add(3000, function() {
                    state.add.text(500, 500, "(Click/Touch to restart)").anchor.set(0.5);
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