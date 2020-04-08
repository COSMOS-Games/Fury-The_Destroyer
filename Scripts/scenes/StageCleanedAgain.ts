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
     * Class for Second Stage Cleared scene
     *
     * @export
     * @class StageCleanedAgain
     * @extends {objects.Scene}
     */
    export class StageCleanedAgain extends objects.Scene {
        // PRIVATE INSTANCE MEMEBERS
        // background
        private _background: objects.Image;
        // label images
        private _nextBattleLabel: objects.Image;
        private _descriptionLabel: objects.Label;
        // button images
        private _nextButton: objects.Image;
        private _nextButtonUpgradeWeapon: objects.Image;
        // scoreboaard
        private _scoreBoard: managers.ScoreBorad;

        // CONTRUCTOR
        /**
         * Creates an instance of StageCleanedAgain.
         * @memberof StageCleanedAgain
         */
        constructor() {
            super();

            // initialization
            // background
            this._background = new objects.Image(
                util.BACKGROUND_PATH_GAME,
                0,
                0,
                util.STAGE_W,
                util.STAGE_H,
                false
            );
            // buttons
            this._nextButton = new objects.Image(
                util.NEXT_BUTTON,
                380,
                530,
                150,
                50,
                true
            );
            this._nextButtonUpgradeWeapon = new objects.Image(
                util.NEXT_BUTTON_UPGRADE,
                580,
                530,
                150,
                50,
                true
            );
            //labels
            this._nextBattleLabel = new objects.Image(
                util.NEXT_BATTLE_PATH,
                480,
                100,
                500,
                150,
                true
            );
            let description =
                "In next level, more randomly generated MINEs in map!  \n\nBe careful!  \n\n" +
                "In addition, you can choose to upgrade the advanced weapon   \n\nIt can shoot 3 bullets at one time!";
            this._descriptionLabel = new objects.Label(
                description,
                util.FONT_SIZE,
                util.FONT_FAMILY,
                util.FONT_COLOR,
                50,
                250,
                false
            );
            // score board
            this._scoreBoard = new managers.ScoreBorad();

            this.Start();
        }

        // PUBLIC METHODS
        /**
         * Start method of Stage Cleaned Again scene
         *
         * @memberof StageCleanedAgain
         */
        public Start(): void {
            // add children to the stage
            this.addChild(this._background);
            this.addChild(this._nextBattleLabel);
            this.addChild(this._scoreBoard.ScoreLabelA);
            this.addChild(this._scoreBoard.ScoreLabelB);
            this.addChild(this._descriptionLabel);
            this.addChild(this._nextButton);
            this.addChild(this._nextButtonUpgradeWeapon);

            this.Main();
        }

        /**
         * Update method of Stage Cleaned Again scene
         *
         * @memberof StageCleanedAgain
         */
        public Update(): void { }

        /**
         * Main method of Stage Cleaned Again scene
         *
         * @memberof StageCleanedAgain
         */
        public Main(): void {
            // enable hover effect on buttons
            this._nextButton.HoverOn();
            this._nextButtonUpgradeWeapon.HoverOn();

            // set on click event on buttons and direct players to the third stage
            this._nextButton.on("click", function () {
                // set weapon to normal
                util.GameConfig.WEAPON_TYPE = "normal";
                util.GameConfig.SCENE_STATE = scenes.State.THIRD;
            });

            this._nextButtonUpgradeWeapon.on("click", function () {
                // set weapon to 3way
                util.GameConfig.WEAPON_TYPE = "3way";
                util.GameConfig.SCENE_STATE = scenes.State.THIRD;
            });
        }
    }
}
