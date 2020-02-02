"use strict";
var objects;
(function (objects) {
    class Player extends objects.GameObject {
        // CONSTRUCTOR
        constructor(x, y) {
            super("./Assets/images/placeholder.png", x, y, true);
            // PRIVATE INSTANCE MEMBER
            this._bulletNum = 3;
            this._dxy = 10;
            this.Start();
        }
        // PUBLIC PROPERTIES
        get bulletNum() {
            return this._bulletNum;
        }
        set bulletNum(newNum) {
            this._bulletNum = newNum;
        }
        get dxy() {
            return this._dxy;
        }
        set dxy(newNum) {
            this._dxy = newNum;
        }
        // PRIVATE METHODS
        _checkBounds() {
        }
        // PUBLIC METHODS
        Start() {
        }
        Update() {
            //this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        }
        Reset() {
        }
        // movement
        moveLeft() {
            // check left bound
            if (this.x > this.halfWidth) {
                this.position = new objects.Vector2(this.position.x - this.dxy, this.position.y);
            }
        }
        moveRight() {
            // check the right bound
            if (this.x < 960 - this.halfWidth) {
                this.position = new objects.Vector2(this.position.x + this.dxy, this.position.y);
            }
        }
        moveUp() {
            if (this.y > this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, this.position.y - this.dxy);
            }
        }
        moveDown() {
            if (this.y < 640 - this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, this.position.y + this.dxy);
            }
        }
        shoot() {
            // check if this player still have bullet or not
            if (this.bulletNum > 0) {
                let bullet = new objects.Bullet(this.position.x, this.position.y);
                this.bulletNum -= 1;
                return bullet;
            }
            else {
                // if no availble bullet, return bullet with position negitive
                // which check on game engineer that this bullet will not be add to stage
                // not shown to player
                return new objects.Bullet(-1, -1);
            }
        }
    }
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map