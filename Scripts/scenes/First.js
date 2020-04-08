"use strict";
var scenes;
(function (scenes) {
    class First extends objects.Scene {
        // CONTRUCTOR
        constructor() {
            super();
            this.bulletAList = [];
            this.bulletBList = [];
            this.keyPressedStates = [];
            this.background = new objects.Image(util.BACKGROUND_PATH_GAME, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this.baseA = new objects.Image(util.BASE_A_PATH, 55, 90, 100, 100, true);
            this.baseB = new objects.Image(util.BASE_B_PATH, 900, 580, 100, 100, true);
            // player A
            this.playerA = new objects.Player(util.GameConfig.ATLAS, "submarineA", util.PLAYER_A_POS.x, util.PLAYER_A_POS.y, "PlayerA");
            util.GameConfig.PLAYER_A_LIVES = this.playerA.health;
            util.GameConfig.PLAYER_A_BULLETS = this.playerA.bulletNum;
            util.GameConfig.PLAYER_A_SCORE = 0;
            // player B
            this.playerB = new objects.Player(util.GameConfig.ATLAS, "submarineB", util.PLAYER_B_POS.x, util.PLAYER_B_POS.y, "PlayerB");
            util.GameConfig.PLAYER_B_LIVES = this.playerB.health;
            util.GameConfig.PLAYER_B_BULLETS = this.playerB.bulletNum;
            util.GameConfig.PLAYER_B_SCORE = 0;
            this.ScoreBorad = new managers.ScoreBorad();
            this.squid = new objects.Squid(util.PLAYER_A_BULLET, 100, 100);
            // selectedd weapon type
            this.playerA.weaponType = "normal";
            this.playerB.weaponType = "normal";
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.addChild(this.background);
            this.addChild(this.baseA);
            this.addChild(this.baseB);
            this.addChild(this.playerA);
            this.addChild(this.ScoreBorad.LivesLabelA);
            this.addChild(this.ScoreBorad.BulletLabelA);
            this.addChild(this.playerB);
            this.addChild(this.ScoreBorad.LivesLabelB);
            this.addChild(this.ScoreBorad.BulletLabelB);
            this.addChild(this.squid);
            this.Main();
        }
        Update() {
            // detect keys to make movement
            this.detectPressedKeys();
            // detect the bullet collision
            this.detectBulletCollision(this.bulletAList, this.playerB);
            this.detectBulletCollision(this.bulletBList, this.playerA);
            // detect the base collision
            this.detectBaseCollision(this.baseA, this.playerA);
            this.detectBaseCollision(this.baseB, this.playerB);
            // detect bullet collision with each other
            this.detectDestructablesBulletCollision(this.bulletAList, this.bulletBList);
            //
            this.detectSquidAndBulletCollision(this.bulletAList, this.squid);
            this.detectSquidAndBulletCollision(this.bulletBList, this.squid);
            this.detectSquidPlayerCollision(this.squid, this.playerA, this.playerB);
            // update health and bullet label
            this.detectPlayerHealth();
            //      this.detectPlayersBullet();
        }
        Main() { }
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
                    let bulletsA = this.playerA.shoot(util.PLAYER_A_BULLET, aim);
                    this.ScoreBorad.BulletsA = this.playerA.bulletNum;
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
                    let bulletsB = this.playerB.shoot(util.PLAYER_B_BULLET, aim);
                    this.ScoreBorad.BulletsB = this.playerB.bulletNum;
                    if (bulletsB) {
                        bulletsB.forEach(b => {
                            this.bulletBList.push(b);
                            this.addChild(b);
                        });
                    }
                }
            }
        }
        detectBulletCollision(bullets, target) {
            for (let i = 0; i < bullets.length; i++) {
                managers.Collision.AABBCheck(bullets[i], target);
                if (target.isColliding) {
                    this.removeChild(bullets[i]); // remove the bullet from the stage
                    bullets.splice(i, 1); // remove the bullet from the list
                    // update player health
                    target.health -= 1;
                    switch (target.name) {
                        case "PlayerA":
                            {
                                this.ScoreBorad.LivesA = this.playerA.health;
                                this.ScoreBorad.ScoreB += 10;
                                let explosion = new objects.Explosion(10, 10);
                                this.addChild(explosion);
                            }
                            break;
                        case "PlayerB":
                            {
                                this.ScoreBorad.LivesB = this.playerB.health;
                                this.ScoreBorad.ScoreA += 10;
                                let explosion = new objects.Explosion(10, 10);
                                this.addChild(explosion);
                            }
                            break;
                    }
                }
                else if (bullets[i].x + bullets[i].halfWidth >= util.STAGE_W ||
                    bullets[i].x <= bullets[i].halfWidth) {
                    // simplying check the left and right border
                    this.removeChild(bullets[i]);
                    bullets.splice(i, 1); // remove the bullet from the list
                }
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
                                    this.ScoreBorad.ScoreA += 500;
                                }
                                break;
                            case "PlayerB":
                                {
                                    this.ScoreBorad.ScoreB += 500;
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
                //util.GameConfig.SCENE_STATE = scenes.State.END;
                util.GameConfig.SCENE_STATE = scenes.State.STAGECLEANED;
            }
        }
        detectPlayerHealth() {
            if (this.playerA.health <= 0 || this.playerB.health <= 0) {
                //util.GameConfig.SCENE_STATE = scenes.State.END;
                util.GameConfig.SCENE_STATE = scenes.State.STAGECLEANED;
            }
        }
        detectBaseCollision(base, target) {
            managers.Collision.AABBCheck(base, target);
            if (target.isColliding) {
                switch (target.name) {
                    case "PlayerA":
                        {
                            this.playerA.bulletNum = 10;
                            this.ScoreBorad.BulletsA = this.playerA.bulletNum;
                        }
                        break;
                    case "PlayerB":
                        {
                            this.playerB.bulletNum = 10;
                            this.ScoreBorad.BulletsB = this.playerB.bulletNum;
                        }
                        break;
                }
            }
        }
    }
    scenes.First = First;
})(scenes || (scenes = {}));
//# sourceMappingURL=First.js.map