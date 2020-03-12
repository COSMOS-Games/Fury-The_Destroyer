module util {
  // image assets
  export const BACKGROUND_PATH: string = "./Assets/images/first-screen.png";
  export const BACKGROUND_PATH_GAME: string = "./Assets/images/game-screen.png";
  export const BACKGROUND_PATH_END: string = "./Assets/images/final-screen.png";
  export const NEXT_BATTLE_PATH: string = "./Assets/images/NextBattle.png";
  export const INSTRUCTIONS: string = "./Assets/images/instructions.png"
  export const INSTRUCTION_PATH: string = "./Assets/images/instruction.png";

  // Player image assets
  export const PALYER_A_SUBMARINE: string = "./Assets/images/submarineA.png";
  export const PALYER_B_SUBMARINE: string = "./Assets/images/submarineB.png";

  // player bullet image assets
  export const PLAYER_A_BULLET: string = "./Assets/images/MilitaryRocketA.png";
  export const PLAYER_B_BULLET: string = "./Assets/images/MilitaryRocketB.png";

  // button image assets
  // ref: https://www.behance.net/gallery/21061821/UI-elements-for-game-application
  export const PLAY_BUTTON: string = "./Assets/images/btn-play.png";
  export const RESTART_BUTTON: string = "./Assets/images/btn-play-again.png";
  export const MAIN_BUTTON: string = "./Assets/images/btn-main-menu.png"
  export const INSTRUCTION_BUTTON: string = "./Assets/images/btn-instructions.png"
  export const NEXT_BUTTON: string = "./Assets/images/btn-next.png"

  // font
  export const FONT_SIZE: string = "28px";
  export const FONT_FAMILY: string = "Consolas";
  export const FONT_COLOR: string = "White";

  //
  export const MINE: string = "./Assets/images/mine.png";
  export const MINE_NUM: number = 15;
  //
  export const STAGE_W: number = 960;
  export const STAGE_H: number = 640;

  //
  export const STAGE_BOUNDARY_TOP = 45;

  export const PLAYER_A_POS: objects.Vector2 = new objects.Vector2(50, 75);
  export const PLAYER_B_POS: objects.Vector2 = new objects.Vector2(900, 500);

}
