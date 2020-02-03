// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function () {
    // initialize the needed object
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;

    let backgroundImg: createjs.Bitmap;
    let playerA: objects.Player;
    let playerB: objects.Player;

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
        playerA.Update();
        stage.update();
    }


    function Main(): void {
        console.log(`%c Main Started...`, "color: green; font-size: 16px;");

        // first stage
        firstStage();
    }

    // Logan Kim Begins


    // Logan Kim Ends
    // Kei Mizubuchi Begins
    function firstStage(): void {
        playerA = new objects.Player(50, 50);
        stage.addChild(playerA);
        playerB = new objects.Player(900, 600);
        stage.addChild(playerB);
    }

    // attach keydown event to the window
    window.addEventListener('keydown', keyPressed);

    function keyPressed(event: KeyboardEvent) {
        // player A use arrow keys to move, M to shoot
        if (event.keyCode === 38) {
            playerA.moveUp();
        } else if (event.keyCode === 40) {
            playerA.moveDown();
        } else if (event.keyCode === 37) {
            playerA.moveLeft();
        } else if (event.keyCode === 39) {
            playerA.moveRight();
        } else if (event.keyCode === 77) {
            // aim specifies the direction of shooting
            let aim = objects.Vector2.right();

            let bulletA = playerA.shoot(aim);
            // only add the bullet to stage if the position greater than zero
            if (bulletA.position.x > 0) {
                stage.addChild(bulletA);
            }
        }

        // player B use WASD to move, C to shoot
        if (event.keyCode === 87) {
            // W
            playerB.moveUp();
        } else if (event.keyCode === 83) {
            // S
            playerB.moveDown();
        } else if (event.keyCode === 65) {
            // A
            playerB.moveLeft();
        } else if (event.keyCode === 68) {
            // d
            playerB.moveRight();
        } else if (event.keyCode === 67) {
            // aim specifies the direction of shooting
            let aim = objects.Vector2.left();
            let bulletB = playerB.shoot(aim);
            // only add the bullet to stage if the position greater than zero
            if (bulletB.position.x > 0) {
                stage.addChild(bulletB);
            }
        }

    }


    // Kei Mizubuchi Ends
    // Hand Li Begins


    // Hang Li Ends
    // Ygor Almeida Begins


    // Ygor Almeida Ends

    window.addEventListener('load', Start);
})();