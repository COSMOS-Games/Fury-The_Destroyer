module objects {
    export class Player extends GameObjectSprite {
        // PRIVATE INSTANCE MEMBER
        //    private _bulletNum: number = 5;
        private _bulletNum: number = 10;
        private _health: number = 3;
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
        constructor(spritePath: createjs.SpriteSheet, imageName: string, x: number, y: number, name: string) {
            super(spritePath, imageName, x, y, true);
            this.name = name;
            this.Start();
        }

        // PRIVATE METHODS
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

        private _checkHealth(): void {
            if (this.health <= 0) {
                console.log("You're already dead");
            }
        }

        // PUBLIC METHODS
        public Start(): void {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on("tick", () => {
                this.Update();
            });
        }

        public Update(): void {
            // update player position
            this.position = new Vector2(this.position.x, this.position.y);
            this._checkBounds();

            if (this.health == 1) {
                let rotationDirection = this.name == "PlayerA" ? -1 : 1;

                if (createjs.Ticker.getTicks() % 15 == 0) {
                    this.rotation += 4 * rotationDirection;
                } else if (createjs.Ticker.getTicks() % 5 == 0) {
                    this.rotation -= 2 * rotationDirection;
                }
            }

        }

        public Reset(): void { }

        public moveLeft(): void {
            this.position.add(Vector2.scale(Vector2.left(), 5));
        }

        public moveRight(): void {
            this.position.add(Vector2.scale(Vector2.right(), 5));
        }

        public moveUp(): void {
            this.position.add(Vector2.scale(Vector2.up(), 5));
        }

        public moveDown(): void {
            this.position.add(Vector2.scale(Vector2.down(), 5));
        }

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
                createjs.Sound.play("shoot", { volume: 0.5 });
                this.bulletNum -= 1;

                // return bullet;
                return bullets;
            } else {
                return null; // nullable
            }
        }

        public explode(): void { }

        public ChangeAnimation(stop: string, start: string): void {
            this.UpdateAnimation(stop, start);
        }
    }
}
