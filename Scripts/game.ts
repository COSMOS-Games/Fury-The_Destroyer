// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function () {
    // initialize the needed object
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;
    let backgroundImg: createjs.Bitmap;

    let playerA: objects.Player;
    let playerB: objects.Player;

    let bulletAList: objects.Bullet[] = [];
    let bulletBList: objects.Bullet[] = [];

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

        detectBulletCollision(bulletAList, playerB);
        detectBulletCollision(bulletBList, playerA);
        detectPlayerHealth();
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

        // for shoot keys
        if (keyPressedStates[util.Key.M]) {
            // aim specifies the direction of shooting
            let aim = objects.Vector2.left();
            let bulletB = playerB.shoot(aim);

            if (bulletB) {
                bulletBList.push(bulletB);
                stage.addChild(bulletB);
            } else {
                console.log('Bullets B ran out!!');
            }
        }

        if (keyPressedStates[util.Key.C]) {
            // aim specifies the direction of shooting
            let aim = objects.Vector2.right();
            let bulletA = playerA.shoot(aim);
            if (bulletA) {
                bulletAList.push(bulletA);
                stage.addChild(bulletA);
            } else {
                console.log('Bullets A ran out!!');
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

    // AABB Collision Detection

    // good to have: general collision detection for objects
    // function detectPlayersCollision(obj1: objects.Player, obj2: objects.Player): void {
    //     if (obj1.x < obj2.x + obj2.halfWidth &&
    //         obj1.x + obj1.halfWidth > obj2.x &&
    //         obj1.y < obj2.y + obj2.halfHeight &&
    //         obj1.y + obj1.halfHeight > obj2.y) {
    //         console.log("two objects hit!!");
    //     }
    // }

    // collision detection function
    function detectBulletCollision(bullets: objects.Bullet[], target: objects.Player): void {

        for (let i = 0; i < bullets.length; i++) {
            let crossedTargetLeftBound: boolean = bullets[i].x + bullets[i].halfWidth > target.x;
            let reachingTargetCoreX: boolean = bullets[i].x < target.x + target.halfWidth;
            let crossedTargetTopBound: boolean = bullets[i].y + bullets[i].halfHeight > target.y;
            let reachingTargetCoreY: boolean = bullets[i].y < target.y + target.halfHeight;

            if (crossedTargetLeftBound && reachingTargetCoreX
                && crossedTargetTopBound && reachingTargetCoreY
            ) {
                stage.removeChild(bullets[i]); // remove the bullet from the stage
                bullets.splice(i, 1); // remove the bullet from the list

                target.health -= 1;
            } else if (bullets[i].x >= 960 - bullets[i].halfWidth || bullets[i].x <= bullets[i].halfWidth) {
                // simplying check the left and right border
                stage.removeChild(bullets[i]);
                bullets.splice(i, 1); // remove the bullet from the list
            }
        }

    }

    function detectPlayerHealth(): void {
        if (playerA.health <= 0) {
            console.log("player B wins!");
            stage.removeAllChildren();
            // go to next stage
        }
        if (playerB.health <= 0) {
            console.log("player A wins!");
            stage.removeAllChildren();
            // go to next stage
        }
    }

    // Hang Li Ends
    // Ygor Almeida Begins


    // Ygor Almeida Ends

    window.addEventListener('load', Start);

})();