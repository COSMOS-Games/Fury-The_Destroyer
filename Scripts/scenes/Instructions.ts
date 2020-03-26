module scenes {
  export class Instructions extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    private _background: objects.Image;
    private _instructionsLabel: objects.Image;
    private _startButton: objects.Image;
    private _mainButton: objects.Image;
    private _instruction: objects.Image;
    private _introduction: objects.Label;

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

      this._instructionsLabel = new objects.Image(
        util.INSTRUCTIONS,
        480,
        100,
        500,
        150,
        true
      );

      this._introduction = new objects.Label(
        "Score counts: \n\n    shot Submarine + 10\n\n    shot Mine + 5\n\n" +
          "\n\n3 Levels: \n\n    1. Simple movement\n\n    2. Intro to Mines\n\n    3. Intro to Advanced weapon",
        util.FONT_SIZE,
        util.FONT_FAMILY,
        util.FONT_COLOR,
        50,
        200,
        false
      );

      this._instruction = new objects.Image(
        util.INSTRUCTION_PATH,
        650,
        200,
        225,
        288,
        false
      );

      this._startButton = new objects.Image(
        util.PLAY_BUTTON,
        380,
        530,
        150,
        50,
        true
      );

      this._mainButton = new objects.Image(
        util.MAIN_BUTTON,
        580,
        530,
        150,
        50,
        true
      );

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this._background);
      this.addChild(this._instructionsLabel);
      this.addChild(this._introduction);
      this.addChild(this._startButton);
      this.addChild(this._mainButton);
      this.addChild(this._instruction);

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      this._startButton.HoverOn();
      this._startButton.on("click", function() {
        util.GameConfig.SCENE_STATE = scenes.State.FIRST;
      });

      this._mainButton.HoverOn();
      this._mainButton.on("click", function() {
        util.GameConfig.SCENE_STATE = scenes.State.START;
      });
    }
  }
}
