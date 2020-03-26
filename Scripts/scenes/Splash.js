"use strict";
var scenes;
(function (scenes) {
    class Splash extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this._background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this._furyLabel = new objects.Image(util.FURY_PATH, 480, 100, 500, 150, true);
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this._background);
            this.addChild(this._furyLabel);
            this.Main();
        }
        Update() {
            if (createjs.Ticker.getTime() >= 3000) {
                util.GameConfig.SCENE_STATE = scenes.State.START;
            }
        }
        // TODO:consolidate stage cleared scene
        Main() {
        }
    }
    scenes.Splash = Splash;
})(scenes || (scenes = {}));
//# sourceMappingURL=Splash.js.map