"use strict";
var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        // constructor
        constructor(x, y) {
            super("./Assets/images/placeholder.png", x, y, true);
            // variables
            this._owner = "";
            this._dx = 2;
            this.Start();
        }
        // properties
        get owner() {
            return this._owner;
        }
        set owner(newOwner) {
            this._owner = newOwner;
        }
        get dx() {
            return this._dx;
        }
        set dx(newDx) {
            this._dx = newDx;
        }
        // private method
        _checkBounds() {
            // TODO: check bounds based on direction
            // simplying check the right border
            if (this.x >= 960 - this.halfHeight) {
                this.dx = 0;
            }
            // check the left border
            if (this.x <= this.halfHeight) {
                this.dx = 2;
            }
        }
        // public method
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', () => {
                this.Update();
            });
        }
        Update() {
            this.position = new objects.Vector2(this.position.x + this.dx, this.position.y);
            this._checkBounds();
        }
        Reset() {
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map