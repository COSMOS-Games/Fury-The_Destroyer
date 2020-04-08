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
    /**
     * Class for Explosion
     *
     * @export
     * @class Explosion
     * @extends {objects.GameObjectSprite}
     */
    export class Explosion extends objects.GameObjectSprite {
        // PRIVATE INSTANCE MEMBERS


        // CONSTRUCTORS
        /**
         *Creates an instance of Explosion.
         * @param {number} x
         * @param {number} y
         * @memberof Explosion
         */
        constructor(x: number, y: number) {
            super(util.GameConfig.ATLAS, "explosion", x, y, true);

            setTimeout(() => {
                this.Destroy();
            }, 700);
        }

        // PRIVATE METHODS
        /**
         * Method for check bounds 
         * 
         * @protected
         * @memberof Explosion
         */
        protected _checkBounds(): void {

        }

        // PUBLIC METHODS
        // Life Cycle Methods

        /**
         * This method is used for initialization
         *
         * @memberof Explosion
         */
        public Start(): void {

        }

        /**
         * This method is used to update the object
         *
         * @memberof Explosion
         */
        public Update(): void {

        }

        /**
         * This method is used to reset to the initial status
         *
         * @memberof Explosion
         */
        public Reset(): void {

        }

        /**
         * This method is used to remove the object from the stage
         *
         * @memberof Explosion
         */
        public Destroy(): void {
            this.parent.removeChild(this);
        }
    }
}