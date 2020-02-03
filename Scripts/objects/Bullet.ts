module objects {
    export class Bullet extends GameObject {
        // variables
        private _owner: string = "";
        private _velocity: Vector2 = Vector2.zero(); // velocity = movement

        // properties
        get owner(): string {
            return this._owner;
        }

        set owner(newOwner: string) {
            this._owner = newOwner;
        }

        get velocity(): Vector2 {
            return new Vector2(this._velocity.x, this._velocity.y);
        }

        set velocity(newVelocity: Vector2) {
            this._velocity = newVelocity;
        }

        constructor(x: number, y: number, direction: Vector2) {
            super("./Assets/images/bullet-placeholder.png", x, y, true);

            let speed = 10;
            direction.scale(speed);
            this._velocity = direction; // velocity = direction * speed

            this.Start();
        }

        // private method
        protected _checkBounds(): void {
            // simplying check the right border
            if (this.x >= 960 - this.halfHeight) {
                this.velocity = Vector2.zero();
            }
            // check the left border
            if (this.x <= this.halfHeight) {
                // this.dx = 2;
                this.velocity = Vector2.zero();
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
            this.position.add(this.velocity); // bullet has velocity, or movement
            this.position = new Vector2(this.position.x, this.position.y);

            this._checkBounds();
        }

        public Reset(): void {
            //
        }
    }
}