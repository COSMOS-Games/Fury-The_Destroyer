module objects {
    export class Player extends GameObject {
        // PRIVATE INSTANCE MEMBER
        // private _bulletNum: number = 3;
        private _bulletNum: number = 50;
        private _health: number = 1;

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

        // CONSTRUCTOR
        constructor(x: number, y: number) {
            super("./Assets/images/placeholder.png", x, y, true);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            // check left border
            if (this.x < this.halfWidth) {
                this.position.x = this.halfWidth;
            }
            // check the right border
            if (this.x > 960 - this.halfWidth) {
                this.position.x = 960 - this.halfWidth;
            }
            // check the top border
            if (this.y < this.halfHeight) {
                this.position.y = this.halfHeight;
            }
            // check the top border
            if (this.y > 640 - this.halfHeight) {
                this.position.y = 640 - this.halfHeight;
            }
        }

        // PUBLIC METHODS
        public Start(): void {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', () => {
                this.Update();
            });
        }

        public Update(): void {
            // update player position
            this.position = new Vector2(this.position.x, this.position.y);

            this._checkBounds();
        }

        public Reset(): void {

        }

        public moveLeft(): void {
            let velocity = Vector2.left();
            velocity.scale(10);
            this.position.add(velocity);
        }

        public moveRight(): void {
            let velocity = Vector2.right();
            velocity.scale(10);
            this.position.add(velocity);
        }

        public moveUp(): void {
            let velocity = Vector2.up();
            velocity.scale(10);
            this.position.add(velocity);
        }

        public moveDown(): void {
            let velocity = Vector2.down();
            velocity.scale(10);
            this.position.add(velocity);
        }

        public shoot(aim: Vector2): objects.Bullet {
            // check if this player still have bullet or not
            if (this.bulletNum > 0) {
                let bullet = new Bullet(this.position.x, this.position.y, aim);
                this.bulletNum -= 1;
                return bullet;
            }
            else {
                // if no availble bullet, return bullet with position negitive
                // which check on game engineer that this bullet will not be add to stage
                // not shown to player
                return new objects.Bullet(-1, -1, Vector2.zero());
            }
        }
    }
}