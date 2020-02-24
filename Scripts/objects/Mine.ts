module objects {



    export class Mine extends GameObject {

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