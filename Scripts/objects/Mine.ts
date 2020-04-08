/**
 * COSMOS Games
 * 
 * April 12, 2020
 * 
 * Contributors:
 * - Logan J. Kim
 * - Kei Mizubuchi
 * - Hang Li
 * - Ygor Almeida
 * 
 * Description:
 * Fury, the Destroyers, is two players single screen submarine game which is designed to bring joys
 * to number of people who play this game. This game will contain three stages.
 * Players level up once the stage is cleared by meeting all conditions including eliminating all enemies on a map.
 *
 * Versions:
 * - v4.0 Final Release
 * - v3.0 Beta Release
 * - v2.0 Alpha Release
 * - v1.0 Pre-Alpha Release
 */
module objects {
    export class Mine extends GameObjectSprite {

        // private fields
        private _angle: number = 0;

        constructor(atlas: createjs.SpriteSheet, imageName: string, x: number, y: number) {
            super(atlas, imageName, x, y, true);

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