"use strict";
/**
 * COSMOS Games
 *
 * April 12, 2020
 *
 * Contributors:
 * - Logan J. Kim
 * - Kei Mizubuchi
 * - Hang Li
 * - Ygor Almeida
 *
 * Description:
 * Fury, the Destroyers, is two players single screen submarine game which is designed to bring joys
 * to number of people who play this game. This game will contain three stages.
 * Players level up once the stage is cleared by meeting all conditions including eliminating all enemies on a map.
 *
 * Versions:
 * - v4.0 Final Release
 * - v3.0 Beta Release
 * - v2.0 Alpha Release
 * - v1.0 Pre-Alpha Release
 */
var scenes;
(function (scenes) {
    /**
     *
     * @export
     * @class ShootInstruction
     * @extends {objects.Scene}
     */
    class ShootInstruction extends objects.Scene {
        // CONSTRUCTOR
        /**
         * Creates an instance of MoveInstruction.
         * @memberof ShootInstruction
         */
        constructor() {
            super();
            this._bulletAList = [];
            this._bulletBList = [];
            // background
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME1, 0, 0, util.STAGE_W, util.STAGE_H, false);
            // player A
            this._playerA = new objects.Player(util.GameConfig.ATLAS, "submarineA", util.PLAYER_A_POS.x, util.PLAYER_A_POS.y, "PlayerA");
            // player B
            this._playerB = new objects.Player(util.GameConfig.ATLAS, "submarineB", util.PLAYER_B_POS.x, util.PLAYER_B_POS.y, "PlayerB");
            // fish
            this._fish = new objects.Fish("./Assets/images/fish.png", 0, 0);
            // player A instruction label
            this._playerAInstruction = new objects.Label("Player A: Press WASD key to move\n\n" + "          Press C to shoot", "20px", util.FONT_FAMILY, "black", 10, 10, false);
            // player B instruction label
            this._playerBInstruction = new objects.Label("Player B: Press arrow key to move\n\n" + "          Press M to shoot", "20px", util.FONT_FAMILY, "black", 585, 10, false);
            // instruction label
            this._instructionLabel = new objects.Label("Go shoot the fishes", "20px", util.FONT_FAMILY, "red", 380, 35, false);
            // button
            this._mainMenuButton = new objects.Image(util.MAIN_BUTTON, 480, 530, 150, 50, true);
            // key pressed state
            this.keyPressedStates = [];
            // selected weapon type
            this._playerA.weaponType = "normal";
            this._playerB.weaponType = "normal";
            this.Start();
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        /**
         * add objects to the scene
         *
         * @memberof ShootInstruction
         */
        Start() {
            this.addChild(this._background);
            this.addChild(this._playerA);
            this.addChild(this._playerB);
            this.addChild(this._fish);
            this.addChild(this._playerAInstruction);
            this.addChild(this._instructionLabel);
            this.addChild(this._playerBInstruction);
            this.Main();
        }
        /**
         * update function
         *
         * @memberof ShootInstruction
         */
        Update() {
            // update fish movement
            this._fish.Update();
            // detect keys to make movement
            this.detectPressedKeys();
            // detect the bullet collision
            this.detectBulletCollision(this._bulletAList, this._playerB);
            this.detectBulletCollision(this._bulletBList, this._playerA);
            // detect bullet collision with jellyfish from player A
            this.detectFishAndBulletCollision(this._bulletAList, this._fish);
            // detect bullet collision with jellyfish from player B
            this.detectFishAndBulletCollision(this._bulletBList, this._fish);
        }
        /**
         * Main function, add button onclick event
         *
         * @memberof ShootInstruction
         */
        Main() {
            this._mainMenuButton.HoverOn();
            this._mainMenuButton.on("click", function () {
                // move to the next scene
                util.GameConfig.SCENE_STATE = scenes.State.START;
            });
        }
        /**
         * return randome Vector2 object
         *
         * @returns {objects.Vector2}
         * @memberof ShootInstruction
         */
        setRandomLocation() {
            // generate position at random
            let randomX = Math.floor(Math.random() * (util.STAGE_W - 100));
            let randomY = Math.floor(Math.random() * (util.STAGE_H - 100));
            return new objects.Vector2(randomX, randomY);
        }
        /**
         * Method for detecting which key is pressed
         *
         * @memberof ShootInstruction
         */
        detectPressedKeys() {
            // move either up (Up) or down (DOWN)
            if (this.keyPressedStates[38 /* UP */]) {
                this._playerB.moveUp();
            }
            else if (this.keyPressedStates[40 /* DOWN */]) {
                this._playerB.moveDown();
            }
            // move either left (LEFT) or right (RIGHT)
            if (this.keyPressedStates[37 /* LEFT */]) {
                this._playerB.moveLeft();
            }
            else if (this.keyPressedStates[39 /* RIGHT */]) {
                this._playerB.moveRight();
            }
            // move either up (W) or down (S)
            if (this.keyPressedStates[87 /* W */]) {
                this._playerA.moveUp();
            }
            else if (this.keyPressedStates[83 /* S */]) {
                this._playerA.moveDown();
            }
            // move either left (A) or right (D)
            if (this.keyPressedStates[65 /* A */]) {
                this._playerA.moveLeft();
            }
            else if (this.keyPressedStates[68 /* D */]) {
                this._playerA.moveRight();
            }
        }
        /**
         * Method for detecting shooting event
         *
         * @memberof ShootInstruction
         */
        detectShootingEvent() {
            // shoot key for player A
            if (this.keyPressedStates[67 /* C */]) {
                if (this.children.indexOf(this._playerA) !== -1) {
                    // unlimits the number of bullets
                    this._playerA.bulletNum++;
                    // aim specifies the direction of shooting
                    let aim = objects.Vector2.right();
                    let bulletsA = this._playerA.shoot(util.GameConfig.ATLAS, "missileA", aim);
                    // push all bullets in bulletsA and add to the scene
                    if (bulletsA) {
                        bulletsA.forEach((b) => {
                            this._bulletAList.push(b);
                            this.addChild(b);
                        });
                    }
                }
            }
            // shoot key for player B
            if (this.keyPressedStates[77 /* M */]) {
                if (this.children.indexOf(this._playerB) !== -1) {
                    // unlimits the number of bullets
                    this._playerB.bulletNum++;
                    // aim specifies the direction of shooting
                    let aim = objects.Vector2.left();
                    let bulletsB = this._playerB.shoot(util.GameConfig.ATLAS, "missileB", aim);
                    // push all bullets in bulletsB and add to the scene
                    if (bulletsB) {
                        bulletsB.forEach((b) => {
                            this._bulletBList.push(b);
                            this.addChild(b);
                        });
                    }
                }
            }
        }
        /**
         * Method for detecting collision between bullet and player
         *
         * @param {objects.Bullet[]} bullets
         * @param {objects.Player} target
         * @memberof ShootInstruction
         */
        detectBulletCollision(bullets, target) {
            // for all bullets
            for (let i = 0; i < bullets.length; i++) {
                // check AABB detection
                managers.Collision.AABBCheck(bullets[i], target);
                // if they is a collision
                if (target.isColliding) {
                    // remove the bullet from the stage
                    this.removeChild(bullets[i]);
                    switch (target.name) {
                        case "PlayerA":
                            {
                                // display explosion effect
                                let explosion = new objects.Explosion(target.x + target.halfWidth, target.y);
                                this.addChild(explosion);
                            }
                            break;
                        case "PlayerB":
                            {
                                // display explosion effect
                                let explosion = new objects.Explosion(target.x - target.halfWidth, target.y);
                                this.addChild(explosion);
                            }
                            break;
                    }
                    // remove the bullet from the list
                    bullets.splice(i, 1);
                }
                else if (bullets[i].x + bullets[i].halfWidth >= util.STAGE_W ||
                    bullets[i].x <= bullets[i].halfWidth) {
                    // simplying check the left and right border
                    this.removeChild(bullets[i]);
                    // remove the bullet from the list
                    bullets.splice(i, 1);
                }
            }
        }
        /**
         * Method for detecting collision between Fish and bullet
         *
         * @param {objects.Bullet[]} bullets
         * @param {objects.Fish} target
         * @memberof ShootInstruction
         */
        detectFishAndBulletCollision(bullets, target) {
            // for all bullets
            for (let i = 0; i < bullets.length; i++) {
                // check AABB detection
                managers.Collision.AABBCheck(bullets[i], target);
                // if there is a collision
                if (target.isColliding) {
                    // explosion
                    let explosion = new objects.Explosion(target.x, target.y);
                    this.addChild(explosion);
                    // update player health
                    target.health -= 1;
                    target.Reset();
                    // once jellyfish's health goes to 0
                    if (target.health <= 0) {
                        this.removeChild(target);
                        this.addChild(this._mainMenuButton);
                    }
                    // remove the bullet from the stage
                    this.removeChild(bullets[i]);
                    // remove the bullet from the list
                    bullets.splice(i, 1);
                }
            }
        }
    }
    scenes.ShootInstruction = ShootInstruction;
})(scenes || (scenes = {}));
//# sourceMappingURL=ShootInstruction.js.map