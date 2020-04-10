"use strict";
var objects;
(function (objects) {
    class Explosion extends objects.GameObjectSprite {
        // public properties
        // constructor
        constructor(x, y) {
            super(util.GameConfig.ATLAS, "explosion", x, y, true);
            createjs.Sound.play("impact", { volume: 0.1 });
            setTimeout(() => {
                this.Destroy();
            }, 700);
        }
        // private methods
        _checkBounds() {
        }
        // public methods
        Reset() {
        }
        Start() {
        }
        Update() {
        }
        Destroy() {
            this.parent.removeChild(this);
        }
    }
    objects.Explosion = Explosion;
})(objects || (objects = {}));
//# sourceMappingURL=Explosion.js.map