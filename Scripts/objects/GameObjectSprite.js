"use strict";
var objects;
(function (objects) {
    /**
     * Class for Game Object Sprite
     *
     * @export
     * @abstract
     * @class GameObjectSprite
     * @extends {createjs.Sprite}
     */
    class GameObjectSprite extends createjs.Sprite {
        constructor(first, second = "placeholder", third = 0, fourth = 0, fifth = false) {
            super(first, second);
            // initialization
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._position = new objects.Vector2(0, 0, this);
            this._velocity = new objects.Vector2(0, 0);
            this._isColliding = false;
            this._isCentered = false;
            this._isActive = false;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            // depends on the type of value for fifth, perform different function
            if (fifth != undefined) {
                this.isCentered = fifth;
            }
            // depends on the type of value for fourth, perform different function
            if (typeof fourth == "boolean") {
                this.isCentered = fourth;
            }
            // depends on the type of value for third and fourth, perform different function
            if ((typeof third == "number") && (typeof fourth == "number")) {
                this.position = new objects.Vector2(third, fourth, this);
            }
            // depends on the type of value for third, perform different function
            if (third instanceof objects.Vector2) {
                this.position = third;
            }
        }
        // PUBLIC PROPERTIES
        // getters and setters
        get width() {
            return this._width;
        }
        set width(newWidth) {
            // set width and half width
            this._width = newWidth;
            this._halfWidth = this._computeHalfWidth();
        }
        get height() {
            return this._height;
        }
        set height(newHeight) {
            // set height and half height
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
            // set position along with x and y
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
            // center an object
            this._isCentered = newState;
            if (newState) {
                this._centerGameObject();
            }
        }
        get isActive() {
            return this._isActive;
        }
        set isActive(v) {
            this._isActive = v;
        }
        UpdateAnimation(stop, start) {
            this.gotoAndStop(stop);
            this.gotoAndPlay(start);
        }
        // PRIVATE METHODS
        /**
         * Method for calculating half width
         *
         * @private
         * @returns {number}
         * @memberof GameObjectSprite
         */
        _computeHalfWidth() {
            return this.width * 0.5;
        }
        /**
         * Method for calculating half height
         *
         * @private
         * @returns {number}
         * @memberof GameObjectSprite
         */
        _computeHalfHeight() {
            return this.height * 0.5;
        }
        /**
         * Method for centering an object
         *
         * @private
         * @memberof GameObjectSprite
         */
        _centerGameObject() {
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }
    }
    objects.GameObjectSprite = GameObjectSprite;
})(objects || (objects = {}));
//# sourceMappingURL=GameObjectSprite.js.map