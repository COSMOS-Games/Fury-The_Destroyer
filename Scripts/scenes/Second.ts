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
   * Class for Second stage scene
   *
   * @export
   * @class Second
   * @extends {objects.Scene}
   */
  export class Second extends objects.Scene {
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
    mineList: objects.Mine[] = [];
    jellyfish: objects.Jellyfish;
    // states
    isChangedA: boolean = false;
    isChangedB: boolean = false;
    // manager
    scoreBorad: managers.ScoreBorad;

    // PUBLIC PROPERTIES
    public keyPressedStates: boolean[]; // to detect which keys are down

    // CONTRUCTOR
    /**
     * Creates an instance of Second.
     * @memberof Second
     */
    constructor() {
      super();

      // initialization
      // background
      this.background = new objects.Image(
        util.BACKGROUND_PATH_GAME2,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );

      // bases
      this.baseA = new objects.Image(util.BASE_A_PATH, 55, 90, 100, 100, true);
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

      //scoreborad
      this.scoreBorad = new managers.ScoreBorad();

      // mine
      this.mineList = this.generateMines();

      // // jellyfish
      this.jellyfish = new objects.Jellyfish(util.ENEMY, 100, 100);

      // key pressed state
      this.keyPressedStates = [];

      // selectedd weapon type
      this.playerA.weaponType = "normal";
      this.playerB.weaponType = "normal";

      this.Start();
    }

    // PUBLIC METHODS
    /**
     * Start method of Second Scene
     *
     * @memberof Second
     */
    public Start(): void {
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

      // generate mines
      for (let i = 0; i < this.mineList.length; i++) {
        this.addChild(this.mineList[i]);
      }

      this.Main();
    }

    /**
     * Update method of Second scene
     *
     * @memberof Second
     */
    public Update(): void {
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
      this.detectDestructablesBulletCollision(
        this.bulletAList,
        this.bulletBList
      );

      // detect bullet collision with jellyfish from player A
      this.detectJellyfishAndBulletCollision(this.bulletAList, this.jellyfish);

      // detect bullet collision with jellyfish from player B
      this.detectJellyfishAndBulletCollision(this.bulletBList, this.jellyfish);

      // update health and bullet label
      this.detectPlayerHealth();
    }

    /**
     * Main method of Second scene
     *
     * @memberof Second
     */
    public Main(): void { }

    // PRIVATE METHODS
    /**
     * Method for generating mines
     *
     * @returns {objects.Mine[]}
     * @memberof Second
     */
    public generateMines(): objects.Mine[] {
      // local variable
      let mines: objects.Mine[] = [];

      // create mines repeatly
      for (let i = 0; i < util.MINE_NUM + 10; i++) {
        // generate position at random
        let mineX = Math.floor(Math.random() * util.STAGE_W);
        let mineY = Math.floor(
          Math.random() * util.STAGE_H + util.STAGE_BOUNDARY_TOP
        );

        // hard corded safe area
        if (mineX < util.PLAYER_A_POS.x + 100) {
          // determine Y so that the mine won't hit the player A
          mineY = Math.floor(
            Math.random() * util.STAGE_H + 250 + util.STAGE_BOUNDARY_TOP
          );
        } else {
          mineY = Math.floor(
            Math.random() * util.STAGE_H + util.STAGE_BOUNDARY_TOP
          );

          if (mineY > util.STAGE_H - 200) {
            // determine X so that the mine won't hit the player A
            mineX = Math.floor(Math.random() * util.STAGE_W - mineX);
          }
        }

        mines.push(
          new objects.Mine(util.GameConfig.ATLAS, "mine", mineX, mineY)
        );
      }
      return mines;
    }

    /**
     * Method for detecting which key is pressed
     *
     * @memberof Second
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
     * @memberof Second
     */
    public detectShootingEvent(): void {
      // shoot key for player A
      if (this.keyPressedStates[util.Key.C]) {
        if (this.children.indexOf(this.playerA) !== -1) {
          // aim specifies the direction of shooting
          let aim = objects.Vector2.right();
          let bulletsA = this.playerA.shoot(
            util.GameConfig.ATLAS,
            "missileA",
            aim
          );
          this.scoreBorad.BulletsA = this.playerA.bulletNum;

          // push all bullets in bulletsA and add to the scene
          if (bulletsA) {
            bulletsA.forEach((b) => {
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
          let bulletsB = this.playerB.shoot(
            util.GameConfig.ATLAS,
            "missileB",
            aim
          );
          this.scoreBorad.BulletsB = this.playerB.bulletNum;

          // push all bullets in bulletsB and add to the scene
          if (bulletsB) {
            bulletsB.forEach((b) => {
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
     * @memberof Second
     */
    public detectWeaponCollision(
      weapon: objects.Bullet[],
      target: objects.Player
    ): void {
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
                let explosion = new objects.Explosion(
                  this.playerA.x + this.playerA.halfWidth,
                  this.playerA.y
                );
                this.addChild(explosion);
              }
              break;
            case "PlayerB":
              {
                // update scoreboard
                this.scoreBorad.LivesB = this.playerB.health;
                this.scoreBorad.ScoreA += 100;

                // display explosion effect
                let explosion = new objects.Explosion(
                  this.playerB.x - this.playerB.halfWidth,
                  this.playerB.y
                );
                this.addChild(explosion);
              }
              break;
          }
        } else if (
          weapon[i].x + weapon[i].halfWidth >= util.STAGE_W ||
          weapon[i].x <= weapon[i].halfWidth
        ) {
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
     * @memberof Second
     */
    public detectMineCollision(
      weapon: objects.Mine[],
      target: objects.Player
    ): void {
      // for all mines
      for (let i = 0; i < weapon.length; i++) {
        // check AABB detectiion
        managers.Collision.AABBCheck(weapon[i], target);

        // if there is a collision
        if (target.isColliding) {
          // display explosion effect
          let explosion = new objects.Explosion(weapon[i].x, weapon[i].y);
          this.addChild(explosion);

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

          this.scoreBorad.LivesA = this.playerA.health;
          this.scoreBorad.LivesB = this.playerB.health;
        } else if (
          weapon[i].x + weapon[i].halfWidth >= util.STAGE_W ||
          weapon[i].x <= weapon[i].halfWidth
        ) {
          // simplying check the left and right border
          this.removeChild(weapon[i]);
          // remove the bullet from the list
          weapon.splice(i, 1);
        }
      }
    }

    /**
     * Method for detecting collision between bullet and mine
     *
     * @param {(objects.Bullet[] | objects.Mine[])} destructableA
     * @param {(objects.Bullet[] | objects.Mine[])} destructableB
     * @memberof Second
     */
    public detectDestructablesCollision(
      destructableA: objects.Bullet[] | objects.Mine[],
      destructableB: objects.Bullet[] | objects.Mine[]
    ): void {
      // for all destructables A
      for (let i = 0; i < destructableA.length; i++) {
        // for all destructables B
        for (let j = 0; j < destructableB.length; j++) {
          // check AABB detection
          managers.Collision.AABBCheck(destructableA[i], destructableB[j]);

          // if there is a collision
          if (destructableB[j].isColliding) {
            // display explosion effect
            let explosion = new objects.Explosion(
              destructableA[i].x,
              destructableA[i].y
            );
            this.addChild(explosion);

            let bulletNumA = this.bulletAList.length;
            let bulletNumB = this.bulletBList.length;

            this.removeChild(destructableA[i]); // remove the bullet from the stage
            destructableA.splice(i, 1); // remove the bullet from the list
            this.removeChild(destructableB[j]); // remove the bullet from the stage
            destructableB.splice(j, 1); // remove the bullet from the list

            // update player score
            if (
              bulletNumA == this.bulletAList.length &&
              bulletNumB - 1 == this.bulletBList.length
            ) {
              this.scoreBorad.ScoreB += 30;
            } else if (
              bulletNumA - 1 == this.bulletAList.length &&
              bulletNumB == this.bulletBList.length
            ) {
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
     * @memberof Second
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
            let explosion = new objects.Explosion(
              destructableA[i].x + destructableA[i].halfWidth,
              destructableA[i].y
            );
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
     * @memberof Second
     */
    public detectJellyfishAndBulletCollision(
      bullets: objects.Bullet[],
      target: objects.Jellyfish
    ): void {
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
          let explosion = new objects.Explosion(
            this.jellyfish.x + diff,
            this.jellyfish.y
          );
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
     * @memberof Second
     */
    public detectPlayerHealth(): void {
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
        util.GameConfig.SCENE_STATE = scenes.State.STAGE_CLEANEDAGAIN;
      }
    }

    /**
     * Method for detecting collision between players and their own bases
     *
     * @param {objects.Image} base
     * @param {objects.Player} target
     * @memberof Second
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
  }
}
