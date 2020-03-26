"use strict";
var scenes;
(function (scenes) {
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