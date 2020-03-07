"use strict";
var scenes;
(function (scenes) {
    class Start extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this._background = new objects.Image(util.BACKGROUND_PATH, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this._instruction = new objects.Image(util.INSTRUCTION_PATH, 650, 270, 225, 288, false);
            this._startButton = new objects.Image(util.PLAY_BUTTON, 480, 450, 200, 80, true);
            this._introduction = new objects.Label("Score counts: \n\n    shot Submarine + 10\n\n    shot Mine + 5", util.FONT_SIZE, util.FONT_FAMILY, util.FONT_COLOR, 50, 300, false);
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this._background);
            this.addChild(this._instruction);
            this.addChild(this._introduction);
            this.addChild(this._startButton);
            this.Main();
        }
        Update() { }
        // TODO:consolidate stage cleared scene
        Main() {
            this._startButton.HoverOn();
            this._startButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.FIRST;
                // initialize the scores for players
                util.GameConfig.PLAYER_A_SCORE = 0;
                util.GameConfig.PLAYER_B_SCORE = 0;
                // util.GameConfig.SCENE_STATE = scenes.State.SECOND;
            });
        }
    }
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map