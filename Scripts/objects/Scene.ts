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
