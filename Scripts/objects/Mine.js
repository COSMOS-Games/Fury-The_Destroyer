"use strict";
var objects;
(function (objects) {
    class Mine extends objects.GameObject {
        constructor(imagePath, x, y) {
            super(imagePath, x, y, true);
            // private fields
            this._angle = 0;
            this.Start();
        }
        // private method
        _checkBounds() {
            // check the top border
            if (this.y < util.STAGE_BOUNDARY_TOP + this.halfHeight) {
                this.position.y = util.STAGE_BOUNDARY_TOP + this.halfHeight;
            }
            // check the top border
            if (this.y > util.STAGE_H - this.halfHeight) {
                this.position.y = util.STAGE_H - this.halfHeight;
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
            // change position in cyclic movement
            this.position.y += Math.sin(this._angle) / 3.5;
            // change scale 
            this.scaleX = this.scaleY
                = 1 + Math.sin(this._angle) * 0.05;
            this._angle += 0.02;
            this.position = new objects.Vector2(this.position.x, this.position.y);
        }
        Reset() {
        }
    }
    objects.Mine = Mine;
})(objects || (objects = {}));
//# sourceMappingURL=Mine.js.map