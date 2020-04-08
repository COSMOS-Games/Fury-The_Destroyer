"use strict";
var managers;
(function (managers) {
    class ScoreBorad {
        /**
         * Creates an instance of ScoreBorad.
         * @memberof ScoreBorad
         */
        constructor() {
            // setup the labels
            this._livesLabelA = new objects.Label("Player A Health: 99", "20px", util.FONT_FAMILY, "white", 25, 25, false);
            this._bulletLabelA = new objects.Label("Bullet 999", "20px", util.FONT_FAMILY, "white", 233, 25, false);
            this._livesLabelB = new objects.Label("Player B Health: 99", "20px", util.FONT_FAMILY, "white", 598, 25, false);
            this._bulletLabelB = new objects.Label("Bullet 999", "20px", util.FONT_FAMILY, "white", 805, 25, false);
            this._scoreLabelA = new objects.Label("Player A Score: 999", "24px", util.FONT_FAMILY, "white", 330, 200, true);
            this._scoreLabelB = new objects.Label("Player B Score: 999", "24px", util.FONT_FAMILY, "white", 630, 200, true);
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
        // public properties
        // getters and setters
        get ScoreLabelA() {
            return this._scoreLabelA;
        }
        get ScoreLabelB() {
            return this._scoreLabelB;
        }
        get BulletLabelA() {
            return this._bulletLabelA;
        }
        get BulletLabelB() {
            return this._bulletLabelB;
        }
        get LivesLabelA() {
            return this._livesLabelA;
        }
        get LivesLabelB() {
            return this._livesLabelB;
        }
        get ScoreA() {
            return this._scoreA;
        }
        set ScoreA(v) {
            this._scoreA = v;
            // set global score variable
            util.GameConfig.PLAYER_A_SCORE = this._scoreA;
            // update score label text
            this.ScoreLabelA.setText("Player A Score: " + this._scoreA);
        }
        get ScoreB() {
            return this._scoreB;
        }
        set ScoreB(v) {
            this._scoreB = v;
            // set global score variable
            util.GameConfig.PLAYER_B_SCORE = this._scoreB;
            // update score label text
            this.ScoreLabelB.setText("Player B Score: " + this._scoreB);
        }
        get BulletsA() {
            return this._bulletsA;
        }
        set BulletsA(v) {
            this._bulletsA = v;
            // set global bullet number variable
            util.GameConfig.PLAYER_A_BULLETS = this._bulletsA;
            // update bullet label text
            this.BulletLabelA.setText("| Bullet: " + this.BulletsA);
        }
        get BulletsB() {
            return this._bulletsB;
        }
        set BulletsB(v) {
            this._bulletsB = v;
            // set global bullet number variable
            util.GameConfig.PLAYER_B_BULLETS = this._bulletsB;
            // update bullet label text
            this.BulletLabelB.setText("| Bullet: " + this.BulletsB);
        }
        get LivesA() {
            return this._livesA;
        }
        set LivesA(v) {
            this._livesA = v;
            // set global lives variable
            util.GameConfig.PLAYER_A_LIVES = this._livesA;
            // update health label text
            this.LivesLabelA.setText("Player A Health: " + this._livesA);
        }
        get LivesB() {
            return this._livesB;
        }
        set LivesB(v) {
            this._livesB = v;
            // set global lives variable
            util.GameConfig.PLAYER_B_LIVES = this._livesB;
            // update health label text
            this.LivesLabelB.setText("Player B Health: " + this._livesB);
        }
    }
    managers.ScoreBorad = ScoreBorad;
})(managers || (managers = {}));
//# sourceMappingURL=ScoreBorad.js.map