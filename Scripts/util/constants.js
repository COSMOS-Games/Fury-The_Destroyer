"use strict";
var util;
(function (util) {
    // image assets
    util.BACKGROUND_PATH_GAME = "./Assets/images/game-screen.png";
    util.FURY_PATH = "./Assets/images/fury.png";
    util.THE_DESTROYER_PATH = "./Assets/images/the-destroyer.png";
    util.GAME_OVER_PATH = "./Assets/images/game-over.png";
    util.NEXT_BATTLE_PATH = "./Assets/images/next-battle.png";
    util.INSTRUCTIONS = "./Assets/images/instructions.png";
    util.INSTRUCTION_PATH = "./Assets/images/instruction.png";
    // Player image assets
    util.PALYER_A_SUBMARINE = "./Assets/images/submarineA.png";
    util.PALYER_B_SUBMARINE = "./Assets/images/submarineB.png";
    // player bullet image assets
    util.PLAYER_A_BULLET = "./Assets/images/MilitaryRocketA.png";
    util.PLAYER_B_BULLET = "./Assets/images/MilitaryRocketB.png";
    // button image assets
    // ref: https://www.behance.net/gallery/21061821/UI-elements-for-game-application
    util.PLAY_BUTTON = "./Assets/images/btn-play.png";
    util.RESTART_BUTTON = "./Assets/images/btn-play-again.png";
    util.MAIN_BUTTON = "./Assets/images/btn-main-menu.png";
    util.INSTRUCTION_BUTTON = "./Assets/images/btn-instructions.png";
    util.NEXT_BUTTON = "./Assets/images/btn-next.png";
    // font
    util.FONT_SIZE = "28px";
    util.FONT_FAMILY = "Consolas";
    util.FONT_COLOR = "White";
    //
    util.MINE = "./Assets/images/mine.png";
    util.MINE_NUM = 15;
    //
    util.STAGE_W = 960;
    util.STAGE_H = 640;
    //
    util.STAGE_BOUNDARY_TOP = 45;
    util.PLAYER_A_POS = new objects.Vector2(50, 75);
    util.PLAYER_B_POS = new objects.Vector2(900, 500);
})(util || (util = {}));
//# sourceMappingURL=constants.js.map