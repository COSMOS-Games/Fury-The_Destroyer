"use strict";
// Game engine
let Game = (function () {
    // initialize the needed object
    let canvas = document.getElementsByTagName("canvas")[0];
    let stage;
    let currentSceneState;
    let currentScene;
    let MoveInstruction;
    let ShootInstruction;
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
        images: {},
        frames: [
            [0, 0, 102, 105, 0, 0, 0],
            [118, 0, 102, 105, 0, 0, 0],
            [236, 0, 102, 105, 0, 0, 0],
            [354, 0, 102, 105, 0, 0, 0],
            [472, 0, 102, 105, 0, 0, 0],
            [590, 0, 102, 105, 0, 0, 0],
            [0, 105, 102, 105, 0, 0, 0],
            [118, 105, 102, 105, 0, 0, 0],
            [236, 105, 102, 105, 0, 0, 0],
            [354, 105, 40, 40, 0, 0, 0],
            [472, 105, 60, 27, 0, 0, 0],
            [590, 105, 60, 27, 0, 0, 0],
            [0, 210, 60, 27, 0, 0, 0],
            [118, 210, 60, 27, 0, 0, 0],
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
            [354, 630, 88, 86, 0, 0, 0],
        ],
        animations: {
            explosion: {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                speed: 0.2,
            },
            mine: { frames: [9] },
            missileA: {
                frames: [10, 11],
                speed: 0.2,
            },
            missileB: {
                frames: [12, 13],
                speed: 0.2,
            },
            submarineA: {
                frames: [14, 15, 16, 17, 18, 19],
                speed: 0.2,
            },
            submarineA2: {
                frames: [20, 21, 22, 23, 24, 25],
                speed: 0.2,
            },
            submarineA3: { frames: [26] },
            submarineB: {
                frames: [27, 28, 29, 30, 31, 32],
                speed: 0.2,
            },
            submarineB2: {
                frames: [33, 34, 35, 36, 37, 38],
                speed: 0.2,
            },
            submarineB3: { frames: [39] },
        },
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
        createjs.Sound.registerSound("./Assets/audio/button1.mp3", "button1");
        createjs.Sound.registerSound("./Assets/audio/button2.mp3", "button2");
        createjs.Sound.registerSound("./Assets/audio/explosion.mp3", "explosion");
        createjs.Sound.registerSound("./Assets/audio/game-over.mp3", "game-over");
        createjs.Sound.registerSound("./Assets/audio/impact.mp3", "impact");
        createjs.Sound.registerSound("./Assets/audio/menu.mp3", "menu");
        //    createjs.Sound.registerSound("./Assets/audio/play.mp3", "play");
        createjs.Sound.registerSound("./Assets/audio/BEAST1.wav", "beast");
        createjs.Sound.registerSound("./Assets/audio/play1.mp3", "play1");
        createjs.Sound.registerSound("./Assets/audio/play2.mp3", "play2");
        createjs.Sound.registerSound("./Assets/audio/play3.mp3", "play3");
        createjs.Sound.registerSound("./Assets/audio/shoot.mp3", "shoot");
        createjs.Sound.registerSound("./Assets/audio/splash.mp3", "splash");
        createjs.Sound.registerSound("./Assets/audio/stage-cleaned.mp3", "stage-cleaned");
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
                createjs.Sound.stop();
                createjs.Sound.play("button2");
                currentScene = new scenes.Splash();
                break;
            case scenes.State.START:
                createjs.Sound.stop();
                createjs.Sound.play("menu", { volume: 0.2, loop: -1 });
                currentScene = new scenes.Start();
                break;
            case scenes.State.INSTRUCTIONS:
                // createjs.Sound.stop();
                // createjs.Sound.play("menu", { volume: 0.2, loop: -1 });
                currentScene = new scenes.Instructions();
                break;
            case scenes.State.MOVE_INSTRUCTION:
                // createjs.Sound.stop();
                // createjs.Sound.play("menu", { volume: 0.2, loop: -1 });
                MoveInstruction = new scenes.MoveInstruction();
                currentScene = MoveInstruction;
                break;
            case scenes.State.SHOOT_INSTRUCTION:
                // createjs.Sound.stop();
                // createjs.Sound.play("menu", { volume: 0.2, loop: -1 });
                ShootInstruction = new scenes.ShootInstruction();
                currentScene = ShootInstruction;
                break;
            case scenes.State.FIRST:
                createjs.Sound.stop();
                createjs.Sound.play("play1", { volume: 0.05, loop: -1 });
                // createjs.Sound.play("beast", { volume: 0.05, loop: -1 });
                FirstScene = new scenes.First();
                currentScene = FirstScene;
                break;
            case scenes.State.STAGE_CLEANED:
                createjs.Sound.stop();
                createjs.Sound.play("stage-cleaned", { volume: 0.5 });
                currentScene = new scenes.StageCleaned();
                break;
            case scenes.State.SECOND:
                createjs.Sound.stop();
                createjs.Sound.play("play2", { volume: 0.1, loop: -1 });
                // createjs.Sound.play("beast", { volume: 0.05, loop: -1 });
                SecondScene = new scenes.Second();
                currentScene = SecondScene;
                break;
            case scenes.State.STAGE_CLEANEDAGAIN:
                createjs.Sound.stop();
                createjs.Sound.play("stage-cleaned", { volume: 0.5 });
                currentScene = new scenes.StageCleanedAgain();
                break;
            case scenes.State.THIRD:
                createjs.Sound.stop();
                // createjs.Sound.play("play3", { volume: 0.1, loop: -1 });
                createjs.Sound.play("beast", { volume: 0.05, loop: -1 });
                ThirdScene = new scenes.Third();
                currentScene = ThirdScene;
                break;
            case scenes.State.END:
                createjs.Sound.stop();
                createjs.Sound.play("game-over", { volume: 0.3 });
                currentScene = new scenes.End();
                break;
        }
        stage.addChild(currentScene);
        currentSceneState = util.GameConfig.SCENE_STATE;
    }
    window.addEventListener("keyup", (event) => {
        // move instruction scene
        if (MoveInstruction && MoveInstruction.keyPressedStates) {
            MoveInstruction.keyPressedStates[event.keyCode] = false;
        }
        // shoot instruction scene
        if (ShootInstruction && ShootInstruction.keyPressedStates) {
            ShootInstruction.keyPressedStates[event.keyCode] = false;
        }
        // first scene
        if (FirstScene && FirstScene.keyPressedStates) {
            FirstScene.keyPressedStates[event.keyCode] = false;
        }
        // second scene
        if (SecondScene && SecondScene.keyPressedStates) {
            SecondScene.keyPressedStates[event.keyCode] = false;
        }
        // third scene
        if (ThirdScene && ThirdScene.keyPressedStates) {
            ThirdScene.keyPressedStates[event.keyCode] = false;
        }
    });
    // attach keydown and keyup event to the window
    window.addEventListener("keydown", (event) => {
        // move instruction scene
        if (MoveInstruction && MoveInstruction.keyPressedStates) {
            MoveInstruction.keyPressedStates[event.keyCode] = true;
        }
        // shoot instruction scene
        if (ShootInstruction && ShootInstruction.keyPressedStates) {
            ShootInstruction.keyPressedStates[event.keyCode] = true;
            ShootInstruction.detectShootingEvent();
        }
        // first scene
        if (FirstScene && FirstScene.keyPressedStates) {
            FirstScene.keyPressedStates[event.keyCode] = true;
            FirstScene.detectShootingEvent();
        }
        // second scene
        if (SecondScene && SecondScene.keyPressedStates) {
            SecondScene.keyPressedStates[event.keyCode] = true;
            SecondScene.detectShootingEvent();
        }
        // third scene
        if (ThirdScene && ThirdScene.keyPressedStates) {
            ThirdScene.keyPressedStates[event.keyCode] = true;
            ThirdScene.detectShootingEvent();
        }
    });
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map