module objects {
    export class Player extends GameObject {
        // PRIVATE INSTANCE MEMBER
        private _bulletNum: number = 3;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super("./Assets/images/placeholder.png", 0, 0, true);
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
            this.position = new Vector2(this.position.x - 10, this.position.y);
            console.log("LEFT: " + this.position.y);
        }

        public moveRight(): void {
            this.position = new Vector2(this.position.x + 10, this.position.y);
            console.log("RIGHT: " + this.position.y);
        }

        public moveUp(): void {
            this.position = new Vector2(this.position.x, this.position.y - 10);
            console.log("UP: " + this.position.y);
        }

        public moveDown(): void {
            this.position = new Vector2(this.position.x, this.position.y + 10);
            console.log("DOWN: " + this.position.y);
        }

        public shoot(): objects.Bullet {
            let bullet = new Bullet();
            bullet.position = this.position;
            console.log('BULLET!!! position:' + bullet.position.x);

            return bullet;
        }
    }
}