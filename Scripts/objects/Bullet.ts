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
        constructor() {
            // TO-DO: find out how to move bullets
            super("./Assets/images/placeholder.png", 0, 0, true);
            console.log("in the constructor: " + this.position.y);
            this.Start();
        }

        // private method
        protected _checkBounds(): void {

        }

        // public method
        public Start(): void {
            createjs.Ticker.framerate = 5;
            createjs.Ticker.on('tick', this.Update);
        }

        public Update(): void {
            if (this.position) {
                console.log(this.position.y);
                this.position = new Vector2(this.position.x, this.position.y + 2);
            }
            console.log("position didn't found!");
        }
        public Reset(): void {

        }
    }
}