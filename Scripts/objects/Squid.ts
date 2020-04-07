module objects {



    export class Squid extends GameObject {

        // private fields
        private _angle: number = 0;

        private _health: number = 6;

        constructor(imagePath: string, x: number, y: number) {
            super(imagePath, x, y, true);


            this.Start();
        }

        // PUBLIC PROPERTIES
        get health(): number {
            return this._health;
        }

        set health(newNum: number) {
            this._health = newNum;
        }

        // private method
        protected _checkBounds(): void {
            // check left border
            if (this.x < -150) {
                this.position.x = this.halfWidth;
                this.Reset();

            }
            // check the right border
            if (this.x > util.STAGE_W + 150) {
                this.position.x = util.STAGE_W - this.halfWidth;
                this.Reset();
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

        // public method
        public Start(): void {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', () => {
                this.Update();
            });

            this.Reset();
        }

        public Update(): void {
            this._checkBounds();

            // change position in cyclic movement
            let accelaration = new Vector2(Math.sin(this._angle), 0);
            this._angle += 0.1;

            // base velocity
            this.position.add(this.velocity);
            this.position.add(accelaration);

        }

        public Reset(): void {

            let spawnX;
            let randomness = Math.round(Math.random());

            if (randomness == 1) {
                this.velocity = new Vector2(2, 0);
                spawnX = Math.round(0) - 150;
                this.scaleX = 1;
            } else {
                this.velocity = new Vector2(-2, 0);
                spawnX = Math.round(util.STAGE_W) + 150;
                this.scaleX = -1;
            }

            // reset spinning state
            this._health = 6;


            let spawnY = Math.floor(
                Math.random() * util.STAGE_H + util.STAGE_BOUNDARY_TOP
            );

            // hard corded safe area
            if (spawnY < util.PLAYER_A_POS.x + 100) {
                // determine Y so that the mine won't hit the player A
                spawnY = Math.floor(
                    Math.random() * util.STAGE_H + 250 + util.STAGE_BOUNDARY_TOP
                );
            } else {
                spawnY = Math.floor(
                    Math.random() * util.STAGE_H + util.STAGE_BOUNDARY_TOP
                );
                if (spawnY > util.STAGE_H - 200) {
                    // determine X so that the mine won't hit the player A
                    spawnY = Math.floor(Math.random() * util.STAGE_W - spawnY);
                }
            }


            this.position = new Vector2(spawnX, spawnY, this);

        }
    }
}