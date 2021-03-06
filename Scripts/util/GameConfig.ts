module util {
    export class GameConfig {
        public static STAGE: createjs.Stage;
        public static SCENE_STATE: scenes.State;
        public static PLAYER_A_LIVES: number;
        public static PLAYER_B_LIVES: number;
        public static PLAYER_A_BULLETS: number;
        public static PLAYER_B_BULLETS: number;
        public static PLAYER_A_SCORE: number;
        public static PLAYER_B_SCORE: number;
        public static WEAPON_TYPE: string;
        public static ASSETS: createjs.LoadQueue;
        public static ATLAS: createjs.SpriteSheet;
    }
}
