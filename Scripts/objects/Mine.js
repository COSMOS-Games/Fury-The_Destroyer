"use strict";
var objects;
(function (objects) {
    class Mine extends objects.GameObject {
        constructor(imagePath, x, y) {
            super(imagePath, x, y, true);
            // variables
            this._velocity = objects.Vector2.zero(); // velocity = movement
            this.Start();
        }
        // properties
        get velocity() {
            return this._velocity;
        }
        set velocity(newVelocity) {
            this._velocity = newVelocity;
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
            this._checkBounds();
            this.position = new objects.Vector2(this.position.x, this.position.y);
        }
        Reset() {
        }
    }
    objects.Mine = Mine;
})(objects || (objects = {}));
//# sourceMappingURL=Mine.js.map