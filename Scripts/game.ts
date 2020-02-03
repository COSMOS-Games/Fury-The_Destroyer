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
        // playerA.Update();
        // bulletB.Update();
        stage.update();
        //collisionDection();
        bulletCollisionDection();
        monitorKeyPressedStates();
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
    window.addEventListener('keydown', keyDown);

    window.addEventListener('keyup', keyUp);

    function keyDown(event: KeyboardEvent) {
        keyPressedStates[event.keyCode] = true;
    }

    function keyUp(event: KeyboardEvent) {
        keyPressedStates[event.keyCode] = false;
    }

    //
    function monitorKeyPressedStates(): void {
        // arrow up
        if (keyPressedStates[38]) {
            playerA.moveUp();
        }
        // arrow down
        if (keyPressedStates[40]) {
            playerA.moveDown();
        }
        // arrow left
        if (keyPressedStates[37]) {
            playerA.moveLeft();
        }
        // arrow right
        if (keyPressedStates[39]) {
            playerA.moveRight();
        }
        // M
        if (keyPressedStates[77]) {
            // aim specifies the direction of shooting
            let aim = objects.Vector2.right();

            let bulletA = playerA.shoot(aim);
            // only add the bullet to stage if the position greater than zero
            if (bulletA.position.x > 0) {
                stage.addChild(bulletA);
            }
        }
        // W
        if (keyPressedStates[87]) {
            playerB.moveUp();
        }
        // S
        if (keyPressedStates[83]) {
            playerB.moveDown();
        }
        // A
        if (keyPressedStates[65]) {
            playerB.moveLeft();
        }
        // D
        if (keyPressedStates[68]) {
            playerB.moveRight();
        }
        // C
        if (keyPressedStates[67]) {
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
    function collisionDection():void
    {
        let topLeftPlayerA = new objects.Vector2(playerA.position.x - playerA.halfWidth,
            playerA.position.y - playerA.halfHeight);
        let topLeftPlayerB = new objects.Vector2(playerB.position.x - playerB.halfWidth,
            playerB.position.y - playerB.halfHeight);


         // AABB Collision Detection
         if (topLeftPlayerA.x < topLeftPlayerB.x + playerB.width &&
            topLeftPlayerA.x + playerA.width > topLeftPlayerB.x &&
            topLeftPlayerA.y < topLeftPlayerB.y + playerB.height &&
            topLeftPlayerA.y + playerA.height > topLeftPlayerB.y) 
            {
                if(!playerB.isColliding)
                {
                    console.log("Player B detected collision with player A!");
                    playerB.isColliding = true;
                }
                else
                {
                    playerA.isColliding = false;
                    playerB.isColliding = false;
                }
                
            }
         
    }

    function bulletCollisionDection():void
    {
        if(bulletB){
            console.log("bullet B")
            let topLeftPlayerA = new objects.Vector2(playerA.position.x - playerA.halfWidth,
                playerA.position.y - playerA.halfHeight);
            let topLeftBulletB = new objects.Vector2(bulletB.position.x - bulletB.halfWidth,
                bulletB.position.y - bulletB.halfHeight);
    
             // AABB Collision Detection
             if (topLeftPlayerA.x < topLeftBulletB.x + bulletB.width &&
                topLeftPlayerA.x + playerA.width > topLeftBulletB.x &&
                topLeftPlayerA.y < topLeftBulletB.y + bulletB.height &&
                topLeftPlayerA.y + playerA.height > topLeftBulletB.y) 
                {
                    if(!playerA.isColliding)
                    {
                        console.log("Player A detected collision with bullet!");
                        playerA.isColliding = true;
                    }
                    else
                    {
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