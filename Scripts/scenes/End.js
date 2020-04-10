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
     * Class for End scene
     *
     * @export
     * @class End
     * @extends {objects.Scene}
     */
    class End extends objects.Scene {
        // CONTRUCTOR
        /**
         * Creates an instance of End.
         * @memberof End
         */
        constructor() {
            super();
            // set background
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
            // set buttons
            this._restartButton = new objects.Image(util.RESTART_BUTTON, 480, 450, 150, 50, true);
            this._mainButton = new objects.Image(util.MAIN_BUTTON, 480, 530, 150, 50, true);
            // set label
            this._gameOverLabel = new objects.Image(util.GAME_OVER_PATH, 480, 100, 500, 150, true);
            let score = "Player A Score: " +
                util.GameConfig.PLAYER_A_SCORE +
                "        Player B Score: " +
                util.GameConfig.PLAYER_B_SCORE;
            this._scoresLabel = new objects.Label(score, "32px", util.FONT_FAMILY, "White", 480, 250, true);
            this.Start();
        }
        // PUBLIC METHODS
        /**
         * Start method of End scene
         *
         * @memberof End
         */
        Start() {
            // add children to the stage
            this.addChild(this._background);
            this.addChild(this._scoresLabel);
            this.addChild(this._restartButton);
            this.addChild(this._mainButton);
            this.addChild(this._gameOverLabel);
            this.Main();
        }
        /**
         * Update method of Game Over scene
         *
         * @memberof End
         */
        Update() { }
        /**
         * Main method of End scene
         *
         * @memberof End
         */
        Main() {
            // enable hover effect
            this._restartButton.HoverOn();
            this._mainButton.HoverOn();
            // onclick event for buttons
            this._restartButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.FIRST;
            });
            this._mainButton.on("click", function () {
                createjs.Sound.play("menu", { volume: 0.2, loop: -1 });
                util.GameConfig.SCENE_STATE = scenes.State.START;
            });
        }
    }
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map