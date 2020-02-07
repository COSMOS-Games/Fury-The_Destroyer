"use strict";
// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function () {
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let background;
    let gameTitle;
    let startButton;
    const BACKGROUND_PATH = './Assets/images/first-screen.png';
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
        StartScreen();
    }
    // Logan Kim Begins
    function StartScreen() {
        // set background in canvas
        background = new objects.Image(BACKGROUND_PATH, 0, 0, 960, 640, false);
        stage.addChild(background);
        // gameTitle = new objects.Label("Fury, The Destroyer", "80px", "Consolas", "#FFFFFF", 480, 100, true);
        // stage.addChild(gameTitle);
        // Image Reference: https://pngimage.net/game-play-button-png-2/
        startButton = new objects.Image('./Assets/images/play-btn.png', 480, 450, 200, 80, true);
        startButton.HoverOn();
        stage.addChild(startButton);
        console.log("Start screen loaded!");
        startButton.on("click", function () {
            // clear the canvas
            stage.removeAllChildren();
            stage.update();
            // call the first stage method below
        });
    }
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