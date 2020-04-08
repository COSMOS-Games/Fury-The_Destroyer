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
module objects {
    /**
     * Class for Player
     *
     * @export
     * @class Player
     * @extends {GameObjectSprite}
     */
    export class Player extends GameObjectSprite {
        // PRIVATE INSTANCE MEMBER
        private _bulletNum: number = 10;
        private _health: number = 2;
        private _name: string = "player";
        private _weaponType: String = "normal";

        // PUBLIC PROPERTIES
        get bulletNum(): number {
            return this._bulletNum;
        }

        set bulletNum(newNum: number) {
            this._bulletNum = newNum;
        }

        get health(): number {
            return this._health;
        }

        set health(newNum: number) {
            this._health = newNum;
        }

        get name(): string {
            return this._name;
        }

        set name(newName: string) {
            this._name = newName;
        }

        get weaponType(): String {
            return this._weaponType;
        }

        set weaponType(newWeapon: String) {
            this._weaponType = newWeapon;
        }

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
        constructor(spritePath: createjs.SpriteSheet, imageName: string, x: number, y: number, name: string) {
            super(spritePath, imageName, x, y, true);
            this.name = name;
            this.Start();
        }

        // PRIVATE METHODS
        /**
         * Method for check bounds with stage boundaries
         *
         * @protected
         * @memberof Player
         */
        protected _checkBounds(): void {
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
        public Start(): void {
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
        public Update(): void {
            // update player position
            this.position = new Vector2(this.position.x, this.position.y);
            this._checkBounds();
        }

        /**
         * This method is used to reset to the initial status
         *
         * @memberof Player
         */
        public Reset(): void { }

        // PUBLIC CLASS SPECIFIC METHODS
        /**
         * Method to move the object to left
         *
         * @memberof Player
         */
        public moveLeft(): void {
            this.position.add(Vector2.scale(Vector2.left(), 5));
        }

        /**
         * Method to move the object to right
         *
         * @memberof Player
         */
        public moveRight(): void {
            this.position.add(Vector2.scale(Vector2.right(), 5));
        }

        /**
         * Method to move the object to up
         *
         * @memberof Player
         */
        public moveUp(): void {
            this.position.add(Vector2.scale(Vector2.up(), 5));
        }

        /**
         * Method to move the object to down
         *
         * @memberof Player
         */
        public moveDown(): void {
            this.position.add(Vector2.scale(Vector2.down(), 5));
        }

        /**
         * Method to make player shoot bullets
         *
         * @memberof Player
         */
        public shoot(
            atlas: createjs.SpriteSheet,
            imageName: string,
            aim: Vector2
        ): Array<objects.Bullet> | null {
            let bullets = new Array<Bullet>();
            switch (this.weaponType) {
                case "normal":
                    {
                        let bullet = new Bullet(
                            atlas,
                            imageName,
                            this.position.x,
                            this.position.y + 10,
                            aim
                        );
                        bullet.owner = this.name;

                        bullets.push(bullet);
                    }
                    break;
                case "3way":
                    {
                        let bullet1 = new Bullet(
                            atlas,
                            imageName,
                            this.position.x,
                            this.position.y + 10,
                            Vector2.scale(aim, 10),
                            true
                        );
                        let bullet2 = new Bullet(
                            atlas,
                            imageName,
                            this.position.x,
                            this.position.y + 10,
                            Vector2.scale(Vector2.add(aim, new Vector2(aim.x, 1)), 3),
                            true
                        );
                        let bullet3 = new Bullet(
                            atlas,
                            imageName,
                            this.position.x,
                            this.position.y + 10,
                            Vector2.scale(Vector2.add(aim, new Vector2(aim.x, -1)), 3),
                            true
                        );

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
            } else {
                return null; // nullable
            }
        }


        /**
         * Method to explode
         *
         * @memberof Player
         */
        public explode(): void { }

        /**
         * Method to animate the object
         *
         * @param {string} stop
         * @param {string} start
         * @memberof Player
         */
        public ChangeAnimation(stop: string, start: string): void {
            this.UpdateAnimation(stop, start);
        }
    }
}
