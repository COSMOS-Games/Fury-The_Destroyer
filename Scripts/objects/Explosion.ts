module objects {
    export class Explosion extends objects.GameObjectSprite {
        // public properties

        // constructor
        constructor(x: number, y: number) {
            super(util.GameConfig.ATLAS, "explosion", x, y, true);
            createjs.Sound.play("impact", {volume: 0.1});

            setTimeout(() => {
                this.Destroy();
            }, 700);
        }

        // private methods
        protected _checkBounds(): void {

        }

        // public methods

        public Reset(): void {

        }

        public Start(): void {

        }

        public Update(): void {

        }

        public Destroy(): void {
            this.parent.removeChild(this);
        }
    }
}