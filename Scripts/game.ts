// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function () {
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;
    let background: objects.Image;
    let gameTitle: objects.Label;
    let startButton: objects.Image;
    const BACKGROUND_PATH: string = './Assets/images/background.png';

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */

    function Start(): void {
        console.log(`%c Game Started!`, "color: lightblue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }

    function Update(): void {
        stage.update();
    }

    function Main(): void {
        console.log(`%c Main Started...`, "color: green; font-size: 16px;");
        StartScreen();
    }

    // Logan Kim Begins
    function StartScreen(): void {
        // set background in canvas
        background = new objects.Image(BACKGROUND_PATH, 0, 0, 960, 640, false)
        stage.addChild(background);

        gameTitle = new objects.Label("Fury, The Destroyer", "80px", "Consolas", "#FFFFFF", 480, 100, true);
        stage.addChild(gameTitle);

        // Image Reference: https://pngimage.net/game-play-button-png-2/
        startButton = new objects.Image('./Assets/images/play-btn.png', 480, 500, 200, 80, true);
        startButton.HoverOn();
        stage.addChild(startButton);

        console.log("Start screen loaded!")

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