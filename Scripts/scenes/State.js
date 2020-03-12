"use strict";
var scenes;
(function (scenes) {
    let State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["INSTRUCTIONS"] = 1] = "INSTRUCTIONS";
        State[State["FIRST"] = 2] = "FIRST";
        State[State["STAGECLEANED"] = 3] = "STAGECLEANED";
        State[State["SECOND"] = 4] = "SECOND";
        State[State["THIRD"] = 5] = "THIRD";
        State[State["END"] = 6] = "END";
        State[State["NUM_OF_SCENES"] = 7] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map