// Game engine
let Game = (function () {
    // initialize the needed object
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;

    // start screen
    let background: objects.Image;
    let startButton: objects.Image;

    // first stage
    let playerA: objects.Player;
    let playerB: objects.Player;

    let bulletAList: objects.Bullet[] = [];
    let bulletBList: objects.Bullet[] = [];

    let playerAHealthLabel: objects.Label;
    let playerABulletLabel: objects.Label;
    let playerBHealthLabel: objects.Label;
    let playerBBulletLabel: objects.Label;

    let keyPressedStates: boolean[] = []; // to detect which keys are down

    // end screen
    let backgroundEnd: objects.Image;
    let restartButton: objects.Image;



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
        background = new objects.Image(util.BACKGROUND_PATH, 0, 0, util.STAGE_W, util.STAGE_H, false);
        stage.addChild(background);

        startButton = new objects.Image(util.PLAY_BUTTON, 480, 450, 200, 80, true);
        startButton.HoverOn();
        stage.addChild(startButton);

        console.log("Start screen loaded!")

        startButton.on("click", function () {
            // clear the canvas
            stage.removeAllChildren();
            // attach detect functions to update event
            createjs.Ticker.on('tick', detectOnUpdate);
            // call the first stage method below
            firstStage();
        });
    }
    // Logan Kim Ends
    // Kei Mizubuchi Begins
    function firstStage(): void {
        // player B
        playerA = new objects.Player(util.PLAYER_A_POS.x, util.PLAYER_A_POS.y);
        playerAHealthLabel = new objects.Label("Playe A: Health " + playerA.health, "24px",
            "Times", "white", 100, 25, true);
        playerABulletLabel = new objects.Label("Bullet " + playerA.bulletNum, "24px",
            "Times", "white", 250, 25, true);

        stage.addChild(playerA);
        stage.addChild(playerAHealthLabel);
        stage.addChild(playerABulletLabel);

        // player B
        playerB = new objects.Player(util.PLAYER_B_POS.x, util.PLAYER_B_POS.y);
        playerBHealthLabel = new objects.Label("Player B: Health " + playerB.health, "24px",
            "Times", "white", 750, 25, true)
        playerBBulletLabel = new objects.Label("Bullet " + playerB.bulletNum, "24px",
            "Times", "white", 900, 25, true);

        stage.addChild(playerB);
        stage.addChild(playerBHealthLabel);
        stage.addChild(playerBBulletLabel);
    }

    // detect functions on update
    function detectOnUpdate(): void {
        detectBulletCollision(bulletAList, playerB);
        detectBulletCollision(bulletBList, playerA);
        detectPlayerHealth();
        detectPressedKeys();
        detectPlayersBullet();
    }

    // attach keydown and keyup event to the window
    window.addEventListener('keydown', (event: KeyboardEvent) => {
        keyPressedStates[event.keyCode] = true;

        // shoot key for player A
        if (keyPressedStates[util.Key.C]) {
            let aim = objects.Vector2.right();
            let bulletA = playerA.shoot(aim);
            playerABulletLabel.setText("Bullet " + playerA.bulletNum);
            if (bulletA) {
                bulletAList.push(bulletA);
                stage.addChild(bulletA);
            } else {
                console.log('Bullets A ran out!!');
            }
        }

        // shoot key for player B
        if (keyPressedStates[util.Key.M]) {
            // aim specifies the direction of shooting
            let aim = objects.Vector2.left();
            let bulletB = playerB.shoot(aim);
            playerBBulletLabel.setText("Bullet " + playerB.bulletNum);
            if (bulletB) {
                bulletBList.push(bulletB);
                stage.addChild(bulletB);
            } else {
                console.log('Bullets B ran out!!');
            }
        }

    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
        keyPressedStates[event.keyCode] = false;
    });

    function detectPressedKeys(): void {
        if (keyPressedStates[util.Key.UP]) {
            playerB.moveUp();
        } else if (keyPressedStates[util.Key.DOWN]) {
            playerB.moveDown();
        }
        if (keyPressedStates[util.Key.LEFT]) {
            playerB.moveLeft();
        } else if (keyPressedStates[util.Key.RIGHT]) {
            playerB.moveRight();
        }
        if (keyPressedStates[util.Key.W]) {
            playerA.moveUp();
        } else if (keyPressedStates[util.Key.S]) {
            playerA.moveDown();
        }
        if (keyPressedStates[util.Key.A]) {
            playerA.moveLeft();
        } else if (keyPressedStates[util.Key.D]) {
            playerA.moveRight();
        }
    }

    // Kei Mizubuchi Ends
    // Hand Li Begins

    // good to have: general collision detection for objects
    // function detectPlayersCollision(obj1: objects.Player, obj2: objects.Player): void {
    //     if (obj1.x < obj2.x + obj2.halfWidth &&
    //         obj1.x + obj1.halfWidth > obj2.x &&
    //         obj1.y < obj2.y + obj2.halfHeight &&
    //         obj1.y + obj1.halfHeight > obj2.y) {
    //         console.log("two objects hit!!");
    //     }
    // }

    // AABB collision detection function
    function detectBulletCollision(bullets: objects.Bullet[], target: objects.Player): void {

        for (let i = 0; i < bullets.length; i++) {
            let crossedTargetLeftBound: boolean = bullets[i].x + bullets[i].width > target.x;
            let reachingTargetRightBound: boolean = bullets[i].x < target.x + target.width;
            let crossedTargetTopBound: boolean = bullets[i].y + bullets[i].height > target.y;
            let reachingTargetBottomBound: boolean = bullets[i].y < target.y + target.height;

            if (crossedTargetLeftBound && reachingTargetRightBound
                && crossedTargetTopBound && reachingTargetBottomBound
            ) {
                stage.removeChild(bullets[i]); // remove the bullet from the stage
                bullets.splice(i, 1); // remove the bullet from the list

                target.health -= 1;
                playerAHealthLabel.setText("Playe A: Health " + playerA.health);
                playerBHealthLabel.setText("Playe B: Health " + playerB.health);
            }
            if (bullets[i].x + bullets[i].halfWidth > util.STAGE_W || bullets[i].x < bullets[i].halfWidth) {
                // simplying check the left and right border
                stage.removeChild(bullets[i]);
                bullets.splice(i, 1); // remove the bullet from the list
            }
        }

    }

    function detectPlayersBullet(): void {
        if (playerA.bulletNum == 0 && playerB.bulletNum == 0
            && bulletAList.length == 0 && bulletBList.length == 0
        ) {
            stage.removeAllChildren()
            // go to next stage
            // remove detect functions for firstStage

            EndScreen();

        }
    }

    function detectPlayerHealth(): void {
        if (playerA.health <= 0) {
            console.log("player B wins!");
            stage.removeAllChildren();
            // go to next stage
            // remove detect functions for firstStage

            EndScreen();
        }
        if (playerB.health <= 0) {
            console.log("player A wins!");
            stage.removeAllChildren();
            // go to next stage
            // remove detect functions for firstStage

            EndScreen();
        }
    }

    // Hang Li Ends
    // Ygor Almeida Begins

    function EndScreen(): void {
        // reset attched events to ticker and variables
        createjs.Ticker.reset();
        createjs.Ticker.on('tick', Update);
        bulletAList = [];
        bulletBList = [];
        keyPressedStates = []; // to detect which keys are down


        // set background in canvas
        backgroundEnd = new objects.Image(util.BACKGROUND_PATH_END, 0, 0, util.STAGE_W, util.STAGE_H, false);
        stage.addChild(backgroundEnd);

        restartButton = new objects.Image(util.RESTART_BUTTON, 480, 450, 200, 80, true);
        restartButton.HoverOn();
        stage.addChild(restartButton);

        console.log("End screen loaded!")

        restartButton.on("click", function () {
            // clear the canvas
            stage.removeAllChildren();
            // attach detect functions to update event
            createjs.Ticker.on('tick', detectOnUpdate);
            // call the first stage method below
            firstStage();
        });
    }


    // Ygor Almeida Ends

    window.addEventListener('load', Start);

})();