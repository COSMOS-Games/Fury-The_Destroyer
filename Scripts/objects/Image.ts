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
     * Class for Image
     *
     * @export
     * @class Image
     * @extends {GameObject}
     */
    export class Image extends GameObject {
        // PRIVATE INSTANCE MEMBERS

        // CONSTRUCTOR
        /**
         *Creates an instance of Image.
         * @param {string} imagePath
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {number} [width=0]
         * @param {number} [height=0]
         * @param {boolean} [isCentered=false]
         * @memberof Image
         */
        constructor(imagePath: string, x: number = 0, y: number = 0, width: number = 0, height: number = 0, isCentered: boolean = false) {
            super(imagePath, x, y, isCentered);
            super.CustomSize(width, height, isCentered);
            this.Start();
        }

        // PRIVATE LIFE CYCLE METHODS
        protected _checkBounds(): void {

        }

        // PUBLIC LIFE CYCLE METHODS
        /**
         * initialization happens here
         *
         * @memberof Button
         */
        public Start(): void {

        }

        /**
         * This method is used to update the object
         *
         * @memberof Image
         */
        public Update(): void {

        }

        /**
         * This method is used to reset to the initial status
         *
         * @memberof Image
         */
        public Reset(): void {

        }

        // PUBLIC METHODS
        /**
         * This method changes alpha on hover over
         *
         * @memberof Image
         */
        HoverOver(): void {
            this.alpha = 0.7;
        }

        /**
         * This method changes back alpha on hover over
         *
         * @memberof Image
         */
        HoverOut(): void {
            this.alpha = 1;
        }

        /**
         * This method attaches hover events
         *
         * @memberof Image
         */
        HoverOn(): void {
            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);
        }

    }
}