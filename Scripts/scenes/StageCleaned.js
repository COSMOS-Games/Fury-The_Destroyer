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
     * Class for First Stage Cleared scene
     *
     * @export
     * @class StageCleaned
     * @extends {objects.Scene}
     */
    class StageCleaned extends objects.Scene {
        // CONTRUCTOR
        /**
         * Creates an instance of StageCleaned.
         * @memberof StageCleaned
         */
        constructor() {
            super();
            // initialization
            // background
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
            // button
            this._nextButton = new objects.Image(util.NEXT_BUTTON, 480, 530, 150, 50, true);
            // labels
            this._nextBattleLabel = new objects.Image(util.NEXT_BATTLE_PATH, 480, 100, 500, 150, true);
            let description = "In next level, they met in a more dangerous place.  \n\nAdvanced map with randomly generated MINEs \n\nwhich might damage the submarines. \n\nBe careful! \n\nAvoid mines and kill them all!";
            this._descriptionLabel = new objects.Label(description, util.FONT_SIZE, util.FONT_FAMILY, util.FONT_COLOR, 50, 250, false);
            // scoreboard
            this._scoreBoard = new managers.ScoreBorad();
            this.Start();
        }
        // PUBLIC METHODS
        /**
         * Start method of Staged Cleaned scene
         *
         * @memberof StageCleaned
         */
        Start() {
            // add children to the stage
            this.addChild(this._background);
            this.addChild(this._nextBattleLabel);
            this.addChild(this._scoreBoard.ScoreLabelA);
            this.addChild(this._scoreBoard.ScoreLabelB);
            this.addChild(this._descriptionLabel);
            this.addChild(this._nextButton);
            this.Main();
        }
        /**
         * Update method of Staged Cleaned scene
         *
         * @memberof StageCleaned
         */
        Update() { }
        /**
         * Main method of Staged Cleaned scene
         *
         * @memberof StageCleaned
         */
        Main() {
            // enable button hover effect
            this._nextButton.HoverOn();
            // set on click event on button to change scene state
            this._nextButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.SECOND;
            });
        }
    }
    scenes.StageCleaned = StageCleaned;
})(scenes || (scenes = {}));
//# sourceMappingURL=StageCleaned.js.map