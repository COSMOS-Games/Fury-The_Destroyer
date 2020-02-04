// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function () {
    // initialize the needed object
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;

    let backgroundImg: createjs.Bitmap;
    let playerA: objects.Player;
    let playerB: objects.Player;
    let bulletA: objects.Bullet;
    let bulletB: objects.Bullet;

    let keyPressedStates: boolean[] = []; // to detect which keys are down

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

        detectPlayersCollision();
        detectBulletCollision();
        detectPressedKeys();
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

    // attach keydown and keyup event to the window
    window.addEventListener('keydown', (event: KeyboardEvent) => {
        keyPressedStates[event.keyCode] = true;
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
        keyPressedStates[event.keyCode] = false;
    });

    function detectPressedKeys(): void {
        if (keyPressedStates[util.Key.UP]) {
            playerA.moveUp();
        }
        if (keyPressedStates[util.Key.DOWN]) {
            playerA.moveDown();
        }
        if (keyPressedStates[util.Key.LEFT]) {
            playerA.moveLeft();
        }
        if (keyPressedStates[util.Key.RIGHT]) {
            playerA.moveRight();
        }
        if (keyPressedStates[util.Key.M]) {
            // aim specifies the direction of shooting
            let aim = objects.Vector2.right();

            let bulletA = playerA.shoot(aim);
            // only add the bullet to stage if the position greater than zero
            if (bulletA.position.x > 0) {
                stage.addChild(bulletA);
            }
        }
        if (keyPressedStates[util.Key.W]) {
            playerB.moveUp();
        }
        if (keyPressedStates[util.Key.S]) {
            playerB.moveDown();
        }
        if (keyPressedStates[util.Key.A]) {
            playerB.moveLeft();
        }
        if (keyPressedStates[util.Key.D]) {
            playerB.moveRight();
        }
        if (keyPressedStates[util.Key.C]) {
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
    function detectPlayersCollision(): void {
        let topLeftPlayerA = new objects.Vector2(playerA.position.x - playerA.halfWidth,
            playerA.position.y - playerA.halfHeight);
        let topLeftPlayerB = new objects.Vector2(playerB.position.x - playerB.halfWidth,
            playerB.position.y - playerB.halfHeight);


        // AABB Collision Detection
        if (topLeftPlayerA.x < topLeftPlayerB.x + playerB.width &&
            topLeftPlayerA.x + playerA.width > topLeftPlayerB.x &&
            topLeftPlayerA.y < topLeftPlayerB.y + playerB.height &&
            topLeftPlayerA.y + playerA.height > topLeftPlayerB.y) {
            if (!playerB.isColliding) {
                console.log("Player B detected collision with player A!");
                playerB.isColliding = true;
            }
            else {
                playerA.isColliding = false;
                playerB.isColliding = false;
            }

        }

    }

    // collision detection function
    function detectBulletCollision(): void {
        if (bulletB) {
            console.log("bullet B")
            let topLeftPlayerA = new objects.Vector2(playerA.position.x - playerA.halfWidth,
                playerA.position.y - playerA.halfHeight);
            let topLeftBulletB = new objects.Vector2(bulletB.position.x - bulletB.halfWidth,
                bulletB.position.y - bulletB.halfHeight);

            // AABB Collision Detection
            if (topLeftPlayerA.x < topLeftBulletB.x + bulletB.width &&
                topLeftPlayerA.x + playerA.width > topLeftBulletB.x &&
                topLeftPlayerA.y < topLeftBulletB.y + bulletB.height &&
                topLeftPlayerA.y + playerA.height > topLeftBulletB.y) {
                if (!playerA.isColliding) {
                    console.log("Player A detected collision with bullet!");
                    playerA.isColliding = true;
                }
                else {
                    playerA.isColliding = false;
                }

            }
        }

    }

    // Hang Li Ends
    // Ygor Almeida Begins


    // Ygor Almeida Ends

    window.addEventListener('load', Start);
})();