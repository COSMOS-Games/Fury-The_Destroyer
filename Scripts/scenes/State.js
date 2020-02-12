"use strict";
var scenes;
(function (scenes) {
    let State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["FIRST"] = 1] = "FIRST";
        State[State["STAGECLEANED"] = 2] = "STAGECLEANED";
        State[State["SECOND"] = 3] = "SECOND";
        State[State["THIRD"] = 4] = "THIRD";
        State[State["END"] = 5] = "END";
        State[State["NUM_OF_SCENES"] = 6] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map