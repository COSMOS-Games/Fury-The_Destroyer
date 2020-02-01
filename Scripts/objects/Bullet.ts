module objects {
    export class Bullet extends GameObject {
        // variables
        private _owner: string = "";

        // properties
        get owner(): string {
            return this._owner;
        }

        set owner(newOwner: string) {
            this._owner = newOwner;
        }

        // constructor
        constructor(x:number, y:number) {
            super("./Assets/images/placeholder.png", x, y, true);
            this.Start();
        }

        // private method
        protected _checkBounds(): void {

        }

        // public method
        public Start(): void {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', ()=>{
                this.Update();
            });
            
        }

        public Update(): void {
            if (this.position) {
                this.position = new Vector2(this.position.x + 1, this.position.y);
            }
        }
        public Reset(): void {

        }
    }
}