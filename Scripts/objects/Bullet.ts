module objects {
    export class Bullet extends GameObject {
        // variables
        private _owner: string = "";

        // properties
        get owner(): string {
            return this._owner;
        }

        set owner(newOwner: string) {
            this._owner = newOwner;
        }


        constructor(imagePath: string, x: number, y: number, direction: Vector2, isSpecialWeapon?: true) {
            super(imagePath, x, y, true);

            if (isSpecialWeapon) {
                // let speed = 10;
                // direction.scale(speed);
                this.velocity = direction; // velocity = direction * speed
            } else {
                let speed = 10;
                direction.scale(speed);
                this.velocity = direction; // velocity = direction * speed
            }

            this.Start();
        }

        // private method
        protected _checkBounds(): void {
            // simplying check the right border
            if (this.x >= util.STAGE_W - this.halfWidth) {
                this.velocity = Vector2.zero(); // stop movement
            }
            // check the left border
            else if (this.x <= this.halfWidth) {
                this.velocity = Vector2.zero(); // stop movement
            }
        }

        // public method
        public Start(): void {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', () => {
                this.Update();
            });
        }

        public Update(): void {
            this._checkBounds();

            this.position.add(this.velocity); // bullet has velocity, or movement
            this.position = new Vector2(this.position.x, this.position.y);
        }

        public Reset(): void {

        }
    }
}