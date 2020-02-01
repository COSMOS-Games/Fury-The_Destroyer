"use strict";
var objects;
(function (objects) {
    class Button extends objects.GameObject {
        // constructor
        constructor(imagePath, x = 0, y = 0, isCentered = true) {
            super(imagePath, x, y, isCentered);
            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);
            this.Start();
        }
        // PUBLIC Methods
        HoverOver() {
            this.alpha = 0.7;
        }
        HoverOut() {
            this.alpha = 1;
        }
        // PRIVATE LIFE CYCLE METHODS
        _checkBounds() {
        }
        // PUBLIC LIFE CYCLE METHODS
        /**
         * initialization happens here
         *
         * @memberof Button
         */
        Start() {
        }
        Update() {
        }
        Reset() {
        }
    }
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map