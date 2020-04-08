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
var objects;
(function (objects) {
    /**
     * Class for Mine
     *
     * @export
     * @class Mine
     * @extends {GameObjectSprite}
     */
    class Mine extends objects.GameObjectSprite {
        // CONSTRUCTORS
        /**
         *Creates an instance of Mine.
         * @param {createjs.SpriteSheet} atlas
         * @param {string} imageName
         * @param {number} x
         * @param {number} y
         * @memberof Mine
         */
        constructor(atlas, imageName, x, y) {
            super(atlas, imageName, x, y, true);
            // PRIVATE INSTANCE MEMBERS
            this._angle = 0;
            this.Start();
        }
        // PRIVATE METHODS
        /**
         * Method for check bounds with top and bottom boders
         *
         * @protected
         * @memberof Mine
         */
        _checkBounds() {
            // check the top border
            if (this.y < util.STAGE_BOUNDARY_TOP + this.halfHeight) {
                this.position.y = util.STAGE_BOUNDARY_TOP + this.halfHeight;
            }
            // check the buttom border
            if (this.y > util.STAGE_H - this.halfHeight) {
                this.position.y = util.STAGE_H - this.halfHeight;
            }
        }
        // PUBLIC METHODS
        // Life Cycle Methods
        /**
         * This method is used for initialization
         *
         * @memberof Mine
         */
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', () => {
                this.Update();
            });
        }
        /**
         * This method is used to update the object
         *
         * @memberof Mine
         */
        Update() {
            this._checkBounds();
            // change position in cyclic movement
            this.position.y += Math.sin(this._angle) / 3.5;
            // change scale 
            this.scaleX = this.scaleY
                = 1 + Math.sin(this._angle) * 0.05;
            this._angle += 0.02;
            this.position = new objects.Vector2(this.position.x, this.position.y);
        }
        /**
         * This method is used to reset to the initial status
         *
         * @memberof Mine
         */
        Reset() {
        }
    }
    objects.Mine = Mine;
})(objects || (objects = {}));
//# sourceMappingURL=Mine.js.map