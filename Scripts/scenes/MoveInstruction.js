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
     * @class MoveInstruction
     * @extends {objects.Scene}
     */
    class MoveInstruction extends objects.Scene {
        // CONSTRUCTOR
        /**
         * Creates an instance of MoveInstruction.
         * @memberof MoveInstruction
         */
        constructor() {
            super();
            // movement counts
            this._playerAMove = 3;
            this._playerBMove = 3;
            this._playerAMoveFinish = false;
            this._playerBMoveFinish = false;
            // background
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME1, 0, 0, util.STAGE_W, util.STAGE_H, false);
            // bases
            this._baseA = new objects.Image("./Assets/images/baseA1.png", 0, 0, 100, 100, false);
            this._baseA.position = this.setRandomLocation();
            this._baseB = new objects.Image("./Assets/images/baseB1.png", 0, 0, 100, 100, false);
            this._baseB.position = this.setRandomLocation();
            // player A
            this._playerA = new objects.Player(util.GameConfig.ATLAS, "submarineA", util.PLAYER_A_POS.x, util.PLAYER_A_POS.y, "PlayerA");
            // player B
            this._playerB = new objects.Player(util.GameConfig.ATLAS, "submarineB", util.PLAYER_B_POS.x, util.PLAYER_B_POS.y, "PlayerB");
            // player A instruction label
            this._playerAInstruction = new objects.Label("Player A: Press WASD key to move", "20px", util.FONT_FAMILY, "black", 10, 10, false);
            // player B instruction label
            this._playerBInstruction = new objects.Label("Player B: Press arrow key to move", "20px", util.FONT_FAMILY, "black", 585, 10, false);
            // instruction label
            this._instructionLabel = new objects.Label("Go find your base", "20px", util.FONT_FAMILY, "red", 380, 35, false);
            // button
            this._nextButton = new objects.Image(util.NEXT_BUTTON, 480, 530, 150, 50, true);
            // key pressed state
            this.keyPressedStates = [];
            this.Start();
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        /**
         * add objects to the scene
         *
         * @memberof MoveInstruction
         */
        Start() {
            this.addChild(this._background);
            this.addChild(this._baseA);
            this.addChild(this._baseB);
            this.addChild(this._playerA);
            this.addChild(this._playerB);
            this.addChild(this._playerAInstruction);
            this.addChild(this._instructionLabel);
            this.addChild(this._playerBInstruction);
            this.Main();
        }
        /**
         * update function
         *
         * @memberof MoveInstruction
         */
        Update() {
            // detect keys to make movement
            this.detectPressedKeys();
            // detect the base collision
            this.detectBaseCollision(this._baseA, this._playerA);
            this.detectBaseCollision(this._baseB, this._playerB);
        }
        /**
         * Main function, add button onclick event
         *
         * @memberof MoveInstruction
         */
        Main() {
            this._nextButton.HoverOn();
            this._nextButton.on("click", function () {
                // move to the next scene
                util.GameConfig.SCENE_STATE = scenes.State.SHOOT_INSTRUCTION;
            });
        }
        /**
         * detect base and player collision
         *
         * @param {objects.Image} base
         * @param {objects.Player} target
         * @memberof MoveInstruction
         */
        detectBaseCollision(base, target) {
            // check AABB collision
            managers.Collision.AABBCheck(base, target);
            if (target.isColliding) {
                switch (target.name) {
                    case "PlayerA":
                        {
                            // move the base A
                            this._playerAMove -= 1;
                            if (this._playerAMove < 1) {
                                this.removeChild(this._baseA);
                                this._playerAMoveFinish = true;
                            }
                            else {
                                this._baseA.position = this.setRandomLocation();
                            }
                        }
                        break;
                    case "PlayerB":
                        {
                            // move the base B
                            this._playerBMove -= 1;
                            if (this._playerBMove < 1) {
                                this.removeChild(this._baseB);
                                this._playerBMoveFinish = true;
                            }
                            else {
                                this._baseB.position = this.setRandomLocation();
                            }
                        }
                        break;
                }
            }
            if (this._playerAMoveFinish && this._playerBMoveFinish) {
                this.addChild(this._nextButton);
            }
        }
        /**
         * return randome Vector2 object
         *
         * @returns {objects.Vector2}
         * @memberof MoveInstruction
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
         * @memberof MoveInstruction
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
    }
    scenes.MoveInstruction = MoveInstruction;
})(scenes || (scenes = {}));
//# sourceMappingURL=MoveInstruction.js.map