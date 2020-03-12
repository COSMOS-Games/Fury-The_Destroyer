"use strict";
var scenes;
(function (scenes) {
    class End extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME_ONE, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this._gameOverLabel = new objects.Image(util.GAME_OVER_PATH, 480, 100, 500, 150, true);
            this._restartButton = new objects.Image(util.RESTART_BUTTON, 480, 450, 150, 50, true);
            this._mainButton = new objects.Image(util.MAIN_BUTTON, 480, 530, 150, 50, true);
            let score = "Player A Score: " +
                util.GameConfig.PLAYER_A_SCORE +
                "        Player B Score: " +
                util.GameConfig.PLAYER_B_SCORE;
            this._scoresLabel = new objects.Label(score, "32px", util.FONT_FAMILY, "Black", 480, 250, true);
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this._background);
            this.addChild(this._scoresLabel);
            this.addChild(this._restartButton);
            this.addChild(this._mainButton);
            this.addChild(this._gameOverLabel);
            this.Main();
        }
        Update() { }
        Main() {
            this._restartButton.HoverOn();
            this._restartButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.FIRST;
            });
            this._mainButton.HoverOn();
            this._mainButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.START;
            });
        }
    }
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map