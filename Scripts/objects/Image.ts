module objects {
    export class Image extends GameObject {
        // constructor
        constructor(imagePath: string, x: number = 0, y: number = 0, width: number = 0, height: number = 0, isCentered: boolean = false) {
            super(imagePath, x, y, isCentered);
            super.CustomSize(width, height, isCentered);
            this.Start();
        }

        // PUBLIC Methods
        HoverOver(): void {
            this.alpha = 0.7;
        }

        HoverOut(): void {
            this.alpha = 1;
        }

        HoverOn(): void {
            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);
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
            createjs.Sound.play("button2", {volume: 0.05});
        }


        public Update(): void {

        }

        public Reset(): void {

        }
    }
}