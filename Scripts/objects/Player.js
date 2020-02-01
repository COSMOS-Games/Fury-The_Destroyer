"use strict";
var objects;
(function (objects) {
    class Player extends objects.GameObject {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super("./Assets/images/placeholder.png", 0, 0, true);
            // PRIVATE INSTANCE MEMBER
            this._bulletNum = 3;
            this.Start();
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
            this.position = new objects.Vector2(this.position.x - 10, this.position.y);
            console.log("LEFT: " + this.position.y);
        }
        moveRight() {
            this.position = new objects.Vector2(this.position.x + 10, this.position.y);
            console.log("RIGHT: " + this.position.y);
        }
        moveUp() {
            this.position = new objects.Vector2(this.position.x, this.position.y - 10);
            console.log("UP: " + this.position.y);
        }
        moveDown() {
            this.position = new objects.Vector2(this.position.x, this.position.y + 10);
            console.log("DOWN: " + this.position.y);
        }
        shoot() {
            let bullet = new objects.Bullet();
            bullet.position = this.position;
            console.log('BULLET!!! position:' + bullet.position.x);
            return bullet;
        }
    }
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map