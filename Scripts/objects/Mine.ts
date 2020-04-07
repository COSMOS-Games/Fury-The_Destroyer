module objects {



    export class Mine extends GameObject {

        // private fields
        private _angle: number = 0;

        constructor(imagePath: string, x: number, y: number) {
            super(imagePath, x, y, true);

            this.Start();
        }

        // private method
        protected _checkBounds(): void {
            // check the top border
            if (this.y < util.STAGE_BOUNDARY_TOP + this.halfHeight) {
                this.position.y = util.STAGE_BOUNDARY_TOP + this.halfHeight;
            }
            // check the top border
            if (this.y > util.STAGE_H - this.halfHeight) {
                this.position.y = util.STAGE_H - this.halfHeight;
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

            // change position in cyclic movement
            this.position.y += Math.sin(this._angle) / 3.5;

            // change scale 
            this.scaleX = this.scaleY
                = 1 + Math.sin(this._angle) * 0.05;

            this._angle += 0.02;

            this.position = new Vector2(this.position.x, this.position.y);
        }

        public Reset(): void {

        }
    }
}