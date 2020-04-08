module objects {
    export class Explosion extends objects.GameObjectSprite {
        // public properties

        // constructor
        constructor(x: number, y: number) {
            super(util.GameConfig.ATLAS, "explosion", x, y, true);

            this.Start();
        }

        // private methods
        protected _checkBounds(): void {

        }

        // public methods

        public Reset(): void {

        }        
        
        public Start(): void {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on("tick", () => {
              this.Update();
            });
        }

        public Update(): void {
            this.position = new Vector2(this.position.x, this.position.y);
        }

        public Destroy(): void {
            this.parent.removeChild(this);
        }
    }
}