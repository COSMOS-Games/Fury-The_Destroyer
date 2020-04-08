"use strict";
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
var scenes;
(function (scenes) {
    /**
     * This is used for the scene state which can be assigned to each scene and accessed everywhere
     *
     * @export
     * @enum {number}
     */
    let State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["SPLASH"] = 0] = "SPLASH";
        State[State["START"] = 1] = "START";
        State[State["INSTRUCTIONS"] = 2] = "INSTRUCTIONS";
        State[State["FIRST"] = 3] = "FIRST";
        State[State["STAGECLEANED"] = 4] = "STAGECLEANED";
        State[State["SECOND"] = 5] = "SECOND";
        State[State["STAGECLEANEDAGAIN"] = 6] = "STAGECLEANEDAGAIN";
        State[State["THIRD"] = 7] = "THIRD";
        State[State["END"] = 8] = "END";
        State[State["NUM_OF_SCENES"] = 9] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map