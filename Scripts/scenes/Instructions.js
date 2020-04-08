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
     * Class for Instructions scene
     *
     * @export
     * @class Instructions
     * @extends {objects.Scene}
     */
    class Instructions extends objects.Scene {
        // CONTRUCTOR
        /**
         * Creates an instance of Instructions.
         * @memberof Instructions
         */
        constructor() {
            super();
            // initialization
            // background
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
            // labels
            this._instructionsLabel = new objects.Image(util.INSTRUCTIONS, 480, 100, 500, 150, true);
            this._introduction = new objects.Label("Score counts: \n\n    shot Submarine + 100\n\n    shot Mine + 30\n\n" +
                "\n\n3 Levels: \n\n    1. Simple movement\n\n    2. Intro to Mines\n\n    3. Intro to Advanced weapon", util.FONT_SIZE, util.FONT_FAMILY, util.FONT_COLOR, 50, 200, false);
            // button images
            this._instruction = new objects.Image(util.INSTRUCTION_PATH, 650, 200, 225, 288, false);
            this._startButton = new objects.Image(util.PLAY_BUTTON, 300, 530, 150, 50, true);
            this._instructionLevelButton = new objects.Image(util.INSTRUCTION_LEVEL, 480, 530, 150, 50, true);
            this._mainButton = new objects.Image(util.MAIN_BUTTON, 660, 530, 150, 50, true);
            this.Start();
        }
        // PUBLIC METHODS
        /**
         * Start method of Instructions scene
         *
         * @memberof Instructions
         */
        Start() {
            // add children to the stage
            this.addChild(this._background);
            this.addChild(this._instructionsLabel);
            this.addChild(this._introduction);
            this.addChild(this._startButton);
            this.addChild(this._instructionLevelButton);
            this.addChild(this._mainButton);
            this.addChild(this._instruction);
            this.Main();
        }
        /**
         * Update method of Instructions scene
         *
         * @memberof Instructions
         */
        Update() { }
        /**
         * Main method of Instruction scene
         *
         * @memberof Instructions
         */
        Main() {
            // enable button hover effect
            this._startButton.HoverOn();
            this._instructionLevelButton.HoverOn();
            this._mainButton.HoverOn();
            // set onclick event to change scene state
            this._startButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.FIRST;
            });
            this._instructionLevelButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.MOVE_INSTRUCTION;
            });
            this._mainButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.START;
            });
        }
    }
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=Instructions.js.map