"use strict";
var scenes;
(function (scenes) {
    class StageCleaned extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME_ONE, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this._nextButton = new objects.Image(util.NEXT_BUTTON, 480, 530, 150, 50, true);
            this._nextBattleLabel = new objects.Image(util.NEXT_BATTLE_PATH, 480, 100, 500, 150, true);
            let description = "In next level, they met in a more dangerous place.  \n\nAdvanced map with randomly generated MINEs \n\nwhich might damage the submarines. \n\nBe careful! \n\nAvoid mines and kill them all!";
            this._descriptionLabel = new objects.Label(description, util.FONT_SIZE, util.FONT_FAMILY, util.FONT_COLOR, 50, 250, false);
            let score = "Player A Score: " +
                util.GameConfig.PLAYER_A_SCORE +
                "        Player B Score: " +
                util.GameConfig.PLAYER_B_SCORE;
            this._scoresLabel = new objects.Label(score, "22px", util.FONT_FAMILY, "Black", 480, 200, true);
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this._background);
            this.addChild(this._nextBattleLabel);
            this.addChild(this._scoresLabel);
            this.addChild(this._descriptionLabel);
            this.addChild(this._nextButton);
            this.Main();
        }
        Update() { }
        Main() {
            this._nextButton.HoverOn();
            this._nextButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.SECOND;
            });
        }
    }
    scenes.StageCleaned = StageCleaned;
})(scenes || (scenes = {}));
//# sourceMappingURL=StageCleaned.js.map