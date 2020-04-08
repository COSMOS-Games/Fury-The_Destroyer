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
     * Class for 2D Vector
     *
     * @export
     * @class Vector2
     */
    class Vector2 {
        // CONSTRUCTOR
        /**
         *Creates an instance of Vector2.
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {createjs.DisplayObject} [displayObject]
         * @memberof Vector2
         */
        constructor(x = 0, y = 0, displayObject) {
            // Initialize member variables
            this._x = 0;
            this._y = 0;
            this._magnitude = 0;
            this._sqrMagnitude = 0;
            if (displayObject != undefined) {
                this._displayObject = displayObject;
            }
            // set x and y
            this.x = x;
            this.y = y;
        }
        // PUBLIC PROPERTIES
        get x() {
            return this._x;
        }
        set x(newX) {
            this._x = newX;
            this.sqrMagnitude = this._computeSqrMagnitude();
            this.magnitude = this._computeMagnitude();
            if (this._displayObject != undefined) {
                this._displayObject.x = this._x;
            }
        }
        get y() {
            return this._y;
        }
        set y(newY) {
            this._y = newY;
            this.sqrMagnitude = this._computeSqrMagnitude();
            this.magnitude = this._computeMagnitude();
            if (this._displayObject != undefined) {
                this._displayObject.y = this._y;
            }
        }
        get magnitude() {
            return this._magnitude;
        }
        set magnitude(newMagnitude) {
            this._magnitude = newMagnitude;
        }
        get sqrMagnitude() {
            return this._sqrMagnitude;
        }
        set sqrMagnitude(newSqrMagnitude) {
            this._sqrMagnitude = newSqrMagnitude;
        }
        // PRIVATE METHODS
        /**
         * Method to compute square maagnitude of Vector
         *
         * @private
         * @returns {number}
         * @memberof Vector2
         */
        _computeSqrMagnitude() {
            return (this._x * this._x) + (this._y * this._y);
        }
        /**
         * Method to compute magnitude of Vector
         *
         * @private
         * @returns {number}
         * @memberof Vector2
         */
        _computeMagnitude() {
            return Math.sqrt(this._computeSqrMagnitude());
        }
        // PUBLIC METHODS
        /**
         * Method for Vector addition
         *
         * @param {Vector2} rhs
         * @memberof Vector2
         */
        add(rhs) {
            this.x += rhs.x;
            this.y += rhs.y;
        }
        /**
         * Method for Vector subtraction
         *
         * @param {Vector2} rhs
         * @memberof Vector2
         */
        subtract(rhs) {
            this.x -= rhs.x;
            this.y -= rhs.y;
        }
        /**
         * Method for Vector scaling
         *
         * @param {number} scalar
         * @memberof Vector2
         */
        scale(scalar) {
            this.x *= scalar;
            this.y *= scalar;
        }
        /**
         * ToString method
         *
         * @returns {string}
         * @memberof Vector2
         */
        toString() {
            return "(" + this.x + ", " + this.y + ")";
        }
        /**
         * This method sets the current vector to a magnitude of 1 (the unit vector)
         *
         * @memberof Vector2
         */
        normalize() {
            let tempX = this.x / this.magnitude;
            let tempY = this.y / this.magnitude;
            this.x = tempX;
            this.y = tempY;
        }
        /**
         * Computes the current vector's direction without changing it
         *
         * @returns {Vector2}
         * @memberof Vector2
         */
        normalized() {
            let vector = new Vector2(this.x, this.y);
            vector.normalize();
            return vector;
        }
        // PUBLIC STATIC METHODS
        /**
         * Method to get zero vector
         *
         * @static
         * @returns {Vector2}
         * @memberof Vector2
         */
        static zero() {
            return new Vector2(0, 0);
        }
        /**
         * Method to get a simple Vector
         *
         * @static
         * @returns {Vector2}
         * @memberof Vector2
         */
        static one() {
            return new Vector2(1, 1);
        }
        /**
         * Method to get a simple Vector which represents up movement
         *
         * @static
         * @returns {Vector2}
         * @memberof Vector2
         */
        static up() {
            return new Vector2(0, -1);
        }
        /**
         * Method to get a simple Vector which represents down movement
         *
         * @static
         * @returns {Vector2}
         * @memberof Vector2
         */
        static down() {
            return new Vector2(0, 1);
        }
        /**
         * Method to get a simple Vector which represents left movement
         *
         * @static
         * @returns {Vector2}
         * @memberof Vector2
         */
        static left() {
            return new Vector2(-1, 0);
        }
        /**
         * Method to get a simple Vector which represents right movement
         *
         * @static
         * @returns {Vector2}
         * @memberof Vector2
         */
        static right() {
            return new Vector2(1, 0);
        }
        /**
         * Method to calculate dot product of two vectors
         *
         * @static
         * @param {Vector2} lhs
         * @param {Vector2} rhs
         * @returns {number}
         * @memberof Vector2
         */
        static dot(lhs, rhs) {
            return (lhs.x * rhs.x) + (lhs.y * rhs.y);
        }
        /**
         * Method to calculate distance of two points
         *
         * @static
         * @param {Vector2} P1
         * @param {Vector2} P2
         * @returns {number}
         * @memberof Vector2
         */
        static distance(P1, P2) {
            let diffXs = P2.x - P1.x;
            let diffYs = P2.y - P1.y;
            return Math.sqrt((diffXs * diffXs) + (diffYs * diffYs));
        }
        /**
         * Method to calculate square distance of two points
         *
         * @static
         * @param {Vector2} P1
         * @param {Vector2} P2
         * @returns {number}
         * @memberof Vector2
         */
        static sqrDistance(P1, P2) {
            let diffXs = P2.x - P1.x;
            let diffYs = P2.y - P1.y;
            return (diffXs * diffXs) + (diffYs * diffYs);
        }
        /**
         * Method to get addition of two vectors
         *
         * @static
         * @param {Vector2} lhs
         * @param {Vector2} rhs
         * @returns {Vector2}
         * @memberof Vector2
         */
        static add(lhs, rhs) {
            let theXs = lhs.x + rhs.x;
            let theYs = lhs.y + rhs.y;
            return new Vector2(theXs, theYs);
        }
        /**
         * Method to get subtract of two vectors
         *
         * @static
         * @param {Vector2} lhs
         * @param {Vector2} rhs
         * @returns {Vector2}
         * @memberof Vector2
         */
        static subtract(lhs, rhs) {
            let theXs = lhs.x - rhs.x;
            let theYs = lhs.y - rhs.y;
            return new Vector2(theXs, theYs);
        }
        /**
         * Method to get scaled vector
         *
         * @static
         * @param {Vector2} lhs
         * @param {number} scaler
         * @returns {Vector2}
         * @memberof Vector2
         */
        static scale(lhs, scaler) {
            // dot x & dot y
            let theXs = lhs.x * scaler;
            let theYs = lhs.y * scaler;
            return new Vector2(theXs, theYs);
        }
    }
    objects.Vector2 = Vector2;
})(objects || (objects = {}));
//# sourceMappingURL=Vector2.js.map