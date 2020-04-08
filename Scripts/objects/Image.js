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
     * Class for Image
     *
     * @export
     * @class Image
     * @extends {GameObject}
     */
    class Image extends objects.GameObject {
        // PRIVATE INSTANCE MEMBERS
        // CONSTRUCTOR
        /**
         *Creates an instance of Image.
         * @param {string} imagePath
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {number} [width=0]
         * @param {number} [height=0]
         * @param {boolean} [isCentered=false]
         * @memberof Image
         */
        constructor(imagePath, x = 0, y = 0, width = 0, height = 0, isCentered = false) {
            super(imagePath, x, y, isCentered);
            super.CustomSize(width, height, isCentered);
            this.Start();
        }
        // PRIVATE LIFE CYCLE METHODS
        _checkBounds() {
        }
        // PUBLIC LIFE CYCLE METHODS
        /**
         * initialization happens here
         *
         * @memberof Button
         */
        Start() {
        }
        /**
         * This method is used to update the object
         *
         * @memberof Image
         */
        Update() {
        }
        /**
         * This method is used to reset to the initial status
         *
         * @memberof Image
         */
        Reset() {
        }
        // PUBLIC METHODS
        /**
         * This method changes alpha on hover over
         *
         * @memberof Image
         */
        HoverOver() {
            this.alpha = 0.7;
        }
        /**
         * This method changes back alpha on hover over
         *
         * @memberof Image
         */
        HoverOut() {
            this.alpha = 1;
        }
        /**
         * This method attaches hover events
         *
         * @memberof Image
         */
        HoverOn() {
            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);
        }
    }
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map