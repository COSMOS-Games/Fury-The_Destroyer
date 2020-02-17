"use strict";
var util;
(function (util) {
    // image assets
    util.BACKGROUND_PATH = './Assets/images/first-screen.png';
    util.BACKGROUND_PATH_GAME = './Assets/images/game-screen.png';
    util.BACKGROUND_PATH_END = './Assets/images/final-screen.png';
    // Player image assets
    util.PALYER_A_SUBMARINE = './Assets/images/submarineA.png';
    util.PALYER_B_SUBMARINE = './Assets/images/submarineB.png';
    // player bullet image assets
    util.PLAYER_A_BULLET = './Assets/images/MilitaryRocketA.png';
    util.PLAYER_B_BULLET = './Assets/images/MilitaryRocketB.png';
    // button image assets
    // ref: https://www.behance.net/gallery/21061821/UI-elements-for-game-application
    util.PLAY_BUTTON = './Assets/images/btn-play.png';
    util.RESTART_BUTTON = './Assets/images/play-again-btn.png';
    //
    util.MINE = './Assets/images/mine.png';
    util.MINE_NUM = 15;
    // 
    util.STAGE_W = 960;
    util.STAGE_H = 640;
    util.PLAYER_A_POS = new objects.Vector2(50, 75);
    util.PLAYER_B_POS = new objects.Vector2(900, 500);
})(util || (util = {}));
//# sourceMappingURL=constants.js.map