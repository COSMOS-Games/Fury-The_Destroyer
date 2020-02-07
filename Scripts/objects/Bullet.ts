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
            return this._velocity;
        }

        set velocity(newVelocity: Vector2) {
            this._velocity = newVelocity;
        }

        constructor(imagePath:string, x: number, y: number, direction: Vector2) {
            super(imagePath, x, y, true);

            let speed = 10;
            direction.scale(speed);
            this._velocity = direction; // velocity = direction * speed

            this.Start();
        }

        // private method
        protected _checkBounds(): void {
            // simplying check the right border
            if (this.x >= 960 - this.halfWidth) {
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