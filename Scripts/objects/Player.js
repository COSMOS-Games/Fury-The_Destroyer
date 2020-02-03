"use strict";
var objects;
(function (objects) {
    class Player extends objects.GameObject {
        // CONSTRUCTOR
        constructor(x, y) {
            super("./Assets/images/placeholder.png", x, y, true);
            // PRIVATE INSTANCE MEMBER
            // private _bulletNum: number = 3;
            this._bulletNum = 50;
            this._health = 1;
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
            if (this.y < this.halfHeight) {
                this.position.y = this.halfHeight;
            }
            // check the top border
            if (this.y > 640 - this.halfHeight) {
                this.position.y = 640 - this.halfHeight;
            }
        }
        // PUBLIC METHODS
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', () => {
                this.Update();
            });
        }
        Update() {
            // update player position
            this.position = new objects.Vector2(this.position.x, this.position.y);
            this._checkBounds();
        }
        Reset() {
        }
        moveLeft() {
            let velocity = objects.Vector2.left();
            velocity.scale(5);
            this.position.add(velocity);
        }
        moveRight() {
            let velocity = objects.Vector2.right();
            velocity.scale(5);
            this.position.add(velocity);
        }
        moveUp() {
            let velocity = objects.Vector2.up();
            velocity.scale(5);
            this.position.add(velocity);
        }
        moveDown() {
            let velocity = objects.Vector2.down();
            velocity.scale(5);
            this.position.add(velocity);
        }
        shoot(aim) {
            // check if this player still have bullet or not
            if (this.bulletNum > 0) {
                let bullet = new objects.Bullet(this.position.x, this.position.y, aim);
                this.bulletNum -= 1;
                return bullet;
            }
            else {
                // if no availble bullet, return bullet with position negitive
                // which check on game engineer that this bullet will not be add to stage
                // not shown to player
                return new objects.Bullet(-1, -1, objects.Vector2.zero());
            }
        }
    }
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map