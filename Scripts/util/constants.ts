module util {
    // image assets
    export const BACKGROUND_PATH: string = './Assets/images/first-screen.png';
    export const BACKGROUND_PATH_GAME: string = './Assets/images/game-screen.png';
    export const BACKGROUND_PATH_END: string = './Assets/images/final-screen.png';

    // Player image assets
    export const PALYER_A_SUBMARINE: string = './Assets/images/submarineA.png';
    export const PALYER_B_SUBMARINE: string = './Assets/images/submarineB.png';

    // player bullet image assets
    export const PLAYER_A_BULLET: string = './Assets/images/MilitaryRocketA.png';
    export const PLAYER_B_BULLET: string = './Assets/images/MilitaryRocketB.png';

    // Image Reference: https://pngimage.net/game-play-button-png-2/
    export const PLAY_BUTTON: string = './Assets/images/play-btn.png';
    export const RESTART_BUTTON: string = './Assets/images/play-btn.png';

    // 
    export const STAGE_W: number = 960;
    export const STAGE_H: number = 640;

    export const PLAYER_A_POS: objects.Vector2 = new objects.Vector2(50, 75);
    export const PLAYER_B_POS: objects.Vector2 = new objects.Vector2(900, 500);

}