"use strict";
var objects;
(function (objects) {
    class Explosion extends objects.GameObjectSprite {
        // public properties
        // constructor
        constructor(x, y) {
            super(util.GameConfig.ATLAS, "explosion", x, y, true);
            this.Start();
        }
        // private methods
        _checkBounds() {
        }
        // public methods
        Reset() {
        }
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on("tick", () => {
                this.Update();
            });
        }
        Update() {
            this.position = new objects.Vector2(this.position.x, this.position.y);
        }
        Destroy() {
            this.parent.removeChild(this);
        }
    }
    objects.Explosion = Explosion;
})(objects || (objects = {}));
//# sourceMappingURL=Explosion.js.map