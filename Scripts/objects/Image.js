"use strict";
var objects;
(function (objects) {
    class Image extends objects.GameObject {
        // constructor
        constructor(imagePath, x = 0, y = 0, width = 0, height = 0, isCentered = false) {
            super(imagePath, x, y, isCentered);
            super.CustomSize(width, height, isCentered);
            this.Start();
        }
        // PUBLIC Methods
        HoverOver() {
            this.alpha = 0.7;
        }
        HoverOut() {
            this.alpha = 1;
        }
        HoverOn() {
            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);
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
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map