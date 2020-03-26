module scenes {
  export class StageCleanedAgain extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    private _background: objects.Image;
    private _nextBattleLabel: objects.Image;
    private _descriptionLabel: objects.Label;
    private _nextButton: objects.Image;
    private _nextButtonUpgradeWeapon: objects.Image;
    private _scoreBoard: managers.ScoreBorad;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this._background = new objects.Image(
        util.BACKGROUND_PATH_GAME,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );

      this._nextButton = new objects.Image(
        util.NEXT_BUTTON,
        380,
        530,
        150,
        50,
        true
      );

      this._nextButtonUpgradeWeapon = new objects.Image(
        util.NEXT_BUTTON_UPGRADE,
        580,
        530,
        150,
        50,
        true
      );

      this._nextBattleLabel = new objects.Image(
        util.NEXT_BATTLE_PATH,
        480,
        100,
        500,
        150,
        true
      );

      let description =
        "In next level, more randomly generated MINEs in map!  \n\nBe careful!  \n\n" +
        "In addition, you can choose to upgrade the advanced weapon   \n\nIt can shoot 3 bullets at one time!";
      this._descriptionLabel = new objects.Label(
        description,
        util.FONT_SIZE,
        util.FONT_FAMILY,
        util.FONT_COLOR,
        50,
        250,
        false
      );
      this._scoreBoard = new managers.ScoreBorad();

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this._background);
      this.addChild(this._nextBattleLabel);
      this.addChild(this._scoreBoard.ScoreLabelA);
      this.addChild(this._scoreBoard.ScoreLabelB);
      this.addChild(this._descriptionLabel);
      this.addChild(this._nextButton);
      this.addChild(this._nextButtonUpgradeWeapon);

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      this._nextButton.HoverOn();
      this._nextButtonUpgradeWeapon.HoverOn();

      this._nextButton.on("click", function() {
        util.GameConfig.WEAPON_TYPE = "normal";
        util.GameConfig.SCENE_STATE = scenes.State.THIRD;
      });

      this._nextButtonUpgradeWeapon.on("click", function() {
        util.GameConfig.WEAPON_TYPE = "3way";
        util.GameConfig.SCENE_STATE = scenes.State.THIRD;
      });
    }
  }
}
