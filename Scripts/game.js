"use strict";
// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function () {
    // initialize the needed object
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
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
        stage.update();
    }
    function Main() {
        console.log(`%c Main Started...`, "color: green; font-size: 16px;");
    }
    // Logan Kim Begins
    // Logan Kim Ends
    // Kei Mizubuchi Begins
    // Kei Mizubuchi Ends
    // Hand Li Begins
    // Hang Li Ends
    // Ygor Almeida Begins
    // Ygor Almeida Ends
    window.addEventListener('load', Start);
})();
//# sourceMappingURL=game.js.map