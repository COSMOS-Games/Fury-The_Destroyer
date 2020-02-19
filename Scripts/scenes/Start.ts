module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    background: objects.Image;
    startButton: objects.Image;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this.background = new objects.Image(
        util.BACKGROUND_PATH,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );
      this.startButton = new objects.Image(
        util.PLAY_BUTTON,
        480,
        450,
        200,
        80,
        true
      );

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this.background);
      this.addChild(this.startButton);

      this.Main();
    }

    public Update(): void { }

    // TODO:consolidate stage cleared scene
    public Main(): void {
      this.startButton.HoverOn();
      this.startButton.on("click", function () {
        util.GameConfig.SCENE_STATE = scenes.State.FIRST;
        // util.GameConfig.SCENE_STATE = scenes.State.SECOND;
      });
    }
  }
}
