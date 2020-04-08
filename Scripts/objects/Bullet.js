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
     * Class for Bullet
     *
     * @export
     * @class Bullet
     * @extends {GameObjectSprite}
     */
    class Bullet extends objects.GameObjectSprite {
        // CONSTRUCTOR
        /**
         * Creates an instance of Bullet
         * @param atlas
         * @param imageName
         * @param x
         * @param y
         * @param direction
         * @param isSpecialWeapon
         */
        constructor(atlas, imageName, x, y, direction, isSpecialWeapon) {
            super(atlas, imageName, x, y, true);
            // PRIVATE INSTANCE MEMBERS
            this._owner = "";
            if (isSpecialWeapon) {
                // let speed = 10;
                // direction.scale(speed);
                this.velocity = direction; // velocity = direction * speed
            }
            else {
                let speed = 10;
                direction.scale(speed);
                this.velocity = direction; // velocity = direction * speed
            }
            this.Start();
        }
        // PUBLIC PROPETIES
        get owner() {
            return this._owner;
        }
        set owner(newOwner) {
            this._owner = newOwner;
        }
        // PRIVATE METHODS
        /**
         * Method for check bounds with right and left borders
         *
         * @protected
         * @memberof Bullet
         */
        _checkBounds() {
            // simplying check the right border
            if (this.x >= util.STAGE_W - this.halfWidth) {
                this.velocity = objects.Vector2.zero(); // stop movement
            }
            // check the left border
            else if (this.x <= this.halfWidth) {
                this.velocity = objects.Vector2.zero(); // stop movement
            }
        }
        // PUBLIC METHODS
        // Life Cycle Methods
        /**
         * This method is used for initialization
         *
         * @memberof Bullet
         */
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', () => {
                this.Update();
            });
        }
        /**
         * This method is used to update the object
         *
         * @memberof Bullet
         */
        Update() {
            this._checkBounds();
            this.position.add(this.velocity); // bullet has velocity, or movement
            this.position = new objects.Vector2(this.position.x, this.position.y);
        }
        /**
         * This method is used to reset to the initial status
         *
         * @memberof Bullet
         */
        Reset() {
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map