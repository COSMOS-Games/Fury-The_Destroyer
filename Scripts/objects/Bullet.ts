module objects {
    export class Bullet extends GameObject {
        // variables
        private _owner: string = "";
        private _dx:number = 2;

        // properties
        get owner(): string {
            return this._owner;
        }

        set owner(newOwner: string) {
            this._owner = newOwner;
        }

        get dx():number{
            return this._dx;
        }

        set dx(newDx:number){
            this._dx = newDx;
        }

        // constructor
        constructor(x:number, y:number) {
            super("./Assets/images/placeholder.png", x, y, true);
            this.Start();
        }

        // private method
        protected _checkBounds(): void {
            // TODO: check bounds based on direction

            // simplying check the right border
            if(this.x >= 960 - this.halfHeight){
                this.dx = 0;
            }
            // check the left border
            if(this.x <= this.halfHeight){
                this.dx = 2;
            }
        }

        // public method
        public Start(): void {
            createjs.Ticker.framerate = 60;
            createjs.Ticker.on('tick', ()=>{
                this.Update();
            });
            
        }

        public Update(): void {
            this.position = new Vector2(this.position.x + this.dx, this.position.y);
            this._checkBounds();
        }
        public Reset(): void {

        }
    }
}