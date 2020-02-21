"use strict";
var scenes;
(function (scenes) {
    class End extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this.background = new objects.Image(util.BACKGROUND_PATH_END, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this.restartButton = new objects.Image(util.RESTART_BUTTON, 480, 450, 200, 80, true);
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this.background);
            this.addChild(this.restartButton);
            this.Main();
        }
        Update() { }
        Main() {
            this.restartButton.HoverOn();
            this.restartButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.FIRST;
            });
        }
    }
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map