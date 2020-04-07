"use strict";
// Game engine
let Game = (function () {
    // initialize the needed object
    let canvas = document.getElementsByTagName("canvas")[0];
    let stage;
    let currentSceneState;
    let currentScene;
    let FirstScene;
    let SecondScene;
    let ThirdScene;
    // assets
    let assets;
    let atlas;
    let assetManifest = [
        // images
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
    ];
    let atlasData = {
        "images": {},
        "frames": [
            [0, 0, 102, 105, 0, 0, 0],
            [118, 0, 102, 105, 0, 0, 0],
            [236, 0, 102, 105, 0, 0, 0],
            [354, 0, 102, 105, 0, 0, 0],
            [472, 0, 102, 105, 0, 0, 0],
            [590, 0, 102, 105, 0, 0, 0],
            [0, 105, 102, 105, 0, 0, 0],
            [118, 105, 102, 105, 0, 0, 0],
            [236, 105, 102, 105, 0, 0, 0],
            [354, 105, 93, 93, 0, 0, 0],
            [472, 105, 102, 46, 0, 0, 0],
            [590, 105, 102, 46, 0, 0, 0],
            [0, 210, 102, 46, 0, 0, 0],
            [118, 210, 102, 46, 0, 0, 0],
            [236, 210, 118, 88, 0, 0, 0],
            [354, 210, 118, 88, 0, 0, 0],
            [472, 210, 118, 88, 0, 0, 0],
            [590, 210, 118, 88, 0, 0, 0],
            [0, 315, 118, 88, 0, 0, 0],
            [118, 315, 118, 88, 0, 0, 0],
            [236, 315, 118, 88, 0, 0, 0],
            [354, 315, 118, 88, 0, 0, 0],
            [472, 315, 118, 88, 0, 0, 0],
            [590, 315, 118, 88, 0, 0, 0],
            [0, 420, 118, 88, 0, 0, 0],
            [118, 420, 118, 88, 0, 0, 0],
            [236, 420, 118, 88, 0, 0, 0],
            [354, 420, 88, 86, 0, 0, 0],
            [472, 420, 88, 86, 0, 0, 0],
            [590, 420, 88, 86, 0, 0, 0],
            [0, 525, 88, 86, 0, 0, 0],
            [118, 525, 88, 86, 0, 0, 0],
            [236, 525, 88, 86, 0, 0, 0],
            [354, 525, 88, 86, 0, 0, 0],
            [472, 525, 88, 86, 0, 0, 0],
            [590, 525, 88, 86, 0, 0, 0],
            [0, 630, 88, 86, 0, 0, 0],
            [118, 630, 88, 86, 0, 0, 0],
            [236, 630, 88, 86, 0, 0, 0],
            [354, 630, 88, 86, 0, 0, 0]
        ],
        "animations": {
            "explosion": {
                "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8],
                "speed": 0.5
            },
            "mine": { "frames": [9] },
            "missileA": { "frames": [10] },
            "missileA1": { "frames": [11] },
            "missileB": { "frames": [12] },
            "missileB1": { "frames": [13] },
            "submarineA": {
                "frames": [14, 15, 16, 17, 18, 19],
                "speed": 0.2
            },
            "submarineA2": {
                "frames": [20, 21, 22, 23, 24, 25],
                "speed": 0.2
            },
            "submarineA3": { "frames": [26] },
            "submarineB": {
                "frames": [27, 28, 29, 30, 31, 32],
                "speed": 0.2
            },
            "submarineB6": {
                "frames": [33, 34, 35, 36, 37, 38],
                "speed": 0.2
            },
            "submarineB12": { "frames": [39] }
        }
    };
    /**
     * Function for preloading assets
     *
     */
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        util.GameConfig.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest); // load assetManifest
        assets.on("complete", Start); // once completed, call start function
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Game Started!`, "color: lightblue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        // set animation form spritesheet
        atlasData.images = [assets.getResult("atlas")];
        atlas = new createjs.SpriteSheet(atlasData);
        util.GameConfig.ATLAS = atlas;
        currentSceneState = scenes.State.NO_SCENE;
        util.GameConfig.SCENE_STATE = scenes.State.SPLASH;
        // Load Files
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerSound("./Assets/audio/shoot.mp3", "shoot");
        // currentSceneState = scenes.State.NO_SCENE;
        // util.GameConfig.SCENE_STATE = scenes.State.START;
    }
    function Update() {
        if (currentSceneState != util.GameConfig.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    function Main() {
        console.log(`%c Switching Scenes!`, "color: green; font-size: 16px;");
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        switch (util.GameConfig.SCENE_STATE) {
            case scenes.State.SPLASH:
                currentScene = new scenes.Splash();
                break;
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
    window.addEventListener("keyup", (event) => {
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
    window.addEventListener("keydown", (event) => {
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
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map