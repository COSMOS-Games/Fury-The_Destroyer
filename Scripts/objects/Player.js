"use strict";
var objects;
(function (objects) {
    class Player extends objects.GameObject {
        // CONSTRUCTOR
        constructor(imagePath, x, y) {
            super(imagePath, x, y, true);
            // PRIVATE INSTANCE MEMBER
            // private _bulletNum: number = 3;
            this._bulletNum = 5;
            this._health = 2;
            this.Start();
        }
        // PUBLIC PROPERTIES
        get bulletNum() {
            return this._bulletNum;
        }
        set bulletNum(newNum) {
            this._bulletNum = newNum;
        }
        get health() {
            return this._health;
        }
        set health(newNum) {
            this._health = newNum;
        }
        // PRIVATE METHODS
        _checkBounds() {
            // check left border
            if (this.x < this.halfWidth) {
                this.position.x = this.halfWidth;
            }
            // check the right border
            if (this.x > 960 - this.halfWidth) {
                this.position.x = 960 - this.halfWidth;
            }
            // check the top border
            if (this.y < this.halfHeight + 45) {
                this.position.y = this.halfHeight + 45;
            }
            // check the top border
            if (this.y > 640 - this.halfHeight) {
                this.position.y = 640 - this.halfHeight;
            }
        }
        _checkHealth() {
            if (this.health <= 0) {
                console.log("You're already dead");
            }
        }
        // PUBLIC METHODS
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on("tick", () => {
                this.Update();
            });
        }
        Update() {
            // update player position
            this.position = new objects.Vector2(this.position.x, this.position.y);
            this._checkBounds();
        }
        Reset() { }
        moveLeft() {
            this.position.add(objects.Vector2.scale(objects.Vector2.left(), 5));
        }
        moveRight() {
            this.position.add(objects.Vector2.scale(objects.Vector2.right(), 5));
        }
        moveUp() {
            this.position.add(objects.Vector2.scale(objects.Vector2.up(), 5));
        }
        moveDown() {
            this.position.add(objects.Vector2.scale(objects.Vector2.down(), 5));
        }
        shoot(imagePath, aim) {
            // check if this player still have bullet or not
            if (this.bulletNum > 0) {
                let bullet = new objects.Bullet(imagePath, this.position.x, this.position.y, aim);
                this.bulletNum -= 1;
                return bullet;
            }
            else {
                return null; // nullable
            }
        }
        explode() { }
    }
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map