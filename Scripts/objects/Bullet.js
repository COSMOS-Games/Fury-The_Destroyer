"use strict";
var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        // constructor
        constructor() {
            // TO-DO: find out how to move bullets
            super("./Assets/images/placeholder.png", 0, 0, true);
            // variables
            this._owner = "";
            console.log("in the constructor: " + this.position.y);
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
            createjs.Ticker.framerate = 5;
            createjs.Ticker.on('tick', this.Update);
        }
        Update() {
            if (this.position) {
                console.log(this.position.y);
                this.position = new objects.Vector2(this.position.x, this.position.y + 2);
            }
            console.log("position didn't found!");
        }
        Reset() {
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map