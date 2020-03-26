module scenes {
  export class Splash extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    private _background: objects.Image;
    private _furyLabel: objects.Image;

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

      this._furyLabel = new objects.Image(
        util.FURY_PATH,
        480,
        100,
        500,
        150,
        true
      );


      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this._background);
      this.addChild(this._furyLabel);
      this.Main();
    }

    public Update(): void {

      if (createjs.Ticker.getTime() >= 3000) {
        util.GameConfig.SCENE_STATE = scenes.State.START;
      }

    }

    // TODO:consolidate stage cleared scene
    public Main(): void {
    }
  }
}
