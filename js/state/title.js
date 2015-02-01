define(['game'], function(Game) {
    return {
        preload: function() {
            Game.load.image('paddle', 'images/paddle.png');
            console.log("finished preload");
        },
        create: function() {
            console.log('create');
            Game.add.text(400, 300, 'worked', {
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }).anchor.set(0.5);
            Game.add.sprite(400, 500, 'paddle').anchor.set(0.5);
        },
        update: function() {}
    };
});