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
     * Class for First stage scene
     *
     * @export
     * @class First
     * @extends {objects.Scene}
     */
    export class First extends objects.Scene {
        // PRIVATE INSTANCE MEMEBERS
        // images
        background: objects.Image;
        baseA: objects.Image;
        baseB: objects.Image;
        // game objects
        playerA: objects.Player;
        playerB: objects.Player;
        bulletAList: objects.Bullet[] = [];
        bulletBList: objects.Bullet[] = [];
        ScoreBorad: managers.ScoreBorad;
        squid: objects.Squid;
        // states
        isDamagedA: boolean = false;
        isDamagedB: boolean = false;

        // PUBLIC PROPERTIES
        public keyPressedStates: boolean[]; // to detect which keys are down

        // CONTRUCTOR
        /**
         * Creates an instance of First.
         * @memberof First
         */
        constructor() {
            super();

            // initialization
            // background
            this.background = new objects.Image(
                util.BACKGROUND_PATH_GAME1,
                0,
                0,
                util.STAGE_W,
                util.STAGE_H,
                false
            );

            // bases
            this.baseA = new objects.Image(
                util.BASE_A_PATH,
                55,
                90,
                100,
                100,
                true
            );
            this.baseB = new objects.Image(
                util.BASE_B_PATH,
                900,
                580,
                100,
                100,
                true
            );

            // player A
            this.playerA = new objects.Player(
                util.GameConfig.ATLAS,
                "submarineA",
                util.PLAYER_A_POS.x,
                util.PLAYER_A_POS.y,
                "PlayerA"
            );
            util.GameConfig.PLAYER_A_LIVES = this.playerA.health;
            util.GameConfig.PLAYER_A_BULLETS = this.playerA.bulletNum;
            util.GameConfig.PLAYER_A_SCORE = 0;

            // player B
            this.playerB = new objects.Player(
                util.GameConfig.ATLAS,
                "submarineB",
                util.PLAYER_B_POS.x,
                util.PLAYER_B_POS.y,
                "PlayerB"
            );
            util.GameConfig.PLAYER_B_LIVES = this.playerB.health;
            util.GameConfig.PLAYER_B_BULLETS = this.playerB.bulletNum;
            util.GameConfig.PLAYER_B_SCORE = 0;

            // score board
            this.ScoreBorad = new managers.ScoreBorad();

            // squid
            this.squid = new objects.Squid(util.PLAYER_A_BULLET, 100, 100);

            // key pressed state
            this.keyPressedStates = [];

            // selected weapon type
            this.playerA.weaponType = "normal";
            this.playerB.weaponType = "normal";

            this.Start();
        }

        // PUBLIC METHODS
        /**
         * Start method of First Scene
         *
         * @memberof First
         */
        public Start(): void {
            // add children to the stage
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

        /**
         * Update method of First scene
         *
         * @memberof First
         */
        public Update(): void {
            // detect keys to make movement
            this.detectPressedKeys();

            // detect the bullet collision
            this.detectBulletCollision(this.bulletAList, this.playerB);
            this.detectBulletCollision(this.bulletBList, this.playerA);

            // detect the base collision
            this.detectBaseCollision(this.baseA, this.playerA);
            this.detectBaseCollision(this.baseB, this.playerB);

            // detect bullet collision with each other
            this.detectDestructablesBulletCollision(
                this.bulletAList,
                this.bulletBList
            );

            // detect bullet collision with squid from player A
            this.detectSquidAndBulletCollision(
                this.bulletAList,
                this.squid
            );

            // detect bullet collision with squid from player B
            this.detectSquidAndBulletCollision(
                this.bulletBList,
                this.squid
            );

            // detect players collision with squid
            this.detectSquidPlayerCollision(
                this.squid,
                this.playerA,
                this.playerB
            );

            // update health and bullet label
            this.detectPlayerHealth();
        }

        /**
         * Main method of First scene
         *
         * @memberof First
         */
        public Main(): void { }

        /**
         * Method for detecting which key is pressed
         *
         * @memberof First
         */
        public detectPressedKeys(): void {
            // move either up (Up) or down (DOWN)
            if (this.keyPressedStates[util.Key.UP]) {
                this.playerB.moveUp();
            } else if (this.keyPressedStates[util.Key.DOWN]) {
                this.playerB.moveDown();
            }

            // move either left (LEFT) or right (RIGHT)
            if (this.keyPressedStates[util.Key.LEFT]) {
                this.playerB.moveLeft();
            } else if (this.keyPressedStates[util.Key.RIGHT]) {
                this.playerB.moveRight();
            }

            // move either up (W) or down (S)
            if (this.keyPressedStates[util.Key.W]) {
                this.playerA.moveUp();
            } else if (this.keyPressedStates[util.Key.S]) {
                this.playerA.moveDown();
            }

            // move either left (A) or right (D)
            if (this.keyPressedStates[util.Key.A]) {
                this.playerA.moveLeft();
            } else if (this.keyPressedStates[util.Key.D]) {
                this.playerA.moveRight();
            }
        }

        /**
         * Method for detecting shooting event
         *
         * @memberof First
         */
        public detectShootingEvent(): void {
            // shoot key for player A
            if (this.keyPressedStates[util.Key.C]) {
                if (this.children.indexOf(this.playerA) !== -1) {
                    // aim specifies the direction of shooting
                    let aim = objects.Vector2.right();
                    let bulletsA = this.playerA.shoot(util.GameConfig.ATLAS, "missileA", aim);
                    this.ScoreBorad.BulletsA = this.playerA.bulletNum;

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
            if (this.keyPressedStates[util.Key.M]) {
                if (this.children.indexOf(this.playerB) !== -1) {
                    // aim specifies the direction of shooting
                    let aim = objects.Vector2.left();
                    let bulletsB = this.playerB.shoot(util.GameConfig.ATLAS, "missileB", aim);
                    this.ScoreBorad.BulletsB = this.playerB.bulletNum;

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
         * @param {objects.Bullet[]} bullets
         * @param {objects.Player} target
         * @memberof First
         */
        public detectBulletCollision(
            bullets: objects.Bullet[],
            target: objects.Player
        ): void {
            // for all bullets
            for (let i = 0; i < bullets.length; i++) {
                // check AABB detection
                managers.Collision.AABBCheck(bullets[i], target);

                // if they is a collision
                if (target.isColliding) {
                    // remove the bullet from the stage
                    this.removeChild(bullets[i]);

                    // remove the bullet from the list
                    bullets.splice(i, 1);

                    // update player health
                    target.health -= 1;

                    // based on which player it is
                    switch (target.name) {
                        case "PlayerA":
                            {
                                // update scoreboard
                                this.ScoreBorad.LivesA = this.playerA.health;
                                this.ScoreBorad.ScoreB += 10;

                                // display explosion effect
                                let explosion = new objects.Explosion(this.playerA.x + this.playerA.halfWidth, this.playerA.y);
                                this.addChild(explosion);
                            }
                            break;
                        case "PlayerB":
                            {
                                // update scoreboard
                                this.ScoreBorad.LivesB = this.playerB.health;
                                this.ScoreBorad.ScoreA += 10;

                                // display explosion effect
                                let explosion = new objects.Explosion(this.playerB.x - this.playerB.halfWidth, this.playerB.y);
                                this.addChild(explosion);
                            }
                            break;
                    }
                } else if (
                    bullets[i].x + bullets[i].halfWidth >= util.STAGE_W ||
                    bullets[i].x <= bullets[i].halfWidth
                ) {
                    // simplying check the left and right border
                    this.removeChild(bullets[i]);

                    // remove the bullet from the list
                    bullets.splice(i, 1);
                }
            }
        }

        /**
         * Method for detecting collision between squid and bullet
         *
         * @param {objects.Bullet[]} bullets
         * @param {objects.Squid} target
         * @memberof First
         */
        public detectSquidAndBulletCollision(
            bullets: objects.Bullet[],
            target: objects.Squid
        ): void {
            // for all bullets
            for (let i = 0; i < bullets.length; i++) {
                // check AABB detection
                managers.Collision.AABBCheck(bullets[i], target);

                // if there is a collision
                if (target.isColliding) {
                    // update player health
                    target.health -= 1;

                    // once squid's health goes to 0, update score based on who killed it
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

                        // reset squid
                        target.Reset();
                    }

                    // remove the bullet from the stage
                    this.removeChild(bullets[i]);
                    // remove the bullet from the list
                    bullets.splice(i, 1);
                }
            }
        }

        /**
         * Method for detecting collision between squid and players
         *
         * @param {objects.Squid} squid
         * @param {objects.Player} playerA
         * @param {objects.Player} playerB
         * @memberof First
         */
        public detectSquidPlayerCollision(
            squid: objects.Squid,
            playerA: objects.Player,
            playerB: objects.Player,
        ): void {
            // check if player B is colliding 
            managers.Collision.AABBCheck(playerB, squid);

            if (squid.isColliding) {
                // change squid's scale based on the status
                squid.scaleX = squid.scaleX > 0 ? 1.1 : -1.1;
                squid.scaleY = squid.scaleY > 0 ? 1.1 : -1.1;
            } else {
                // check if player A is colliding
                managers.Collision.AABBCheck(playerA, squid);

                // change squid's scale based on the status
                if (squid.isColliding) {
                    squid.scaleX = squid.scaleX > 0 ? 1.1 : -1.1;
                    squid.scaleY = squid.scaleY > 0 ? 1.1 : -1.1;
                } else {
                    squid.scaleX = squid.scaleX > 0 ? 1 : -1;
                    squid.scaleY = squid.scaleY > 0 ? 1 : -1;
                }
            }
        }

        /**
         * Method for detecting collision between bullets
         *
         * @param {objects.Bullet[]} destructableA
         * @param {objects.Bullet[]} destructableB
         * @memberof First
         */
        public detectDestructablesBulletCollision(
            destructableA: objects.Bullet[],
            destructableB: objects.Bullet[]
        ): void {
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
         * Method for detecting players' health
         *
         * @memberof First
         */
        public detectPlayerHealth(): void {
            // if player A is not damaged yet
            if (!this.isDamagedA) {
                // once player A is damaged
                if (this.playerA.health == 1) {
                    // change status to damaged
                    this.isDamagedA = true;

                    // change animation
                    this.playerA.ChangeAnimation("submarineA", "submarineA2");
                }
            }

            // if player B is not damaged yet
            if (!this.isDamagedB) {
                // once player B is damaged
                if (this.playerB.health == 1) {
                    // change status to damaged
                    this.isDamagedB = true;

                    // change animation
                    this.playerB.ChangeAnimation("submarineB", "submarineB2");
                }
            }

            // either player dies
            if (this.playerA.health <= 0 || this.playerB.health <= 0) {
                // reset damaged status 
                this.isDamagedA = false;
                this.isDamagedB = false;

                // move to the next scene
                util.GameConfig.SCENE_STATE = scenes.State.STAGECLEANED;
            }
        }

        /**
         * Method for detecting collision between players and their own bases
         *
         * @param {objects.Image} base
         * @param {objects.Player} target
         * @memberof First
         */
        public detectBaseCollision(
            base: objects.Image,
            target: objects.Player
        ): void {
            // check AABB collision
            managers.Collision.AABBCheck(base, target);

            if (target.isColliding) {
                switch (target.name) {
                    case "PlayerA":
                        {
                            // recharge bullets
                            this.playerA.bulletNum = 10;
                            this.ScoreBorad.BulletsA = this.playerA.bulletNum;
                        }
                        break;
                    case "PlayerB":
                        {
                            // recharge bullets
                            this.playerB.bulletNum = 10;
                            this.ScoreBorad.BulletsB = this.playerB.bulletNum;
                        }
                        break;
                }
            }
        }
    }
}
