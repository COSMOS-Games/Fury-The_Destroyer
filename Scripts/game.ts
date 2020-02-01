// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function() {
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let gameTitle: objects.Label;
    let startButton: objects.Button;

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */

    function Start():void {
        console.log(`%c Game Started!`, "color: lightblue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }

    function Update():void {
        stage.update();
    }

    function Main():void {
        console.log(`%c Main Started...`, "color: green; font-size: 16px;");
        StartScreen();
    }

    // Logan Kim Begins
    function StartScreen():void {
        gameTitle = new objects.Label("Fury, The Destroyer", "80px", "Consolas", "#FFFFFF", 480, 100, true);
        stage.addChild(gameTitle);

        // Image Reference: https://pngimage.net/game-play-button-png-2/
        startButton = new objects.Button('./Assets/images/play-btn.png', 480, 500, true);
        stage.addChild(startButton);

        console.log("Start screen loaded!")

        startButton.on("click", function(){
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