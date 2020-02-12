module objects {
  export class Player extends GameObject {
    // PRIVATE INSTANCE MEMBER
    // private _bulletNum: number = 3;
    private _bulletNum: number = 5;
    private _health: number = 2;

    // PUBLIC PROPERTIES
    get bulletNum(): number {
      return this._bulletNum;
    }
    set bulletNum(newNum: number) {
      this._bulletNum = newNum;
    }

    get health(): number {
      return this._health;
    }

    set health(newNum: number) {
      this._health = newNum;
    }

    // CONSTRUCTOR
    constructor(imagePath: string, x: number, y: number) {
      super(imagePath, x, y, true);
      this.Start();
    }

    // PRIVATE METHODS
    protected _checkBounds(): void {
      // check left border
      if (this.x < this.halfWidth) {
        this.position.x = this.halfWidth;
      }
      // check the right border
      if (this.x > 960 - this.halfWidth) {
        this.position.x = 960 - this.halfWidth;
      }
      // check the top border
      if (this.y < this.halfHeight + 45) {
        this.position.y = this.halfHeight + 45;
      }
      // check the top border
      if (this.y > 640 - this.halfHeight) {
        this.position.y = 640 - this.halfHeight;
      }
    }

    private _checkHealth(): void {
      if (this.health <= 0) {
        console.log("You're already dead");
      }
    }

    // PUBLIC METHODS
    public Start(): void {
      createjs.Ticker.framerate = 60;
      createjs.Ticker.on("tick", () => {
        this.Update();
      });
    }

    public Update(): void {
      // update player position
      this.position = new Vector2(this.position.x, this.position.y);
      this._checkBounds();
    }

    public Reset(): void {}

    public moveLeft(): void {
      this.position.add(Vector2.scale(Vector2.left(), 5));
    }

    public moveRight(): void {
      this.position.add(Vector2.scale(Vector2.right(), 5));
    }

    public moveUp(): void {
      this.position.add(Vector2.scale(Vector2.up(), 5));
    }

    public moveDown(): void {
      this.position.add(Vector2.scale(Vector2.down(), 5));
    }

    public shoot(imagePath: string, aim: Vector2): objects.Bullet | null {
      // check if this player still have bullet or not
      if (this.bulletNum > 0) {
        let bullet = new Bullet(
          imagePath,
          this.position.x,
          this.position.y,
          aim
        );
        this.bulletNum -= 1;
        return bullet;
      } else {
        return null; // nullable
      }
    }

    public explode(): void {}
  }
}
