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

module scenes {
  /**
   * This is used for the scene state which can be assigned to each scene and accessed everywhere
   *
   * @export
   * @enum {number}
   */
  export enum State {
    NO_SCENE = -1,
    SPLASH,
    START,
    INSTRUCTIONS,
    MOVE_INSTRUCTION,
    SHOOT_INSTRUCTION,
    INSTRUCTION_CLEAN,
    FIRST,
    STAGE_CLEANED,
    SECOND,
    STAGE_CLEANEDAGAIN,
    THIRD,
    END,
    NUM_OF_SCENES,
  }
}
