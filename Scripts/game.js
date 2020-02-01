"use strict";
// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function () {
    // initialize the needed object
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let backgroundImg;
    let playerA;
    let playerB;
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Game Started!`, "color: lightblue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }
    function Update() {
        playerA.Update();
        stage.update();
    }
    function Main() {
        console.log(`%c Main Started...`, "color: green; font-size: 16px;");
        // first stage
        firstStage();
    }
    // Logan Kim Begins
    // Logan Kim Ends
    // Kei Mizubuchi Begins
    function firstStage() {
        playerA = new objects.Player();
        stage.addChild(playerA);
    }
    // attach keydown event to the window
    window.addEventListener('keydown', keyPressed);
    function keyPressed(event) {
        if (event.keyCode === 38) {
            playerA.moveUp();
        }
        else if (event.keyCode === 40) {
            playerA.moveDown();
        }
        else if (event.keyCode === 37) {
            playerA.moveLeft();
        }
        else if (event.keyCode === 39) {
            playerA.moveRight();
        }
        else if (event.keyCode === 77) {
            // M
            let bulletA = playerA.shoot();
            bulletA.position = playerA.position;
            stage.addChild(bulletA);
        }
    }
    // Kei Mizubuchi Ends
    // Hand Li Begins
    // Hang Li Ends
    // Ygor Almeida Begins
    // Ygor Almeida Ends
    window.addEventListener('load', Start);
})();
//# sourceMappingURL=game.js.map