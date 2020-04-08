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

module managers {
    /**
     * Class for managing score board
     *
     * @export
     * @class ScoreBorad
     */
    export class ScoreBorad {
        // private instance
        // player A values
        private _livesA: number;
        private _bulletsA: number;
        private _scoreA: number;
        // player A labels
        private _livesLabelA: objects.Label;
        private _bulletLabelA: objects.Label;
        private _scoreLabelA: objects.Label;
        // player B values
        private _livesB: number;
        private _bulletsB: number;
        private _scoreB: number;
        // player B labels
        private _livesLabelB: objects.Label;
        private _bulletLabelB: objects.Label;
        private _scoreLabelB: objects.Label;

        // public properties
        // getters and setters
        public get ScoreLabelA(): objects.Label {
            return this._scoreLabelA;
        }

        public get ScoreLabelB(): objects.Label {
            return this._scoreLabelB;
        }

        public get BulletLabelA(): objects.Label {
            return this._bulletLabelA;
        }

        public get BulletLabelB(): objects.Label {
            return this._bulletLabelB;
        }

        public get LivesLabelA(): objects.Label {
            return this._livesLabelA;
        }
        public get LivesLabelB(): objects.Label {
            return this._livesLabelB;
        }

        public get ScoreA(): number {
            return this._scoreA;
        }

        public set ScoreA(v: number) {
            this._scoreA = v;
            // set global score variable
            util.GameConfig.PLAYER_A_SCORE = this._scoreA;
            // update score label text
            this.ScoreLabelA.setText("Player A Score: " + this._scoreA);
        }

        public get ScoreB(): number {
            return this._scoreB;
        }

        public set ScoreB(v: number) {
            this._scoreB = v;
            // set global score variable
            util.GameConfig.PLAYER_B_SCORE = this._scoreB;
            // update score label text
            this.ScoreLabelB.setText("Player B Score: " + this._scoreB);
        }

        public get BulletsA(): number {
            return this._bulletsA;
        }

        public set BulletsA(v: number) {
            this._bulletsA = v;
            // set global bullet number variable
            util.GameConfig.PLAYER_A_BULLETS = this._bulletsA;
            // update bullet label text
            this.BulletLabelA.setText("| Bullet: " + this.BulletsA);
        }

        public get BulletsB(): number {
            return this._bulletsB;
        }

        public set BulletsB(v: number) {
            this._bulletsB = v;
            // set global bullet number variable
            util.GameConfig.PLAYER_B_BULLETS = this._bulletsB;
            // update bullet label text
            this.BulletLabelB.setText("| Bullet: " + this.BulletsB);
        }

        public get LivesA(): number {
            return this._livesA;
        }

        public set LivesA(v: number) {
            this._livesA = v;
            // set global lives variable
            util.GameConfig.PLAYER_A_LIVES = this._livesA;
            // update health label text
            this.LivesLabelA.setText("Player A Health: " + this._livesA);
        }

        public get LivesB(): number {
            return this._livesB;
        }

        public set LivesB(v: number) {
            this._livesB = v;
            // set global lives variable
            util.GameConfig.PLAYER_B_LIVES = this._livesB;
            // update health label text
            this.LivesLabelB.setText("Player B Health: " + this._livesB);
        }

        /**
         * Creates an instance of ScoreBorad.
         * @memberof ScoreBorad
         */
        constructor() {
            // setup the labels
            this._livesLabelA = new objects.Label(
                "Player A Health: 99",
                "20px",
                util.FONT_FAMILY,
                "white",
                25,
                25,
                false
            );
            this._bulletLabelA = new objects.Label(
                "Bullet 999",
                "20px",
                util.FONT_FAMILY,
                "white",
                233,
                25,
                false
            );
            this._livesLabelB = new objects.Label(
                "Player B Health: 99",
                "20px",
                util.FONT_FAMILY,
                "white",
                598,
                25,
                false
            );
            this._bulletLabelB = new objects.Label(
                "Bullet 999",
                "20px",
                util.FONT_FAMILY,
                "white",
                805,
                25,
                false
            );
            this._scoreLabelA = new objects.Label(
                "Player A Score: 999",
                "24px",
                util.FONT_FAMILY,
                "white",
                330,
                200,
                true
            );
            this._scoreLabelB = new objects.Label(
                "Player B Score: 999",
                "24px",
                util.FONT_FAMILY,
                "white",
                630,
                200,
                true
            );

            // initial values
            this._livesA = 0;
            this._livesB = 0;
            this._bulletsA = 0;
            this._bulletsB = 0;
            this._scoreA = 0;
            this._scoreB = 0;

            // assign values
            this.LivesA = util.GameConfig.PLAYER_A_LIVES;
            this.LivesB = util.GameConfig.PLAYER_B_LIVES;
            this.BulletsA = util.GameConfig.PLAYER_A_BULLETS;
            this.BulletsB = util.GameConfig.PLAYER_B_BULLETS;
            this.ScoreA = util.GameConfig.PLAYER_A_SCORE;
            this.ScoreB = util.GameConfig.PLAYER_B_SCORE;
        }
    }
}
