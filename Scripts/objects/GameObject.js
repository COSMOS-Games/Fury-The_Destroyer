"use strict";
var objects;
(function (objects) {
    class GameObject extends createjs.Bitmap {
        // CONSTRUCTOR
        /**
         *Creates an instance of GameObject.
         * @param {string} [imagePath='./Assets/images/placeholder.png']
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [centered=false]
         * @memberof GameObject
         */
        constructor(imagePath = './Assets/images/placeholder.png', x = 0, y = 0, centered = false) {
            super(imagePath);
            // MEMBER VARIABLES
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._isColliding = false;
            this._isCentered = false;
            this._position = new objects.Vector2(0, 0);
            this.isColliding = false;
            // set the GameObject's position
            this.position = new objects.Vector2(x, y);
            // wait for the  image to load before calculating its width and height
            this.image.addEventListener('load', () => {
                this.width = this.getBounds().width;
                this.height = this.getBounds().height;
                this.halfWidth = this.width * 0.5;
                this.halfHeight = this.height * 0.5;
                console.log('image loaded');
                this.isCentered = centered;
            });
        }
        // PROPERTIES
        get width() {
            return this._width;
        }
        set width(newWidth) {
            this._width = newWidth;
        }
        get height() {
            return this._height;
        }
        set height(newHeight) {
            this._height = newHeight;
        }
        get halfWidth() {
            this._halfWidth = this._width * 0.5;
            return this._halfWidth;
        }
        set halfWidth(newHalfWidth) {
            this._halfWidth = newHalfWidth;
        }
        get halfHeight() {
            this._halfHeight = this._height * 0.5;
            return this._halfHeight;
        }
        set halfHeight(newHalfHeight) {
            this._halfHeight = newHalfHeight;
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
                // set the anchor point to the center
                this.regX = this.halfWidth;
                this.regY = this.halfHeight;
            }
            else {
                this.regX = 0;
                this.regY = 0;
            }
        }
        get position() {
            return this._position;
        }
        set position(newPosition) {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
        CustomSize(width = this.getBounds().width, height = this.getBounds().height, isCentered = false) {
            this.image.addEventListener('load', () => {
                this.scaleX = width / this.getBounds().width;
                this.scaleY = height / this.getBounds().height;
                this.isCentered = isCentered;
            });
        }
    }
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=GameObject.js.map