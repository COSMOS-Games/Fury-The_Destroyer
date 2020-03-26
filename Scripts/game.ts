// Game engine
let Game = (function() {
  // initialize the needed object
  let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
  let stage: createjs.Stage;

  let currentSceneState: scenes.State;
  let currentScene: objects.Scene;
  let FirstScene: scenes.First;
  let SecondScene: scenes.Second;
  let ThirdScene: scenes.Third;

  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */

  function Start(): void {
    console.log(
      `%c Game Started!`,
      "color: lightblue; font-size: 20px; font-weight: bold;"
    );
    stage = new createjs.Stage(canvas);
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);
    stage.enableMouseOver(20);

    currentSceneState = scenes.State.NO_SCENE;
    util.GameConfig.SCENE_STATE = scenes.State.START;
  }

  function Update(): void {
    if (currentSceneState != util.GameConfig.SCENE_STATE) {
      Main();
    }
    currentScene.Update();
    stage.update();
  }

  function Main(): void {
    console.log(`%c Switching Scenes!`, "color: green; font-size: 16px;");

    if (currentSceneState != scenes.State.NO_SCENE) {
      currentScene.removeAllChildren();
      stage.removeAllChildren();
    }

    switch (util.GameConfig.SCENE_STATE) {
      case scenes.State.START:
        currentScene = new scenes.Start();
        break;
      case scenes.State.INSTRUCTIONS:
        currentScene = new scenes.Instructions();
        break;
      case scenes.State.FIRST:
        FirstScene = new scenes.First();
        currentScene = FirstScene;
        break;
      case scenes.State.STAGECLEANED:
        currentScene = new scenes.StageCleaned();
        break;
      case scenes.State.SECOND:
        SecondScene = new scenes.Second();
        currentScene = SecondScene;
        break;
      case scenes.State.STAGECLEANEDAGAIN:
        currentScene = new scenes.StageCleanedAgain();
        break;
      case scenes.State.THIRD:
        ThirdScene = new scenes.Third();
        currentScene = ThirdScene;
        break;
      case scenes.State.END:
        currentScene = new scenes.End();
        break;
    }

    stage.addChild(currentScene);
    currentSceneState = util.GameConfig.SCENE_STATE;
  }

  window.addEventListener("keyup", (event: KeyboardEvent) => {
    if (FirstScene && FirstScene.keyPressedStates) {
      FirstScene.keyPressedStates[event.keyCode] = false;
    }
    // second
    if (SecondScene && SecondScene.keyPressedStates) {
      SecondScene.keyPressedStates[event.keyCode] = false;
    }

    if (ThirdScene && ThirdScene.keyPressedStates) {
      ThirdScene.keyPressedStates[event.keyCode] = false;
    }
  });

  // attach keydown and keyup event to the window
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (FirstScene && FirstScene.keyPressedStates) {
      FirstScene.keyPressedStates[event.keyCode] = true;
      FirstScene.detectShootingEvent();
    }
    if (SecondScene && SecondScene.keyPressedStates) {
      SecondScene.keyPressedStates[event.keyCode] = true;
      SecondScene.detectShootingEvent();
    }

    if (ThirdScene && ThirdScene.keyPressedStates) {
      ThirdScene.keyPressedStates[event.keyCode] = true;
      ThirdScene.detectShootingEvent();
    }
  });

  window.addEventListener("load", Start);
})();
