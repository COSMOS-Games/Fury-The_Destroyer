"use strict";
var scenes;
(function (scenes) {
    class Start extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this.background = new objects.Image(util.BACKGROUND_PATH, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this.startButton = new objects.Image(util.PLAY_BUTTON, 480, 450, 200, 80, true);
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this.background);
            this.addChild(this.startButton);
            this.Main();
        }
        Update() { }
        // TODO:consolidate stage cleared scene
        Main() {
            this.startButton.HoverOn();
            this.startButton.on("click", function () {
                util.GameConfig.SCENE_STATE = scenes.State.FIRST;
                // util.GameConfig.SCENE_STATE = scenes.State.SECOND;
            });
        }
    }
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map