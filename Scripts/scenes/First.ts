module scenes {
  export class First extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    background: objects.Image;
    playerA: objects.Player;
    playerB: objects.Player;
    playerAHealthLabel: objects.Label;
    playerABulletLabel: objects.Label;
    playerBHealthLabel: objects.Label;
    playerBBulletLabel: objects.Label;
    bulletAList: objects.Bullet[] = [];
    bulletBList: objects.Bullet[] = [];

    mineList: objects.Mine[] = [];

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
      // player A
      this.playerA = new objects.Player(
        util.PALYER_A_SUBMARINE,
        util.PLAYER_A_POS.x,
        util.PLAYER_A_POS.y
      );
      this.playerAHealthLabel = new objects.Label(
        "Playe A: Health " + this.playerA.health,
        "24px",
        "Times",
        "white",
        100,
        25,
        true
      );
      this.playerABulletLabel = new objects.Label(
        "Bullet " + this.playerA.bulletNum,
        "24px",
        "Times",
        "white",
        250,
        25,
        true
      );
      // player B
      this.playerB = new objects.Player(
        util.PALYER_B_SUBMARINE,
        util.PLAYER_B_POS.x,
        util.PLAYER_B_POS.y
      );
      this.playerBHealthLabel = new objects.Label(
        "Player B: Health " + this.playerB.health,
        "24px",
        "Times",
        "white",
        750,
        25,
        true
      );
      this.playerBBulletLabel = new objects.Label(
        "Bullet " + this.playerB.bulletNum,
        "24px",
        "Times",
        "white",
        900,
        25,
        true
      );

      // mine
      this.mineList = this.generateMines();

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
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

    public Update(): void {
      // detect keys to make movement
      this.detectPressedKeys();
      // detect the bullet collision
      this.detectWeaponCollision(this.bulletAList, this.playerB);
      this.detectWeaponCollision(this.bulletBList, this.playerA);
      // detect mine collision
      this.detectWeaponCollision(this.mineList, this.playerA);
      this.detectWeaponCollision(this.mineList, this.playerB);
      // update health and bullet label
      this.detectPlayerHealth();
      this.detectPlayersBullet();

    }

    public Main(): void { }

    // PRIVATE METHODS
    generateMines(): objects.Mine[] {
      let mines: objects.Mine[] = [];

      for (let i = 0; i < util.MINE_NUM; i++) {
        // generate position at random
        let mineX = Math.floor((Math.random() * util.STAGE_W));
        let mineY = Math.floor((Math.random() * util.STAGE_H));

        // hard corded safe area
        if (mineX < util.PLAYER_A_POS.x + 100) {
          mineY = Math.floor((Math.random() * util.STAGE_H) + 250)
        } else {
          mineY = Math.floor((Math.random() * util.STAGE_H))
          if (mineY > util.STAGE_H - 200) {
            mineX = Math.floor((Math.random() * util.STAGE_W) - mineX);
          }
        }

        mines.push(new objects.Mine(
          util.MINE,
          mineX,
          mineY
        ));
      }
      return mines;
    }

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
          let bulletA = this.playerA.shoot(util.PLAYER_A_BULLET, aim);
          this.playerABulletLabel.setText("Bullet " + this.playerA.bulletNum);
          if (bulletA) {
            this.bulletAList.push(bulletA);
            this.addChild(bulletA);
          }
        }
      }

      // shoot key for player B
      if (this.keyPressedStates[util.Key.M]) {
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

    detectWeaponCollision(
      weapon: objects.Bullet[] | objects.Mine[],
      target: objects.Player
    ): void {
      for (let i = 0; i < weapon.length; i++) {
        managers.Collision.AABBCheck(weapon[i], target);

        if (target.isColliding) {
          this.removeChild(weapon[i]); // remove the bullet from the stage
          weapon.splice(i, 1); // remove the bullet from the list

          target.health -= 1;
          this.playerAHealthLabel.setText(
            "Playe A: Health " + this.playerA.health
          );
          this.playerBHealthLabel.setText(
            "Playe B: Health " + this.playerB.health
          );
        } else if (
          weapon[i].x + weapon[i].halfWidth >= util.STAGE_W ||
          weapon[i].x <= weapon[i].halfWidth
        ) {
          // simplying check the left and right border
          this.removeChild(weapon[i]);
          weapon.splice(i, 1); // remove the bullet from the list
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
        util.GameConfig.SCENE_STATE = scenes.State.END;
      }
    }

    detectPlayerHealth(): void {
      if (this.playerA.health <= 0 || this.playerB.health <= 0) {
        util.GameConfig.SCENE_STATE = scenes.State.END;
      }
    }
  }
}
