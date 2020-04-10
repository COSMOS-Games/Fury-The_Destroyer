"use strict";
/**
 * COSMOS Games
 *
 * April 12, 2020
 *
 * Contributors:
 * - Logan J. Kim
 * - Kei Mizubuchi
 * - Hang Li
 * - Ygor Almeida
 *
 * Description:
 * Fury, the Destroyers, is two players single screen submarine game which is designed to bring joys
 * to number of people who play this game. This game will contain three stages.
 * Players level up once the stage is cleared by meeting all conditions including eliminating all enemies on a map.
 *
 * Versions:
 * - v4.0 Final Release
 * - v3.0 Beta Release
 * - v2.0 Alpha Release
 * - v1.0 Pre-Alpha Release
 */
var objects;
(function (objects) {
    /**
     *
     *
     * @export
     * @class Fish
     * @extends {GameObject}
     */
    class Fish extends objects.GameObject {
        // constructor
        constructor(imagePath, x, y) {
            super(imagePath, x, y, true);
            // private fields
            this._angle = 0;
            this._health = 6;
            this._verticalSpeed = 0;
            this._horizontalSpeed = 0;
            this.Start();
        }
        // PUBLIC PROPERTIES
        set health(newNum) {
            this._health = newNum;
        }
        get health() {
            return this._health;
        }
        // private method
        _move() {
            // change position in cyclic movement
            let accelaration = new objects.Vector2(0, Math.sin(this._angle));
            this._angle += 0.1;
            // base velocity
            this.position.add(this.velocity);
            this.position.add(accelaration);
        }
        _checkBounds() {
            // check vertical boundary
            if (this.position.y > util.STAGE_W + this.height) {
                this.Reset();
            }
            // check horizontal boundary
            if (this.position.x < this.halfWidth ||
                this.position.x > util.STAGE_H - this.halfWidth) {
                this._horizontalSpeed = -this._horizontalSpeed;
                this.velocity = new objects.Vector2(this._horizontalSpeed, this._verticalSpeed);
            }
        }
        // public method
        Start() {
            // this.alpha = 0.8; // transparency set to 80%
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            this.Reset();
        }
        Update() {
            this._checkBounds();
            this._move();
        }
        Reset() {
            this._verticalSpeed = util.Mathf.RandomRange(1, 2); // speed ranges from 1 to 2 px per frame
            this._horizontalSpeed = util.Mathf.RandomRange(-1, 1); // random horizontal drift
            this.velocity = new objects.Vector2(this._horizontalSpeed, this._verticalSpeed);
            let randomX = util.Mathf.RandomRange(this.halfWidth, util.STAGE_W - this.halfWidth);
            let randomY = util.Mathf.RandomRange(-this.height * 2, -this.height);
            this.position = new objects.Vector2(randomX, randomY, this);
        }
    }
    objects.Fish = Fish;
})(objects || (objects = {}));
//# sourceMappingURL=Fish.js.map