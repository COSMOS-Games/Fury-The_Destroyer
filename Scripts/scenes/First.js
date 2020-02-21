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
            // player A
            this.playerA = new objects.Player(util.PALYER_A_SUBMARINE, util.PLAYER_A_POS.x, util.PLAYER_A_POS.y);
            this.playerAHealthLabel = new objects.Label("Playe A: Health " + this.playerA.health, "24px", "Times", "white", 100, 25, true);
            this.playerABulletLabel = new objects.Label("Bullet " + this.playerA.bulletNum, "24px", "Times", "white", 250, 25, true);
            // player B
            this.playerB = new objects.Player(util.PALYER_B_SUBMARINE, util.PLAYER_B_POS.x, util.PLAYER_B_POS.y);
            this.playerBHealthLabel = new objects.Label("Player B: Health " + this.playerB.health, "24px", "Times", "white", 750, 25, true);
            this.playerBBulletLabel = new objects.Label("Bullet " + this.playerB.bulletNum, "24px", "Times", "white", 900, 25, true);
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
            this.Main();
        }
        Update() {
            // detect keys to make movement
            this.detectPressedKeys();
            // detect the bullet collision
            this.detectBulletCollision(this.bulletAList, this.playerB);
            this.detectBulletCollision(this.bulletBList, this.playerA);
            // update health and bullet label
            this.detectPlayerHealth();
            this.detectPlayersBullet();
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
        detectBulletCollision(bullets, target) {
            for (let i = 0; i < bullets.length; i++) {
                managers.Collision.AABBCheck(bullets[i], target);
                if (target.isColliding) {
                    this.removeChild(bullets[i]); // remove the bullet from the stage
                    bullets.splice(i, 1); // remove the bullet from the list
                    target.health -= 1;
                    this.playerAHealthLabel.setText("Playe A: Health " + this.playerA.health);
                    this.playerBHealthLabel.setText("Playe B: Health " + this.playerB.health);
                }
                else if (bullets[i].x + bullets[i].halfWidth >= util.STAGE_W ||
                    bullets[i].x <= bullets[i].halfWidth) {
                    // simplying check the left and right border
                    this.removeChild(bullets[i]);
                    bullets.splice(i, 1); // remove the bullet from the list
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
    }
    scenes.First = First;
})(scenes || (scenes = {}));
//# sourceMappingURL=First.js.map