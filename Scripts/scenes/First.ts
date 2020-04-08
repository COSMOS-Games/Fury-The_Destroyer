module scenes {
  export class First extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    background: objects.Image;
    baseA: objects.Image;
    baseB: objects.Image;
    playerA: objects.Player;
    playerB: objects.Player;
    bulletAList: objects.Bullet[] = [];
    bulletBList: objects.Bullet[] = [];
    ScoreBorad: managers.ScoreBorad;

    squid: objects.Squid;

    // PUBLIC PROPERTIES
    public keyPressedStates: boolean[]; // to detect which keys are down

    // CONTRUCTOR
    constructor() {
      super();

      this.keyPressedStates = [];
      this.background = new objects.Image(
        util.BACKGROUND_PATH_GAME,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );
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

      this.ScoreBorad = new managers.ScoreBorad();

      this.squid = new objects.Squid(util.PLAYER_A_BULLET, 100, 100);

      // selectedd weapon type
      this.playerA.weaponType = "normal";
      this.playerB.weaponType = "normal";

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
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


      //
      this.detectSquidAndBulletCollision(
        this.bulletAList,
        this.squid
      );
      this.detectSquidAndBulletCollision(
        this.bulletBList,
        this.squid
      );
      this.detectSquidPlayerCollision(
        this.squid,
        this.playerA,
        this.playerB
      );


      // update health and bullet label
      this.detectPlayerHealth();
      //      this.detectPlayersBullet();
    }

    public Main(): void { }

    detectPressedKeys(): void {
      if (this.keyPressedStates[util.Key.UP]) {
        this.playerB.moveUp();
      } else if (this.keyPressedStates[util.Key.DOWN]) {
        this.playerB.moveDown();
      }
      if (this.keyPressedStates[util.Key.LEFT]) {
        this.playerB.moveLeft();
      } else if (this.keyPressedStates[util.Key.RIGHT]) {
        this.playerB.moveRight();
      }
      if (this.keyPressedStates[util.Key.W]) {
        this.playerA.moveUp();
      } else if (this.keyPressedStates[util.Key.S]) {
        this.playerA.moveDown();
      }
      if (this.keyPressedStates[util.Key.A]) {
        this.playerA.moveLeft();
      } else if (this.keyPressedStates[util.Key.D]) {
        this.playerA.moveRight();
      }
    }

    public detectShootingEvent(): void {
      // shoot key for player A
      if (this.keyPressedStates[util.Key.C]) {
        if (this.children.indexOf(this.playerA) !== -1) {
          let aim = objects.Vector2.right();
          let bulletsA = this.playerA.shoot(util.GameConfig.ATLAS, "missileA", aim);
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
      if (this.keyPressedStates[util.Key.M]) {
        if (this.children.indexOf(this.playerB) !== -1) {
          // aim specifies the direction of shooting
          let aim = objects.Vector2.left();
          let bulletsB = this.playerB.shoot(util.GameConfig.ATLAS, "missileB", aim);
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

    detectBulletCollision(
      bullets: objects.Bullet[],
      target: objects.Player
    ): void {
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
                let explosion = new objects.Explosion(this.playerA.x + this.playerA.halfWidth, this.playerA.y);
                this.addChild(explosion);
              }
              break;
            case "PlayerB":
              {
                this.ScoreBorad.LivesB = this.playerB.health;
                this.ScoreBorad.ScoreA += 10;
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
          bullets.splice(i, 1); // remove the bullet from the list
        }
      }
    }

    detectSquidAndBulletCollision(
      bullets: objects.Bullet[],
      target: objects.Squid
    ): void {
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

    detectSquidPlayerCollision(
      squid: objects.Squid,
      playerA: objects.Player,
      playerB: objects.Player,
    ): void {
      managers.Collision.AABBCheck(playerB, squid);

      if (squid.isColliding) {
        squid.scaleX = squid.scaleX > 0 ? 1.1 : -1.1;
        squid.scaleY = squid.scaleY > 0 ? 1.1 : -1.1;
      } else {
        managers.Collision.AABBCheck(playerA, squid);
        if (squid.isColliding) {
          squid.scaleX = squid.scaleX > 0 ? 1.1 : -1.1;
          squid.scaleY = squid.scaleY > 0 ? 1.1 : -1.1;
        } else {
          squid.scaleX = squid.scaleX > 0 ? 1 : -1;
          squid.scaleY = squid.scaleY > 0 ? 1 : -1;

        }
      }

    }


    detectDestructablesBulletCollision(
      destructableA: objects.Bullet[],
      destructableB: objects.Bullet[]
    ): void {
      for (let i = 0; i < destructableA.length; i++) {
        for (let j = 0; j < destructableB.length; j++) {
          managers.Collision.AABBCheck(destructableA[i], destructableB[j]);
          if (destructableB[j].isColliding) {
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

    detectPlayersBullet(): void {
      if (
        this.playerA.bulletNum == 0 &&
        this.playerB.bulletNum == 0 &&
        this.bulletAList.length == 0 &&
        this.bulletBList.length == 0
      ) {
        //util.GameConfig.SCENE_STATE = scenes.State.END;
        util.GameConfig.SCENE_STATE = scenes.State.STAGECLEANED;
      }
    }



    detectPlayerHealth(): void {
      if (this.playerA.health <= 0 || this.playerB.health <= 0) {
        //util.GameConfig.SCENE_STATE = scenes.State.END;
        util.GameConfig.SCENE_STATE = scenes.State.STAGECLEANED;
      }
    }

    detectBaseCollision(
      base: objects.Image,
      target: objects.Player
    ): void {
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
}
