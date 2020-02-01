"use strict";
var objects;
(function (objects) {
    class Player extends objects.GameObject {
        // PRIVATE INSTANCE MEMBER
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super("./Assets/images/placeholder.png", 0, 0, true);
            this.Start();
        }
        // PRIVATE METHODS
        _checkBounds() {
        }
        // PUBLIC METHODS
        Start() {
        }
        Update() {
            this.position = new objects.Vector2(this.stage.mouseX, this.stage.mouseY);
        }
        Reset() {
        }
    }
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map