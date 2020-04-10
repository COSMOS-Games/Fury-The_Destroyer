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
     * Class for Splash scene
     *
     * @export
     * @class Splash
     * @extends {objects.Scene}
     */
    class Splash extends objects.Scene {
        // CONTRUCTOR
        /**
         * Creates an instance of Splash.
         * @memberof Splash
         */
        constructor() {
            super();
            // initialization
            // background image
            this._splashScreen = new objects.Image(util.SPLASH_SCREEN, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this.Start();
        }
        // PUBLIC METHODS
        /**
         * Start screen of Splash scene
         *
         * @memberof Splash
         */
        Start() {
            // add child to the stage
            this.addChild(this._splashScreen);
            this.Main();
        }
        /**
         * Update method of Splash scene
         *
         * @memberof Splash
         */
        Update() {
            // after 2 seconds, open start scene
            if (createjs.Ticker.getTime() >= 2000) {
                createjs.Sound.play("menu", { volume: 0.2, loop: -1 });
                util.GameConfig.SCENE_STATE = scenes.State.START;
            }
        }
        /**
         * Main method of Splash scene
         *
         * @memberof Splash
         */
        Main() { }
    }
    scenes.Splash = Splash;
})(scenes || (scenes = {}));
//# sourceMappingURL=Splash.js.map