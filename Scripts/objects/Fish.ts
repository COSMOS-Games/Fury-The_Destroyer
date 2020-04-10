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
   *
   *
   * @export
   * @class Fish
   * @extends {GameObject}
   */
  export class Fish extends GameObject {
    // private fields
    private _angle: number = 0;
    private _health: number = 6;
    private _verticalSpeed: number = 0;
    private _horizontalSpeed: number = 0;

    // PUBLIC PROPERTIES
    public set health(newNum: number) {
      this._health = newNum;
    }
    public get health(): number {
      return this._health;
    }

    // constructor
    constructor(imagePath: string, x: number, y: number) {
      super(imagePath, x, y, true);
      this.Start();
    }

    // private method
    private _move(): void {
      // change position in cyclic movement
      let accelaration = new Vector2(0, Math.sin(this._angle));
      this._angle += 0.1;

      // base velocity
      this.position.add(this.velocity);
      this.position.add(accelaration);
    }

    protected _checkBounds(): void {
      // check vertical boundary
      if (this.position.y > util.STAGE_W + this.height) {
        this.Reset();
      }
      // check horizontal boundary
      if (
        this.position.x < this.halfWidth ||
        this.position.x > util.STAGE_H - this.halfWidth
      ) {
        this._horizontalSpeed = -this._horizontalSpeed;
        this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
      }
    }

    // public method
    public Start(): void {
      // this.alpha = 0.8; // transparency set to 80%
      this.scaleX = 0.9;
      this.scaleY = 0.9;
      this.Reset();
    }

    public Update(): void {
      this._checkBounds();
      this._move();
    }

    public Reset(): void {
      this._verticalSpeed = util.Mathf.RandomRange(1, 2); // speed ranges from 1 to 2 px per frame
      this._horizontalSpeed = util.Mathf.RandomRange(-1, 1); // random horizontal drift
      this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
      let randomX = util.Mathf.RandomRange(
        this.halfWidth,
        util.STAGE_W - this.halfWidth
      );
      let randomY = util.Mathf.RandomRange(-this.height * 2, -this.height);
      this.position = new Vector2(randomX, randomY, this);
    }
  }
}
