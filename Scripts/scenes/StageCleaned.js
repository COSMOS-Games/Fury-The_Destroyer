"use strict";
var scenes;
(function (scenes) {
    class StageCleaned extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this._startButton = new objects.Image(util.PLAY_BUTTON, 480, 500, 200, 80, true);
            this._nextBattleLabel = new objects.Image(util.NEXT_BATTLE_PATH, 500, 100, 500, 150, true);
            let description = "In next level, they met in a more dangerous place.  \n\nAdvanced map with randomly generated MINEs \n\nwhich might damage the submarines. \n\nBe careful! \n\nAvoid mines and kill them all!";
            this._descriptionLabel = new objects.Label(description, util.FONT_SIZE, util.FONT_FAMILY, util.FONT_COLOR, 50, 250, false);
            //this._descriptionLabel.lineWidth = 500;
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this._background);
            this.addChild(this._nextBattleLabel);
            this.addChild(this._descriptionLabel);
            this.addChild(this._startButton);
            this.Main();
        }
        Update() { }
        Main() {
            this._startButton.HoverOn();
            this._startButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.SECOND;
            });
        }
    }
    scenes.StageCleaned = StageCleaned;
})(scenes || (scenes = {}));
//# sourceMappingURL=StageCleaned.js.map