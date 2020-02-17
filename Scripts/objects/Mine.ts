module objects {



    export class Mine extends GameObject {
        // variables
        private _velocity: Vector2 = Vector2.zero(); // velocity = movement

        // properties

        get velocity(): Vector2 {
            return this._velocity;
        }

        set velocity(newVelocity: Vector2) {
            this._velocity = newVelocity;
        }

        constructor(imagePath: string, x: number, y: number) {
            super(imagePath, x, y, true);

            this.Start();
        }

        // private method
        protected _checkBounds(): void {
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

            this.position = new Vector2(this.position.x, this.position.y);
        }

        public Reset(): void {

        }
    }
}