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
    export abstract class GameObject extends createjs.Bitmap {
        // PRIVATE INSTANCE MEMBERS
        private _width: number;
        private _height: number;
        private _halfWidth: number;
        private _halfHeight: number;
        private _position: Vector2;
        private _velocity: Vector2;
        private _isColliding: boolean;
        private _isCentered: boolean;

        // PUBLIC PROPERTIES
        get width(): number {
            return this._width;
        }

        set width(newWidth: number) {
            this._width = newWidth;
            this._halfWidth = this._computeHalfWidth();
        }

        get height(): number {
            return this._height;
        }

        set height(newHeight: number) {
            this._height = newHeight;
            this._halfHeight = this._computeHalfHeight();
        }

        get halfWidth(): number {
            return this._halfWidth;
        }

        get halfHeight(): number {
            return this._halfHeight;
        }

        get position(): Vector2 {
            return this._position;
        }

        set position(newPosition: Vector2) {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        get velocity(): Vector2 {
            return this._velocity;
        }

        set velocity(newVelocity: Vector2) {
            this._velocity = newVelocity;
        }

        get isColliding(): boolean {
            return this._isColliding;
        }

        set isColliding(newState: boolean) {
            this._isColliding = newState;
        }

        get isCentered(): boolean {
            return this._isCentered;
        }

        set isCentered(newState: boolean) {
            this._isCentered = newState;
            if (newState) {
                this._centerGameObject();
            }
        }


        // CONSTRUCTOR
        constructor(imageString: Object = './Assets/images/placeholder.png',
            x: number = 0, y: number = 0, centered: boolean = false) {
            super(imageString);

            // initialization
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._position = new Vector2(0, 0, this);
            this._velocity = new Vector2(0, 0);
            this._isColliding = false;
            this._isCentered = false;

            this.position = new Vector2(x, y, this);

            this.isCentered = centered;
            this.image.addEventListener('load', () => {
                this.width = this.getBounds().width;
                this.height = this.getBounds().height;
                if (this.isCentered) {
                    this._centerGameObject();
                }
            })

        }

        // PRIVATE METHODS
        private _computeHalfWidth(): number {
            return this.width * 0.5;
        }

        private _computeHalfHeight(): number {
            return this.height * 0.5;
        }

        private _centerGameObject(): void {
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }

        protected abstract _checkBounds(): void;


        // PUBLIC METHODS

        public abstract Start(): void;

        public abstract Update(): void;

        public abstract Reset(): void;

        public CustomSize(width: number = this.getBounds().width, height: number = this.getBounds().height, isCentered: boolean = false): void {
            this.image.addEventListener('load', () => {
                this.scaleX = width / this.getBounds().width;
                this.scaleY = height / this.getBounds().height;
                this.isCentered = isCentered;
                if (this.isCentered) {
                    this._centerGameObject();
                }

            });
        }

    }

}
