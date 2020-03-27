module scenes {
  export class Splash extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    private _splashScreen: objects.Image;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this._splashScreen = new objects.Image(
        util.SPLASH_SCREEN,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );


      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this._splashScreen);
      this.Main();
    }

    public Update(): void {

      if (createjs.Ticker.getTime() >= 4000) {
        util.GameConfig.SCENE_STATE = scenes.State.START;
      }

    }

    // TODO:consolidate stage cleared scene
    public Main(): void {
    }
  }
}
