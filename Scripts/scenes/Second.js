"use strict";
var scenes;
(function (scenes) {
    class Second extends objects.Scene {
        // CONTRUCTOR
        constructor() {
            super();
            this.bulletAList = [];
            this.bulletBList = [];
            this.mineList = [];
            this.keyPressedStates = [];
            this.background = new objects.Image(util.BACKGROUND_PATH_GAME_TWO, 0, 0, util.STAGE_W, util.STAGE_H, false);
            // player A
            this.playerA = new objects.Player(util.PALYER_A_SUBMARINE, util.PLAYER_A_POS.x, util.PLAYER_A_POS.y);
            this.playerAHealthLabel = new objects.Label("Playe A: Health " + this.playerA.health, "24px", "Times", "white", 100, 25, true);
            this.playerABulletLabel = new objects.Label("Bullet " + this.playerA.bulletNum, "24px", "Times", "white", 250, 25, true);
            // player B
            this.playerB = new objects.Player(util.PALYER_B_SUBMARINE, util.PLAYER_B_POS.x, util.PLAYER_B_POS.y);
            this.playerBHealthLabel = new objects.Label("Player B: Health " + this.playerB.health, "24px", "Times", "white", 750, 25, true);
            this.playerBBulletLabel = new objects.Label("Bullet " + this.playerB.bulletNum, "24px", "Times", "white", 900, 25, true);
            // mine
            this.mineList = this.generateMines();
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this.background);
            this.addChild(this.playerA);
            this.addChild(this.playerAHealthLabel);
            this.addChild(this.playerABulletLabel);
            this.addChild(this.playerB);
            this.addChild(this.playerBHealthLabel);
            this.addChild(this.playerBBulletLabel);
            // generate mines
            for (let i = 0; i < this.mineList.length; i++) {
                this.addChild(this.mineList[i]);
            }
            this.Main();
        }
        Update() {
            // detect keys to make movement
            this.detectPressedKeys();
            // detect the bullet collision with player
            this.detectWeaponCollision(this.bulletAList, this.playerB);
            this.detectWeaponCollision(this.bulletBList, this.playerA);
            // detect mine collision with player
            this.detectMineCollision(this.mineList, this.playerA);
            this.detectMineCollision(this.mineList, this.playerB);
            // detect bullet collision with mine
            this.detectDestructablesCollision(this.mineList, this.bulletAList);
            this.detectDestructablesCollision(this.mineList, this.bulletBList);
            // detect bullet collision with each other
            this.detectDestructablesBulletCollision(this.bulletAList, this.bulletBList);
            // update health and bullet label
            this.detectPlayerHealth();
            this.detectPlayersBullet();
        }
        Main() { }
        // PRIVATE METHODS
        generateMines() {
            let mines = [];
            for (let i = 0; i < util.MINE_NUM; i++) {
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
                mines.push(new objects.Mine(util.MINE, mineX, mineY));
            }
            return mines;
        }
        detectPressedKeys() {
            if (this.keyPressedStates[38 /* UP */]) {
                this.playerB.moveUp();
            }
            else if (this.keyPressedStates[40 /* DOWN */]) {
                this.playerB.moveDown();
            }
            if (this.keyPressedStates[37 /* LEFT */]) {
                this.playerB.moveLeft();
            }
            else if (this.keyPressedStates[39 /* RIGHT */]) {
                this.playerB.moveRight();
            }
            if (this.keyPressedStates[87 /* W */]) {
                this.playerA.moveUp();
            }
            else if (this.keyPressedStates[83 /* S */]) {
                this.playerA.moveDown();
            }
            if (this.keyPressedStates[65 /* A */]) {
                this.playerA.moveLeft();
            }
            else if (this.keyPressedStates[68 /* D */]) {
                this.playerA.moveRight();
            }
        }
        detectShootingEvent() {
            // shoot key for player A
            if (this.keyPressedStates[67 /* C */]) {
                if (this.children.indexOf(this.playerA) !== -1) {
                    let aim = objects.Vector2.right();
                    let bulletA = this.playerA.shoot(util.PLAYER_A_BULLET, aim);
                    this.playerABulletLabel.setText("Bullet " + this.playerA.bulletNum);
                    if (bulletA) {
                        this.bulletAList.push(bulletA);
                        this.addChild(bulletA);
                    }
                }
            }
            // shoot key for player B
            if (this.keyPressedStates[77 /* M */]) {
                if (this.children.indexOf(this.playerB) !== -1) {
                    // aim specifies the direction of shooting
                    let aim = objects.Vector2.left();
                    let bulletB = this.playerB.shoot(util.PLAYER_B_BULLET, aim);
                    this.playerBBulletLabel.setText("Bullet " + this.playerB.bulletNum);
                    if (bulletB) {
                        this.bulletBList.push(bulletB);
                        this.addChild(bulletB);
                    }
                }
            }
        }
        detectWeaponCollision(weapon, target) {
            for (let i = 0; i < weapon.length; i++) {
                managers.Collision.AABBCheck(weapon[i], target);
                if (target.isColliding) {
                    let healthA = this.playerA.health;
                    let healthB = this.playerB.health;
                    this.removeChild(weapon[i]); // remove the bullet from the stage
                    weapon.splice(i, 1); // remove the bullet from the list
                    target.health -= 1;
                    this.playerAHealthLabel.setText("Playe A: Health " + this.playerA.health);
                    this.playerBHealthLabel.setText("Playe B: Health " + this.playerB.health);
                    // update player score;
                    if (healthA == this.playerA.health &&
                        healthB - 1 == this.playerB.health) {
                        util.GameConfig.PLAYER_A_SCORE += 10;
                    }
                    else if (healthA - 1 == this.playerA.health &&
                        healthB == this.playerB.health) {
                        util.GameConfig.PLAYER_B_SCORE += 10;
                    }
                }
                else if (weapon[i].x + weapon[i].halfWidth >= util.STAGE_W ||
                    weapon[i].x <= weapon[i].halfWidth) {
                    // simplying check the left and right border
                    this.removeChild(weapon[i]);
                    weapon.splice(i, 1); // remove the bullet from the list
                }
            }
        }
        detectMineCollision(weapon, target) {
            for (let i = 0; i < weapon.length; i++) {
                managers.Collision.AABBCheck(weapon[i], target);
                if (target.isColliding) {
                    this.removeChild(weapon[i]); // remove the bullet from the stage
                    weapon.splice(i, 1); // remove the bullet from the list
                    target.health -= 1;
                    this.playerAHealthLabel.setText("Playe A: Health " + this.playerA.health);
                    this.playerBHealthLabel.setText("Playe B: Health " + this.playerB.health);
                }
                else if (weapon[i].x + weapon[i].halfWidth >= util.STAGE_W ||
                    weapon[i].x <= weapon[i].halfWidth) {
                    // simplying check the left and right border
                    this.removeChild(weapon[i]);
                    weapon.splice(i, 1); // remove the bullet from the list
                }
            }
        }
        detectDestructablesCollision(destructableA, destructableB) {
            for (let i = 0; i < destructableA.length; i++) {
                for (let j = 0; j < destructableB.length; j++) {
                    managers.Collision.AABBCheck(destructableA[i], destructableB[j]);
                    if (destructableB[j].isColliding) {
                        let bulletNumA = this.bulletAList.length;
                        let bulletNumB = this.bulletBList.length;
                        this.removeChild(destructableA[i]); // remove the bullet from the stage
                        destructableA.splice(i, 1); // remove the bullet from the list
                        this.removeChild(destructableB[j]); // remove the bullet from the stage
                        destructableB.splice(j, 1); // remove the bullet from the list
                        // update player score;
                        if (bulletNumA == this.bulletAList.length &&
                            bulletNumB - 1 == this.bulletBList.length) {
                            util.GameConfig.PLAYER_B_SCORE += 5;
                        }
                        else if (bulletNumA - 1 == this.bulletAList.length &&
                            bulletNumB == this.bulletBList.length) {
                            util.GameConfig.PLAYER_A_SCORE += 5;
                        }
                    }
                }
            }
        }
        detectDestructablesBulletCollision(destructableA, destructableB) {
            for (let i = 0; i < destructableA.length; i++) {
                for (let j = 0; j < destructableB.length; j++) {
                    managers.Collision.AABBCheck(destructableA[i], destructableB[j]);
                    if (destructableB[j].isColliding) {
                        this.removeChild(destructableA[i]); // remove the bullet from the stage
                        destructableA.splice(i, 1); // remove the bullet from the list
                        this.removeChild(destructableB[j]); // remove the bullet from the stage
                        destructableB.splice(j, 1); // remove the bullet from the list
                    }
                }
            }
        }
        detectPlayersBullet() {
            if (this.playerA.bulletNum == 0 &&
                this.playerB.bulletNum == 0 &&
                this.bulletAList.length == 0 &&
                this.bulletBList.length == 0) {
                util.GameConfig.SCENE_STATE = scenes.State.END;
            }
        }
        detectPlayerHealth() {
            if (this.playerA.health <= 0 || this.playerB.health <= 0) {
                util.GameConfig.SCENE_STATE = scenes.State.END;
            }
        }
    }
    scenes.Second = Second;
})(scenes || (scenes = {}));
//# sourceMappingURL=Second.js.map