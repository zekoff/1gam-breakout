define(function() {
    return {
        gameWidth: 1000,
        gameHeight: 600,
        paddleY: 0.95,
        ballSpeed: 400,
        pickupProbability: 0.20,
        buffDurationMs: 10000,
        debuffDurationMs: 10000,
        scoreBrickDestroy: 500,
        scoreCoinPickup: 100,
        scorePaddleSizeIncrease: 0,
        scorePaddleSizeDecrease: 1500,
        fireballDurationMs: 5000,
        coinChance: 0.5,
        paddleScale: 1.5,
        totalLevels: 7,
        messageTextStyle: {
            align: 'center',
            font: 'bold 12pt Arial'
        },
        hudTextFont: 'bold 16pt Arial',
        extraLifeScore: 50000
    };
});