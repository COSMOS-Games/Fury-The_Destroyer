"use strict";
var scenes;
(function (scenes) {
    class Instructions extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this._instructionsLabel = new objects.Image(util.INSTRUCTIONS, 500, 100, 500, 150, true);
            this._introduction = new objects.Label("Score counts: \n\n    shot Submarine + 10\n\n    shot Mine + 5", util.FONT_SIZE, util.FONT_FAMILY, util.FONT_COLOR, 50, 300, false);
            this._instruction = new objects.Image(util.INSTRUCTION_PATH, 650, 270, 225, 288, false);
            this._startButton = new objects.Image(util.PLAY_BUTTON, 480, 450, 150, 50, true);
            this._mainButton = new objects.Image(util.MAIN_BUTTON, 480, 530, 150, 50, true);
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this._background);
            this.addChild(this._instructionsLabel);
            this.addChild(this._introduction);
            this.addChild(this._startButton);
            this.addChild(this._mainButton);
            this.addChild(this._instruction);
            this.Main();
        }
        Update() { }
        Main() {
            this._startButton.HoverOn();
            this._startButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.FIRST;
            });
            this._mainButton.HoverOn();
            this._mainButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.START;
            });
        }
    }
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=Instructions.js.map