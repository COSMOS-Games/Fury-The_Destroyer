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
     * Class for Player
     *
     * @export
     * @class Player
     * @extends {GameObjectSprite}
     */
    class Player extends objects.GameObjectSprite {
        // CONSTRUCTOR
        /**
         *Creates an instance of Player.
         * @param {createjs.SpriteSheet} spritePath
         * @param {string} imageName
         * @param {number} x
         * @param {number} y
         * @param {string} name
         * @memberof Player
         */
        constructor(spritePath, imageName, x, y, name) {
            super(spritePath, imageName, x, y, true);
            // PRIVATE INSTANCE MEMBER
            this._bulletNum = 10;
            this._health = 2;
            this._name = "player";
            this._weaponType = "normal";
            this.name = name;
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
        get name() {
            return this._name;
        }
        set name(newName) {
            this._name = newName;
        }
        get weaponType() {
            return this._weaponType;
        }
        set weaponType(newWeapon) {
            this._weaponType = newWeapon;
        }
        // PRIVATE METHODS
        /**
         * Method for check bounds with stage boundaries
         *
         * @protected
         * @memberof Player
         */
        _checkBounds() {
            // check left border
            if (this.x < this.halfWidth) {
                this.position.x = this.halfWidth;
            }
            // check the right border
            if (this.x > util.STAGE_W - this.halfWidth) {
                this.position.x = util.STAGE_W - this.halfWidth;
            }
            // check the top border
            if (this.y < util.STAGE_BOUNDARY_TOP + this.halfHeight) {
                this.position.y = util.STAGE_BOUNDARY_TOP + this.halfHeight;
            }
            // check the top border
            if (this.y > util.STAGE_H - this.halfHeight) {
                this.position.y = util.STAGE_H - this.halfHeight;
            }
        }
        // PUBLIC METHODS
        // Life Cycle Methods
        /**
         * This method is used for initialization
         *
         * @memberof Player
         */
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on("tick", () => {
                this.Update();
            });
        }
        /**
         * This method is used to update the object
         *
         * @memberof Player
         */
        Update() {
            // update player position
            this.position = new objects.Vector2(this.position.x, this.position.y);
            this._checkBounds();
        }
        /**
         * This method is used to reset to the initial status
         *
         * @memberof Player
         */
        Reset() { }
        // PUBLIC CLASS SPECIFIC METHODS
        /**
         * Method to move the object to left
         *
         * @memberof Player
         */
        moveLeft() {
            this.position.add(objects.Vector2.scale(objects.Vector2.left(), 5));
        }
        /**
         * Method to move the object to right
         *
         * @memberof Player
         */
        moveRight() {
            this.position.add(objects.Vector2.scale(objects.Vector2.right(), 5));
        }
        /**
         * Method to move the object to up
         *
         * @memberof Player
         */
        moveUp() {
            this.position.add(objects.Vector2.scale(objects.Vector2.up(), 5));
        }
        /**
         * Method to move the object to down
         *
         * @memberof Player
         */
        moveDown() {
            this.position.add(objects.Vector2.scale(objects.Vector2.down(), 5));
        }
        /**
         * Method to make player shoot bullets
         *
         * @memberof Player
         */
        shoot(atlas, imageName, aim) {
            let bullets = new Array();
            switch (this.weaponType) {
                case "normal":
                    {
                        let bullet = new objects.Bullet(atlas, imageName, this.position.x, this.position.y + 10, aim);
                        bullet.owner = this.name;
                        bullets.push(bullet);
                    }
                    break;
                case "3way":
                    {
                        let bullet1 = new objects.Bullet(atlas, imageName, this.position.x, this.position.y + 10, objects.Vector2.scale(aim, 10), true);
                        let bullet2 = new objects.Bullet(atlas, imageName, this.position.x, this.position.y + 10, objects.Vector2.scale(objects.Vector2.add(aim, new objects.Vector2(aim.x, 1)), 3), true);
                        let bullet3 = new objects.Bullet(atlas, imageName, this.position.x, this.position.y + 10, objects.Vector2.scale(objects.Vector2.add(aim, new objects.Vector2(aim.x, -1)), 3), true);
                        bullet1.owner = this.name;
                        bullet2.owner = this.name;
                        bullet3.owner = this.name;
                        bullets.push(bullet1);
                        bullets.push(bullet2);
                        bullets.push(bullet3);
                    }
                    break;
            }
            // check if this player still have bullet or not
            if (this.bulletNum > 0) {
                createjs.Sound.play("shoot");
                this.bulletNum -= 1;
                // return bullet;
                return bullets;
            }
            else {
                return null; // nullable
            }
        }
        /**
         * Method to explode
         *
         * @memberof Player
         */
        explode() { }
        /**
         * Method to animate the object
         *
         * @param {string} stop
         * @param {string} start
         * @memberof Player
         */
        ChangeAnimation(stop, start) {
            this.UpdateAnimation(stop, start);
        }
    }
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map