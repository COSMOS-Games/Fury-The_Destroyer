"use strict";
var objects;
(function (objects) {
    class Player extends objects.GameObjectSprite {
        // CONSTRUCTOR
        constructor(spritePath, imageName, x, y, name) {
            super(spritePath, imageName, x, y, true);
            // PRIVATE INSTANCE MEMBER
            //    private _bulletNum: number = 5;
            this._bulletNum = 10;
            this._health = 3;
            this._name = "player";
            this._weaponType = "normal";
            this._isVulnerable = false;
            this._vulnerableCount = 0;
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
        get isVulnerable() {
            return this._isVulnerable;
        }
        set isVulnerable(newState) {
            this._isVulnerable = newState;
            if (newState) {
                this._vulnerableCount = createjs.Ticker.getTicks();
            }
            else {
                this._vulnerableCount = 0;
            }
        }
        // PRIVATE METHODS
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
        _checkHealth() {
            if (this.health <= 0) {
                console.log("You're already dead");
            }
        }
        // PUBLIC METHODS
        Start() {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on("tick", () => {
                this.Update();
            });
        }
        Update() {
            // update player position
            this.position = new objects.Vector2(this.position.x, this.position.y);
            this._checkBounds();
            // add blinking visual effect and invincible state
            if (this.isVulnerable) {
                if (createjs.Ticker.getTicks() % 15 < 7.5) {
                    this.alpha = 0.3;
                }
                else {
                    this.alpha = 1;
                }
                if (createjs.Ticker.getTicks() - this._vulnerableCount >= 90) {
                    this.isVulnerable = false;
                    this.alpha = 1;
                }
            }
            if (this.health == 1) {
                let rotationDirection = this.name == "PlayerA" ? -1 : 1;
                if (createjs.Ticker.getTicks() % 15 == 0) {
                    this.rotation += 4 * rotationDirection;
                }
                else if (createjs.Ticker.getTicks() % 5 == 0) {
                    this.rotation -= 2 * rotationDirection;
                }
            }
        }
        Reset() { }
        moveLeft() {
            this.position.add(objects.Vector2.scale(objects.Vector2.left(), 5));
        }
        moveRight() {
            this.position.add(objects.Vector2.scale(objects.Vector2.right(), 5));
        }
        moveUp() {
            this.position.add(objects.Vector2.scale(objects.Vector2.up(), 5));
        }
        moveDown() {
            this.position.add(objects.Vector2.scale(objects.Vector2.down(), 5));
        }
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
                createjs.Sound.play("shoot", { volume: 0.5 });
                this.bulletNum -= 1;
                // return bullet;
                return bullets;
            }
            else {
                return null; // nullable
            }
        }
        explode() { }
        ChangeAnimation(stop, start) {
            this.UpdateAnimation(stop, start);
        }
    }
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map