"use strict";
var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        constructor(x, y, direction) {
            super("./Assets/images/bullet-placeholder.png", x, y, true);
            // variables
            this._owner = "";
            this._velocity = objects.Vector2.zero(); // velocity = movement
            let speed = 10;
            direction.scale(speed);
            this._velocity = direction; // velocity = direction * speed
            this.Start();
        }
        // properties
        get owner() {
            return this._owner;
        }
        set owner(newOwner) {
            this._owner = newOwner;
        }
        get velocity() {
            return this._velocity;
        }
        set velocity(newVelocity) {
            this._velocity = newVelocity;
        }
        // private method
        _checkBounds() {
            // simplying check the right border
            if (this.x >= 960 - this.halfWidth) {
                this.velocity = objects.Vector2.zero(); // stop movement
            }
            // check the left border
            else if (this.x <= this.halfWidth) {
                this.velocity = objects.Vector2.zero(); // stop movement
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
            this._checkBounds();
            this.position.add(this.velocity); // bullet has velocity, or movement
            this.position = new objects.Vector2(this.position.x, this.position.y);
        }
        Reset() {
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map