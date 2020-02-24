"use strict";
var objects;
(function (objects) {
    class GameObject extends createjs.Bitmap {
        // CONSTRUCTOR
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
        _computeHalfWidth() {
            return this.width * 0.5;
        }
        _computeHalfHeight() {
            return this.height * 0.5;
        }
        _centerGameObject() {
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }
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