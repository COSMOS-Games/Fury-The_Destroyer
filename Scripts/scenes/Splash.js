"use strict";
var scenes;
(function (scenes) {
    class Splash extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        constructor() {
            super();
            this._splashScreen = new objects.Image(util.SPLASH_SCREEN, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this._splashScreen);
            this.Main();
        }
        Update() {
            if (createjs.Ticker.getTime() >= 4000) {
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