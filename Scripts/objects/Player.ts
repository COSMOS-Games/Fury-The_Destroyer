module objects {
    export class Player extends GameObject {
        // PRIVATE INSTANCE MEMBER
        private _bulletNum: number = 3;
        private _dxy:number = 10;

        // PUBLIC PROPERTIES
        get bulletNum():number{
            return this._bulletNum;
        }

        set bulletNum(newNum:number){
            this._bulletNum = newNum;
        }

        get dxy():number{
            return this._dxy;
        }

        set dxy(newNum:number){
            this._dxy = newNum;
        }

        // CONSTRUCTOR
        constructor(x:number, y:number) {
            super("./Assets/images/placeholder.png", x, y, true);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
        }

        // PUBLIC METHODS
        public Start(): void {

        }

        public Update(): void {
            //this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        }

        public Reset(): void {
        }

        // movement
        public moveLeft(): void {
            // check left bound
            if(this.x > this.halfWidth){
                this.position = new Vector2(this.position.x - this.dxy, this.position.y);
            }
        }

        public moveRight(): void {
            // check the right bound
            if(this.x < 960 - this.halfWidth){
                this.position = new Vector2(this.position.x + this.dxy, this.position.y);
            }
        }

        public moveUp(): void {
            if(this.y > this.halfHeight){
                this.position = new Vector2(this.position.x, this.position.y - this.dxy);
            }
        }

        public moveDown(): void {
            if(this.y < 640 - this.halfHeight){
                this.position = new Vector2(this.position.x, this.position.y + this.dxy);
            }
        }

        public shoot(): objects.Bullet {
            let bullet = new Bullet(this.position.x, this.position.y);
            return bullet;
        }
    }
}