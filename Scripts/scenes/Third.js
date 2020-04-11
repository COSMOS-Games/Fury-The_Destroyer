"use strict";
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
var scenes;
(function (scenes) {
    /**
     * Class for Third stage scene
     *
     * @export
     * @class Third
     * @extends {objects.Scene}
     */
    class Third extends objects.Scene {
        // CONTRUCTOR
        /**
         * Creates an instance of Third.
         * @memberof Third
         */
        constructor() {
            super();
            this.bulletAList = [];
            this.bulletBList = [];
            this.mineList = [];
            // status
            this.isChangedA = false;
            this.isChangedB = false;
            // initialization
            // background
            this.background = new objects.Image(util.BACKGROUND_PATH_GAME3, 0, 0, util.STAGE_W, util.STAGE_H, false);
            // bases
            this.baseA = new objects.Image(util.BASE_A_PATH, 55, 90, 100, 100, true);
            this.baseB = new objects.Image(util.BASE_B_PATH, 900, 580, 100, 100, true);
            // player A
            this.playerA = new objects.Player(util.GameConfig.ATLAS, "submarineA", util.PLAYER_A_POS.x, util.PLAYER_A_POS.y, "PlayerA");
            util.GameConfig.PLAYER_A_LIVES = this.playerA.health;
            util.GameConfig.PLAYER_A_BULLETS = this.playerA.bulletNum;
            // player B
            this.playerB = new objects.Player(util.GameConfig.ATLAS, "submarineB", util.PLAYER_B_POS.x, util.PLAYER_B_POS.y, "PlayerB");
            util.GameConfig.PLAYER_B_LIVES = this.playerB.health;
            util.GameConfig.PLAYER_B_BULLETS = this.playerB.bulletNum;
            // scoreboard
            this.scoreBorad = new managers.ScoreBorad();
            // mine
            this.mineList = this.generateMines();
            // jellyfish
            this.jellyfish = new objects.Jellyfish(util.ENEMY, 100, 100);
            // fish
            this._fish = new objects.Fish("./Assets/images/fish.png", 0, 0);
            // key pressed state
            this.keyPressedStates = [];
            // selectedd weapon type
            this.playerA.weaponType = util.GameConfig.WEAPON_TYPE;
            this.playerB.weaponType = util.GameConfig.WEAPON_TYPE;
            this.Start();
        }
        // PUBLIC METHODS
        /**
         * Start method of Third scene
         *
         * @memberof Third
         */
        Start() {
            // add children to the stage
            this.addChild(this.background);
            this.addChild(this.baseA);
            this.addChild(this.baseB);
            this.addChild(this.playerA);
            this.addChild(this.scoreBorad.LivesLabelA);
            this.addChild(this.scoreBorad.BulletLabelA);
            this.addChild(this.playerB);
            this.addChild(this.scoreBorad.LivesLabelB);
            this.addChild(this.scoreBorad.BulletLabelB);
            this.addChild(this.jellyfish);
            // change starting position
            this._fish.position.x = util.STAGE_W / 2;
            this._fish.position.x = util.Mathf.RandomRange(util.STAGE_W / 4, util.STAGE_W - this._fish.width);
            this.addChild(this._fish);
            // generate mines
            for (let i = 0; i < this.mineList.length; i++) {
                this.addChild(this.mineList[i]);
            }
            this.Main();
        }
        /**
         * Update method of Third stage
         *
         * @memberof Third
         */
        Update() {
            this._fish.Update();
            // detect keys to make movement
            this.detectPressedKeys();
            // detect the bullet collision with player
            this.detectWeaponCollision(this.bulletAList, this.playerB);
            this.detectWeaponCollision(this.bulletBList, this.playerA);
            // detect mine collision with player
            this.detectMineCollision(this.mineList, this.playerA);
            this.detectMineCollision(this.mineList, this.playerB);
            // detect the base collision
            this.detectBaseCollision(this.baseA, this.playerA);
            this.detectBaseCollision(this.baseB, this.playerB);
            // detect bullet collision with mine
            this.detectDestructablesCollision(this.mineList, this.bulletAList);
            this.detectDestructablesCollision(this.mineList, this.bulletBList);
            // detect bullet collision with each other
            this.detectDestructablesBulletCollision(this.bulletAList, this.bulletBList);
            // detect bullet collision with jellyfish from player A
            this.detectJellyfishAndBulletCollision(this.bulletAList, this.jellyfish);
            // detect bullet collision with jellyfish from player B
            this.detectJellyfishAndBulletCollision(this.bulletBList, this.jellyfish);
            // detect bullet collision with jellyfish from player A
            this.detectFishAndBulletCollision(this.bulletAList, this._fish);
            // detect bullet collision with jellyfish from player B
            this.detectFishAndBulletCollision(this.bulletBList, this._fish);
            // detect mine collision with player
            this.detectFishCollision(this._fish, this.playerA);
            this.detectFishCollision(this._fish, this.playerB);
            // update health and bullet label
            this.detectPlayerHealth();
        }
        /**
         * Main method of Third scene
         *
         * @memberof Third
         */
        Main() { }
        // PRIVATE METHODS
        /**
         * Method for generating mines
         *
         * @returns {objects.Mine[]}
         * @memberof Third
         */
        generateMines() {
            // local variable
            let mines = [];
            // create mines repeatly
            for (let i = 0; i < util.MINE_NUM + 20; i++) {
                // generate position at random
                let mineX = Math.floor(Math.random() * util.STAGE_W);
                let mineY = Math.floor(Math.random() * util.STAGE_H + util.STAGE_BOUNDARY_TOP);
                // hard corded safe area
                if (mineX < util.PLAYER_A_POS.x + 100) {
                    // determine Y so that the mine won't hit the player A
                    mineY = Math.floor(Math.random() * util.STAGE_H + 250 + util.STAGE_BOUNDARY_TOP);
                }
                else {
                    mineY = Math.floor(Math.random() * util.STAGE_H + util.STAGE_BOUNDARY_TOP);
                    if (mineY > util.STAGE_H - 200) {
                        // determine X so that the mine won't hit the player A
                        mineX = Math.floor(Math.random() * util.STAGE_W - mineX);
                    }
                }
                mines.push(new objects.Mine(util.GameConfig.ATLAS, "mine", mineX, mineY));
            }
            return mines;
        }
        /**
         * Method for detecting which key is pressed
         *
         * @memberof Third
         */
        detectPressedKeys() {
            // move either up (Up) or down (DOWN)
            if (this.keyPressedStates[38 /* UP */]) {
                this.playerB.moveUp();
            }
            else if (this.keyPressedStates[40 /* DOWN */]) {
                this.playerB.moveDown();
            }
            // move either left (LEFT) or right (RIGHT)
            if (this.keyPressedStates[37 /* LEFT */]) {
                this.playerB.moveLeft();
            }
            else if (this.keyPressedStates[39 /* RIGHT */]) {
                this.playerB.moveRight();
            }
            // move either up (W) or down (S)
            if (this.keyPressedStates[87 /* W */]) {
                this.playerA.moveUp();
            }
            else if (this.keyPressedStates[83 /* S */]) {
                this.playerA.moveDown();
            }
            // move either left (A) or right (D)
            if (this.keyPressedStates[65 /* A */]) {
                this.playerA.moveLeft();
            }
            else if (this.keyPressedStates[68 /* D */]) {
                this.playerA.moveRight();
            }
        }
        /**
         * Method for detecting shooting event
         *
         * @memberof Third
         */
        detectShootingEvent() {
            // shoot key for player A
            if (this.keyPressedStates[67 /* C */]) {
                if (this.children.indexOf(this.playerA) !== -1) {
                    // aim specifies the direction of shooting
                    let aim = objects.Vector2.right();
                    let bulletsA = this.playerA.shoot(util.GameConfig.ATLAS, "missileA", aim);
                    this.scoreBorad.BulletsA = this.playerA.bulletNum;
                    // push all bullets in bulletsA and add to the scene
                    if (bulletsA) {
                        bulletsA.forEach(b => {
                            this.bulletAList.push(b);
                            this.addChild(b);
                        });
                    }
                }
            }
            // shoot key for player B
            if (this.keyPressedStates[77 /* M */]) {
                if (this.children.indexOf(this.playerB) !== -1) {
                    // aim specifies the direction of shooting
                    let aim = objects.Vector2.left();
                    let bulletsB = this.playerB.shoot(util.GameConfig.ATLAS, "missileB", aim);
                    this.scoreBorad.BulletsB = this.playerB.bulletNum;
                    // push all bullets in bulletsB and add to the scene
                    if (bulletsB) {
                        bulletsB.forEach(b => {
                            this.bulletBList.push(b);
                            this.addChild(b);
                        });
                    }
                }
            }
        }
        /**
         * Method for detecting collision between bullet and player
         *
         * @param {objects.Bullet[]} weapon
         * @param {objects.Player} target
         * @memberof Third
         */
        detectWeaponCollision(weapon, target) {
            // for all bullets
            for (let i = 0; i < weapon.length; i++) {
                // check AABB detection
                managers.Collision.AABBCheck(weapon[i], target);
                // if they is a collision
                if (target.isColliding) {
                    // remove the bullet from the stage
                    this.removeChild(weapon[i]);
                    // remove the bullet from the list
                    weapon.splice(i, 1);
                    // update player health
                    if (!target.isVulnerable) {
                        target.health -= 1;
                        // player is in vulnerable mode
                        target.isVulnerable = true;
                    }
                    // based on which player it is
                    switch (target.name) {
                        case "PlayerA":
                            {
                                // update scoreboard
                                this.scoreBorad.LivesA = this.playerA.health;
                                this.scoreBorad.ScoreB += 100;
                                // display explosion effect
                                let explosion = new objects.Explosion(this.playerA.x + this.playerA.halfWidth, this.playerA.y);
                                this.addChild(explosion);
                            }
                            break;
                        case "PlayerB":
                            {
                                // update scoreboard
                                this.scoreBorad.LivesB = this.playerB.health;
                                this.scoreBorad.ScoreA += 100;
                                // display explosion effect
                                let explosion = new objects.Explosion(this.playerB.x - this.playerB.halfWidth, this.playerB.y);
                                this.addChild(explosion);
                            }
                            break;
                    }
                }
                else if (weapon[i].x + weapon[i].halfWidth >= util.STAGE_W ||
                    weapon[i].x <= weapon[i].halfWidth) {
                    // simplying check the left and right border
                    this.removeChild(weapon[i]);
                    // remove the bullet from the list
                    weapon.splice(i, 1);
                }
            }
        }
        /**
         * Method to detect collision betwen mine and player
         *
         * @param {objects.Mine[]} weapon
         * @param {objects.Player} target
         * @memberof Third
         */
        detectMineCollision(weapon, target) {
            // for all mines
            for (let i = 0; i < weapon.length; i++) {
                // check AABB detectiion
                managers.Collision.AABBCheck(weapon[i], target);
                // if there is a collision
                if (target.isColliding) {
                    // display explosion effect
                    let explosion = new objects.Explosion(weapon[i].x, weapon[i].y);
                    this.addChild(explosion);
                    this.removeChild(weapon[i]); // remove the bullet from the stage
                    weapon.splice(i, 1); // remove the bullet from the list
                    // update player health
                    if (!target.isVulnerable) {
                        target.health -= 1;
                        // player is in vulnerable mode
                        target.isVulnerable = true;
                    }
                    this.scoreBorad.LivesA = this.playerA.health;
                    this.scoreBorad.LivesB = this.playerB.health;
                }
                else if (weapon[i].x + weapon[i].halfWidth >= util.STAGE_W ||
                    weapon[i].x <= weapon[i].halfWidth) {
                    // simplying check the left and right border
                    this.removeChild(weapon[i]);
                    // remove the bullet from the list
                    weapon.splice(i, 1);
                }
            }
        }
        /**
 * Method to detect collision betwen mine and player
 *
 * @param {objects.Fish} fish
 * @param {objects.Player} target
 * @memberof Third
 */
        detectFishCollision(fish, target) {
            // for all mines
            // check AABB detectiion
            managers.Collision.AABBCheck(fish, target);
            // if there is a collision
            if (target.isColliding) {
                // display explosion effect
                let explosion = new objects.Explosion(fish.x, fish.y);
                this.addChild(explosion);
                fish.Reset();
                // update player health
                if (!target.isVulnerable) {
                    target.health -= 1;
                    // player is in vulnerable mode
                    target.isVulnerable = true;
                }
                this.scoreBorad.LivesA = this.playerA.health;
                this.scoreBorad.LivesB = this.playerB.health;
            }
        }
        /**
         * Method for detecting collision between bullet and mine
         *
         * @param {(objects.Bullet[] | objects.Mine[])} destructableA
         * @param {(objects.Bullet[] | objects.Mine[])} destructableB
         * @memberof Third
         */
        detectDestructablesCollision(destructableA, destructableB) {
            // for all destructables A
            for (let i = 0; i < destructableA.length; i++) {
                // for all destructables B
                for (let j = 0; j < destructableB.length; j++) {
                    // check AABB detection
                    managers.Collision.AABBCheck(destructableA[i], destructableB[j]);
                    // if there is a collision
                    if (destructableB[j].isColliding) {
                        // display explosion effect
                        let explosion = new objects.Explosion(destructableA[i].x, destructableA[i].y);
                        this.addChild(explosion);
                        let bulletNumA = this.bulletAList.length;
                        let bulletNumB = this.bulletBList.length;
                        this.removeChild(destructableA[i]); // remove the bullet from the stage
                        destructableA.splice(i, 1); // remove the bullet from the list
                        this.removeChild(destructableB[j]); // remove the bullet from the stage
                        destructableB.splice(j, 1); // remove the bullet from the list
                        // update player score;
                        if (bulletNumA == this.bulletAList.length &&
                            bulletNumB - 1 == this.bulletBList.length) {
                            this.scoreBorad.ScoreB += 30;
                        }
                        else if (bulletNumA - 1 == this.bulletAList.length &&
                            bulletNumB == this.bulletBList.length) {
                            this.scoreBorad.ScoreA += 30;
                        }
                    }
                }
            }
        }
        /**
         * Method for detecting collision between bullets
         *
         * @param {objects.Bullet[]} destructableA
         * @param {objects.Bullet[]} destructableB
         * @memberof Third
         */
        detectDestructablesBulletCollision(destructableA, destructableB) {
            // for all bullet A
            for (let i = 0; i < destructableA.length; i++) {
                // for all bullet B
                for (let j = 0; j < destructableB.length; j++) {
                    // check AABB collision
                    managers.Collision.AABBCheck(destructableA[i], destructableB[j]);
                    // if there is a collision
                    if (destructableB[j].isColliding) {
                        // call explotion animation
                        let explosion = new objects.Explosion(destructableA[i].x + destructableA[i].halfWidth, destructableA[i].y);
                        this.addChild(explosion);
                        this.removeChild(destructableA[i]); // remove the bullet from the stage
                        destructableA.splice(i, 1); // remove the bullet from the list
                        this.removeChild(destructableB[j]); // remove the bullet from the stage
                        destructableB.splice(j, 1); // remove the bullet from the list
                    }
                }
            }
        }
        /**
         * Method for detecting collision between bullet and jellyfish
         *
         * @param {objects.Bullet[]} bullets
         * @param {objects.Jellyfish} target
         * @memberof Third
         */
        detectJellyfishAndBulletCollision(bullets, target) {
            // for all bullets
            for (let i = 0; i < bullets.length; i++) {
                // check AABB collision
                managers.Collision.AABBCheck(bullets[i], target);
                // check if there is a collision
                if (target.isColliding) {
                    // update player health
                    target.health -= 1;
                    // explosion
                    let diff = bullets[i].owner == "PlayerA" ? -50 : 50;
                    let explosion = new objects.Explosion(this.jellyfish.x + diff, this.jellyfish.y);
                    this.addChild(explosion);
                    // if jellyfish dies, update score
                    if (target.health <= 0) {
                        switch (bullets[i].owner) {
                            case "PlayerA":
                                {
                                    this.scoreBorad.ScoreA += 500;
                                }
                                break;
                            case "PlayerB":
                                {
                                    this.scoreBorad.ScoreB += 500;
                                }
                                break;
                        }
                        // reset jellyfish
                        target.Reset();
                    }
                    this.removeChild(bullets[i]); // remove the bullet from the stage
                    bullets.splice(i, 1); // remove the bullet from the list
                }
            }
        }
        /**
         * Method for detecting players' health
         *
         * @memberof Third
         */
        detectPlayerHealth() {
            // if player A is not damaged yet
            if (!this.isChangedA) {
                // once player A is damaged
                if (this.playerA.health == 1) {
                    // change status to damaged
                    this.isChangedA = true;
                    // change animation
                    this.playerA.ChangeAnimation("submarineA", "submarineA2");
                }
            }
            // if player B is not damaged yet
            if (!this.isChangedB) {
                // once player B is damaged
                if (this.playerB.health == 1) {
                    // change status to damaged
                    this.isChangedB = true;
                    // change animation
                    this.playerB.ChangeAnimation("submarineB", "submarineB2");
                }
            }
            // either player dies
            if (this.playerA.health <= 0 || this.playerB.health <= 0) {
                // reset damaged status 
                this.isChangedA = false;
                this.isChangedB = false;
                // move to the next scene
                util.GameConfig.SCENE_STATE = scenes.State.END;
            }
        }
        /**
       * Method for detecting collision between players and their own bases
       *
       * @param {objects.Image} base
       * @param {objects.Player} target
       * @memberof Third
       */
        detectBaseCollision(base, target) {
            // check AABB collision
            managers.Collision.AABBCheck(base, target);
            if (target.isColliding) {
                switch (target.name) {
                    case "PlayerA":
                        {
                            // recharge bullets
                            this.playerA.bulletNum = 10;
                            this.scoreBorad.BulletsA = this.playerA.bulletNum;
                        }
                        break;
                    case "PlayerB":
                        {
                            // recharge bullets
                            this.playerB.bulletNum = 10;
                            this.scoreBorad.BulletsB = this.playerB.bulletNum;
                        }
                        break;
                }
            }
        }
        /**
* Method for detecting collision between Fish and bullet
*
* @param {objects.Bullet[]} bullets
* @param {objects.Fish} target
* @memberof ShootInstruction
*/
        detectFishAndBulletCollision(bullets, target) {
            // for all bullets
            for (let i = 0; i < bullets.length; i++) {
                // check AABB detection
                managers.Collision.AABBCheck(bullets[i], target);
                // if there is a collision
                if (target.isColliding) {
                    // explosion
                    let explosion = new objects.Explosion(target.x, target.y);
                    this.addChild(explosion);
                    // // update player health
                    // target.health -= 1;
                    // target.Reset();
                    // // once jellyfish's health goes to 0
                    // if (target.health <= 0) {
                    //     this.removeChild(target);
                    // }
                    // if jellyfish dies, update score
                    switch (bullets[i].owner) {
                        case "PlayerA":
                            {
                                this.scoreBorad.ScoreA += 150;
                            }
                            break;
                        case "PlayerB":
                            {
                                this.scoreBorad.ScoreB += 150;
                            }
                            break;
                    }
                    // reset jellyfish
                    target.Reset();
                    // remove the bullet from the stage
                    this.removeChild(bullets[i]);
                    // remove the bullet from the list
                    bullets.splice(i, 1);
                }
            }
        }
    }
    scenes.Third = Third;
})(scenes || (scenes = {}));
//# sourceMappingURL=Third.js.map