"use strict";
// Game engine
let Game = (function () {
    // initialize the needed object
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    // start screen
    let background;
    let startButton;
    // first stage
    let playerA;
    let playerB;
    let bulletAList = [];
    let bulletBList = [];
    let playerAHealthLabel;
    let playerABulletLabel;
    let playerBHealthLabel;
    let playerBBulletLabel;
    let keyPressedStates = []; // to detect which keys are down
    // end screen
    let backgroundEnd;
    let restartButton;
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
    function StartScreen() {
        // set background in canvas
        background = new objects.Image(util.BACKGROUND_PATH, 0, 0, util.STAGE_W, util.STAGE_H, false);
        stage.addChild(background);
        startButton = new objects.Image(util.PLAY_BUTTON, 480, 450, 200, 80, true);
        startButton.HoverOn();
        stage.addChild(startButton);
        startButton.on("click", function () {
            // clear the canvas
            stage.removeAllChildren();
            // attach detect functions to update event
            createjs.Ticker.on('tick', detectOnUpdate);
            // call the first stage method below
            firstStage();
        });
    }
    function firstStage() {
        // set background in canvas
        background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
        stage.addChild(background);
        // player A
        playerA = new objects.Player(util.PALYER_A_SUBMARINE, util.PLAYER_A_POS.x, util.PLAYER_A_POS.y);
        playerAHealthLabel = new objects.Label("Playe A: Health " + playerA.health, "24px", "Times", "white", 100, 25, true);
        playerABulletLabel = new objects.Label("Bullet " + playerA.bulletNum, "24px", "Times", "white", 250, 25, true);
        stage.addChild(playerA);
        stage.addChild(playerAHealthLabel);
        stage.addChild(playerABulletLabel);
        // player B
        playerB = new objects.Player(util.PALYER_B_SUBMARINE, util.PLAYER_B_POS.x, util.PLAYER_B_POS.y);
        playerBHealthLabel = new objects.Label("Player B: Health " + playerB.health, "24px", "Times", "white", 750, 25, true);
        playerBBulletLabel = new objects.Label("Bullet " + playerB.bulletNum, "24px", "Times", "white", 900, 25, true);
        stage.addChild(playerB);
        stage.addChild(playerBHealthLabel);
        stage.addChild(playerBBulletLabel);
    }
    // detect functions on update
    function detectOnUpdate() {
        detectBulletCollision(bulletAList, playerB);
        detectBulletCollision(bulletBList, playerA);
        detectPlayerHealth();
        detectPressedKeys();
        detectPlayersBullet();
    }
    // attach keydown and keyup event to the window
    window.addEventListener('keydown', (event) => {
        keyPressedStates[event.keyCode] = true;
        // shoot key for player A
        if (keyPressedStates[67 /* C */]) {
            if (stage.children.indexOf(playerA) !== -1) {
                let aim = objects.Vector2.right();
                let bulletA = playerA.shoot(util.PLAYER_A_BULLET, aim);
                playerABulletLabel.setText("Bullet " + playerA.bulletNum);
                if (bulletA) {
                    bulletAList.push(bulletA);
                    stage.addChild(bulletA);
                }
            }
        }
        // shoot key for player B
        if (keyPressedStates[77 /* M */]) {
            if (stage.children.indexOf(playerB) !== -1) {
                // aim specifies the direction of shooting
                let aim = objects.Vector2.left();
                let bulletB = playerB.shoot(util.PLAYER_B_BULLET, aim);
                playerBBulletLabel.setText("Bullet " + playerB.bulletNum);
                if (bulletB) {
                    bulletBList.push(bulletB);
                    stage.addChild(bulletB);
                }
            }
        }
    });
    window.addEventListener('keyup', (event) => {
        keyPressedStates[event.keyCode] = false;
    });
    function detectPressedKeys() {
        if (keyPressedStates[38 /* UP */]) {
            playerB.moveUp();
        }
        else if (keyPressedStates[40 /* DOWN */]) {
            playerB.moveDown();
        }
        if (keyPressedStates[37 /* LEFT */]) {
            playerB.moveLeft();
        }
        else if (keyPressedStates[39 /* RIGHT */]) {
            playerB.moveRight();
        }
        if (keyPressedStates[87 /* W */]) {
            playerA.moveUp();
        }
        else if (keyPressedStates[83 /* S */]) {
            playerA.moveDown();
        }
        if (keyPressedStates[65 /* A */]) {
            playerA.moveLeft();
        }
        else if (keyPressedStates[68 /* D */]) {
            playerA.moveRight();
        }
    }
    function detectBulletCollision(bullets, target) {
        for (let i = 0; i < bullets.length; i++) {
            managers.Collision.AABBCheck(bullets[i], target);
            if (target.isColliding) {
                stage.removeChild(bullets[i]); // remove the bullet from the stage
                bullets.splice(i, 1); // remove the bullet from the list
                target.health -= 1;
                playerAHealthLabel.setText("Playe A: Health " + playerA.health);
                playerBHealthLabel.setText("Playe B: Health " + playerB.health);
            }
            else if (bullets[i].x + bullets[i].halfWidth >= util.STAGE_W || bullets[i].x <= bullets[i].halfWidth) {
                // simplying check the left and right border
                stage.removeChild(bullets[i]);
                bullets.splice(i, 1); // remove the bullet from the list
            }
        }
    }
    function detectPlayersBullet() {
        if (playerA.bulletNum == 0 && playerB.bulletNum == 0
            && bulletAList.length == 0 && bulletBList.length == 0) {
            stage.removeAllChildren();
            EndScreen();
        }
    }
    function detectPlayerHealth() {
        if (playerA.health <= 0) {
            stage.removeAllChildren();
            EndScreen();
        }
        if (playerB.health <= 0) {
            stage.removeAllChildren();
            EndScreen();
        }
    }
    function EndScreen() {
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
        restartButton.on("click", function () {
            // clear the canvas
            stage.removeAllChildren();
            // attach detect functions to update event
            createjs.Ticker.on('tick', detectOnUpdate);
            // call the first stage method below
            firstStage();
        });
    }
    window.addEventListener('load', Start);
})();
//# sourceMappingURL=game.js.map