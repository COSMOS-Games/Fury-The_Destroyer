module scenes {
  export class End extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    background: objects.Image;
    restartButton: objects.Image;
    mainButton: objects.Image;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this.background = new objects.Image(
        util.BACKGROUND_PATH_END,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );
      this.restartButton = new objects.Image(
        util.RESTART_BUTTON,
        480,
        450,
        200,
        80,
        true
      );

      this.mainButton = new objects.Image(
        util.MAIN_BUTTON,
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
      this.addChild(this.background);
      this.addChild(this.restartButton);
      this.addChild(this.mainButton);

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      this.restartButton.HoverOn();
      this.restartButton.on("click", function() {
        util.GameConfig.SCENE_STATE = scenes.State.FIRST;
      });

      this.mainButton.HoverOn();
      this.mainButton.on("click", function(){
        util.GameConfig.SCENE_STATE = scenes.State.START
      });
    }
  }
}
