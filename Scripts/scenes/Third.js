"use strict";
var scenes;
(function (scenes) {
    class Third extends objects.Scene {
        // CONTRUCTOR
        constructor() {
            super();
            this.bulletAList = [];
            this.bulletBList = [];
            this.mineList = [];
            this.keyPressedStates = [];
            this.background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
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
            // squid
            this.squid = new objects.Squid(util.PLAYER_A_BULLET, 100, 100);
            // selectedd weapon type
            //this.playerA.weaponType = "3way";
            //this.playerB.weaponType = "3way";
            this.playerA.weaponType = util.GameConfig.WEAPON_TYPE;
            this.playerB.weaponType = util.GameConfig.WEAPON_TYPE;
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this.background);
            this.addChild(this.baseA);
            this.addChild(this.baseB);
            this.addChild(this.playerA);
            this.addChild(this.scoreBorad.LivesLabelA);
            this.addChild(this.scoreBorad.BulletLabelA);
            this.addChild(this.playerB);
            this.addChild(this.scoreBorad.LivesLabelB);
            this.addChild(this.scoreBorad.BulletLabelB);
            // generate mines
            for (let i = 0; i < this.mineList.length; i++) {
                this.addChild(this.mineList[i]);
            }
            this.addChild(this.squid);
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
            // detect the base collision
            this.detectBaseCollision(this.baseA, this.playerA);
            this.detectBaseCollision(this.baseB, this.playerB);
            // detect bullet collision with mine
            this.detectDestructablesCollision(this.mineList, this.bulletAList);
            this.detectDestructablesCollision(this.mineList, this.bulletBList);
            // detect bullet collision with each other
            this.detectDestructablesBulletCollision(this.bulletAList, this.bulletBList);
            //
            this.detectSquidAndBulletCollision(this.bulletAList, this.squid);
            this.detectSquidAndBulletCollision(this.bulletBList, this.squid);
            this.detectSquidPlayerCollision(this.squid, this.playerA, this.playerB);
            //
            //      detectPlayersCollision();
            // update health and bullet label
            this.detectPlayerHealth();
            //      this.detectPlayersBullet();
        }
        Main() { }
        // PRIVATE METHODS
        generateMines() {
            let mines = [];
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
                    let bulletsA = this.playerA.shoot(util.GameConfig.ATLAS, "missileA", aim);
                    this.scoreBorad.BulletsA = this.playerA.bulletNum;
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
                    if (bulletsB) {
                        bulletsB.forEach(b => {
                            this.bulletBList.push(b);
                            this.addChild(b);
                        });
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
                    switch (target.name) {
                        case "PlayerA":
                            {
                                this.scoreBorad.LivesA = this.playerA.health;
                                this.scoreBorad.ScoreB += 10;
                                let explosion = new objects.Explosion(this.playerA.x + this.playerA.halfWidth, this.playerA.y);
                                this.addChild(explosion);
                            }
                            break;
                        case "PlayerB":
                            {
                                this.scoreBorad.LivesB = this.playerB.health;
                                this.scoreBorad.ScoreA += 10;
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
                    weapon.splice(i, 1); // remove the bullet from the list
                }
            }
        }
        detectMineCollision(weapon, target) {
            for (let i = 0; i < weapon.length; i++) {
                managers.Collision.AABBCheck(weapon[i], target);
                if (target.isColliding) {
                    let explosion = new objects.Explosion(weapon[i].x, weapon[i].y);
                    this.addChild(explosion);
                    this.removeChild(weapon[i]); // remove the bullet from the stage
                    weapon.splice(i, 1); // remove the bullet from the list
                    target.health -= 1;
                    this.scoreBorad.LivesA = this.playerA.health;
                    this.scoreBorad.LivesB = this.playerB.health;
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
                        let explosion = new objects.Explosion(destructableA[i].x, destructableA[i].y);
                        this.addChild(explosion);
                        this.removeChild(destructableA[i]); // remove the bullet from the stage
                        destructableA.splice(i, 1); // remove the bullet from the list
                        this.removeChild(destructableB[j]); // remove the bullet from the stage
                        destructableB.splice(j, 1); // remove the bullet from the list
                        // update player score;
                        if (bulletNumA == this.bulletAList.length &&
                            bulletNumB - 1 == this.bulletBList.length) {
                            this.scoreBorad.ScoreB += 5;
                        }
                        else if (bulletNumA - 1 == this.bulletAList.length &&
                            bulletNumB == this.bulletBList.length) {
                            this.scoreBorad.ScoreA += 5;
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
        detectPlayersCollision(playerA, playerB) {
            managers.Collision.AABBCheck(playerA, playerB);
            managers.Collision.AABBCheck(playerB, playerA);
            if (playerA.isColliding && playerB.isColliding) {
                playerA.health -= 1;
                playerB.health -= 1;
                this.scoreBorad.LivesA = this.playerA.health;
                this.scoreBorad.LivesB = this.playerB.health;
                // TODO:
                // implement knock back time:
                // Player's heath goes down to 0 because of collision detection in 60fps
                // need the logic to prevent detection for a while after collision
            }
        }
        detectSquidAndBulletCollision(bullets, target) {
            for (let i = 0; i < bullets.length; i++) {
                managers.Collision.AABBCheck(bullets[i], target);
                if (target.isColliding) {
                    // update player health
                    target.health -= 1;
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
                        target.Reset();
                    }
                    this.removeChild(bullets[i]); // remove the bullet from the stage
                    bullets.splice(i, 1); // remove the bullet from the list
                }
            }
        }
        detectSquidPlayerCollision(squid, playerA, playerB) {
            managers.Collision.AABBCheck(playerB, squid);
            if (squid.isColliding) {
                squid.scaleX = squid.scaleX > 0 ? 1.1 : -1.1;
                squid.scaleY = squid.scaleY > 0 ? 1.1 : -1.1;
            }
            else {
                managers.Collision.AABBCheck(playerA, squid);
                if (squid.isColliding) {
                    squid.scaleX = squid.scaleX > 0 ? 1.1 : -1.1;
                    squid.scaleY = squid.scaleY > 0 ? 1.1 : -1.1;
                }
                else {
                    squid.scaleX = squid.scaleX > 0 ? 1 : -1;
                    squid.scaleY = squid.scaleY > 0 ? 1 : -1;
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
        detectBaseCollision(base, target) {
            managers.Collision.AABBCheck(base, target);
            if (target.isColliding) {
                switch (target.name) {
                    case "PlayerA":
                        {
                            this.playerA.bulletNum = 10;
                            this.scoreBorad.BulletsA = this.playerA.bulletNum;
                        }
                        break;
                    case "PlayerB":
                        {
                            this.playerB.bulletNum = 10;
                            this.scoreBorad.BulletsB = this.playerB.bulletNum;
                        }
                        break;
                }
            }
        }
    }
    scenes.Third = Third;
})(scenes || (scenes = {}));
//# sourceMappingURL=Third.js.map