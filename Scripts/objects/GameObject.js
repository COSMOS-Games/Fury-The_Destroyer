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
     * Class for Game Object
     *
     * @export
     * @abstract
     * @class GameObject
     * @extends {createjs.Bitmap}
     */
    class GameObject extends createjs.Bitmap {
        // CONSTRUCTOR
        /**
         *Creates an instance of GameObject.
         * @param {Object} [imageString='./Assets/images/placeholder.png']
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [centered=false]
         * @memberof GameObject
         */
        constructor(imageString = './Assets/images/placeholder.png', x = 0, y = 0, centered = false) {
            super(imageString);
            // initialization
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._position = new objects.Vector2(0, 0, this);
            this._velocity = new objects.Vector2(0, 0);
            this._isColliding = false;
            this._isCentered = false;
            this.position = new objects.Vector2(x, y, this);
            this.isCentered = centered;
            this.image.addEventListener('load', () => {
                this.width = this.getBounds().width;
                this.height = this.getBounds().height;
                if (this.isCentered) {
                    this._centerGameObject();
                }
            });
        }
        // PUBLIC PROPERTIES
        get width() {
            return this._width;
        }
        set width(newWidth) {
            this._width = newWidth;
            this._halfWidth = this._computeHalfWidth();
        }
        get height() {
            return this._height;
        }
        set height(newHeight) {
            this._height = newHeight;
            this._halfHeight = this._computeHalfHeight();
        }
        get halfWidth() {
            return this._halfWidth;
        }
        get halfHeight() {
            return this._halfHeight;
        }
        get position() {
            return this._position;
        }
        set position(newPosition) {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
        get velocity() {
            return this._velocity;
        }
        set velocity(newVelocity) {
            this._velocity = newVelocity;
        }
        get isColliding() {
            return this._isColliding;
        }
        set isColliding(newState) {
            this._isColliding = newState;
        }
        get isCentered() {
            return this._isCentered;
        }
        set isCentered(newState) {
            this._isCentered = newState;
            if (newState) {
                this._centerGameObject();
            }
        }
        // PRIVATE METHODS
        /**
         * Method for computing half width
         *
         * @private
         * @returns {number}
         * @memberof GameObject
         */
        _computeHalfWidth() {
            return this.width * 0.5;
        }
        /**
         * Method for computing half height
         *
         * @private
         * @returns {number}
         * @memberof GameObject
         */
        _computeHalfHeight() {
            return this.height * 0.5;
        }
        /**
         * Method for centering the object
         *
         * @private
         * @memberof GameObject
         */
        _centerGameObject() {
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }
        /**
         * utility for customizing object size
         *
         * @param {number} [width=this.getBounds().width]
         * @param {number} [height=this.getBounds().height]
         * @param {boolean} [isCentered=false]
         * @memberof GameObject
         */
        CustomSize(width = this.getBounds().width, height = this.getBounds().height, isCentered = false) {
            this.image.addEventListener('load', () => {
                this.scaleX = width / this.getBounds().width;
                this.scaleY = height / this.getBounds().height;
                this.isCentered = isCentered;
                if (this.isCentered) {
                    this._centerGameObject();
                }
            });
        }
    }
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=GameObject.js.map