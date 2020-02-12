module objects {
  export abstract class Scene extends createjs.Container {
    constructor() {
      super();
    }

    // Life Cycle Functions

    /**
     * Initialization Method
     *
     * @abstract
     * @memberof Scene
     */
    public abstract Start(): void;

    /**
     * Updates all game objects attached to the Scene
     *
     * @abstract
     * @memberof Scene
     */
    public abstract Update(): void;

    /**
     * Scene functionality happens in this method
     *
     * @abstract
     * @memberof Scene
     */
    public abstract Main(): void;
  }
}
