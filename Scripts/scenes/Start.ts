module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    private _background: objects.Image;
    private _startButton: objects.Image;
    private _instructionsButton: objects.Image;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this._background = new objects.Image(
        util.BACKGROUND_PATH,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );


      this._startButton = new objects.Image(
        util.PLAY_BUTTON,
        480,
        450,
        200,
        80,
        true
      );

      this._instructionsButton = new objects.Image(
        util.INSTRUCTION_BUTTON,
        480,
        550,
        200,
        80,
        true
      );


      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this._background);
      this.addChild(this._startButton);
      this.addChild(this._instructionsButton)

      this.Main();
    }

    public Update(): void {}

    // TODO:consolidate stage cleared scene
    public Main(): void {
      this._startButton.HoverOn();
      this._startButton.on("click", function() {
        util.GameConfig.SCENE_STATE = scenes.State.FIRST;
        // initialize the scores for players
        util.GameConfig.PLAYER_A_SCORE = 0;
        util.GameConfig.PLAYER_B_SCORE = 0;
        // util.GameConfig.SCENE_STATE = scenes.State.SECOND;
      });
      this._instructionsButton.HoverOn();
      this._instructionsButton.on("click", function() {
        util.GameConfig.SCENE_STATE = scenes.State.INSTRUCTIONS;
      });
      
    }
  }
}
