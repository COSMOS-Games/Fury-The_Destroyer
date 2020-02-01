"use strict";
var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        // constructor
        constructor(x, y) {
            super("./Assets/images/placeholder.png", x, y, true);
            // variables
            this._owner = "";
            this.Start();
        }
        // properties
        get owner() {
            return this._owner;
        }
        set owner(newOwner) {
            this._owner = newOwner;
        }
        // private method
        _checkBounds() {
        }
        // public method
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', () => {
                this.Update();
            });
        }
        Update() {
            if (this.position) {
                this.position = new objects.Vector2(this.position.x + 1, this.position.y);
            }
        }
        Reset() {
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map