import Scene from '../../engine/base-classes/Scene'
import Message from '../../engine/controllers/Message'
import PhysicsManager from '../../engine/controllers/PhysicsManager'
import SceneManager from '../../engine/controllers/SceneManager'
import Vector2D from '../../engine/utils/Vector2D'
import config from '../../engine/utils/configs'
import GameoverScene from './GameoverScene'
import Bird from '../objects/bird/Bird'
import Cactus from '../objects/cactus/Cactus'
import CactusManager from '../objects/cactus/CactusManager'
import Cloud from '../objects/cloud/Cloud'
import CloudManager from '../objects/cloud/CloudManager'
import GameOver from '../objects/gameover/GameOver'
import ReplayButton from '../objects/gameover/ReplayButton'
import Ground from '../objects/ground/Ground'
import ScoreBoard from '../objects/scoreboard/ScoreBoard'
import TRex from '../objects/trex/TRex'
import GameObject from '../../engine/base-classes/GameObject'

// => clear full => resize canvas => viewport

const state = {
    PLAY: 'play',
    GAMEOVER: 'gameover',
    PAUSED: 'paused',
}

class TRexScene extends Scene {
    private obstacleManager: CactusManager
    private obstacleGeneratingInterval: number

    private cloudManager: CloudManager
    private cloudGeneratingInterval: number

    private sceneState: string

    private trex: TRex
    private obstacleList: GameObject

    private scoreBoard: ScoreBoard

    constructor() {
        super()
        // this.cactusList = []
        this.sceneState = state.PLAY
    }

    public handleInput(message: Message) {}

    public update(timeInterval: number): void {
        if (this.sceneState == state.PLAY) {
            for (let i: number = 0; i < this.objectList.length; i++) {
                if (this.objectList[i] instanceof TRex) {
                    for (let j: number = 0; j < this.objectList.length; j++) {
                        if (
                            this.objectList[j] instanceof Cactus ||
                            this.objectList[j] instanceof Bird
                        ) {
                            if (this.objectList[i].isCollied(this.objectList[j])) {
                                this.sceneState = state.GAMEOVER
                                SceneManager.getInstance().setSceneStatus(1, true)
                                SceneManager.getInstance().reloadScene(1)
                                // this.isActive = false
                                break
                            }
                        }
                    }
                    break
                }
            }

            if (this.sceneState == state.PLAY) {
                this.objectList.forEach((obj) => {
                    obj.update(timeInterval)
                })

                if (this.obstacleGeneratingInterval - timeInterval < 0) {
                    this.obstacleGeneratingInterval = config.CACTUS_GENERATING_INTERVAL
                    this.obstacleManager.spawn()
                } else {
                    this.obstacleGeneratingInterval -= timeInterval
                }

                if (this.cloudGeneratingInterval - timeInterval < 0) {
                    this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL
                    this.cloudManager.spawn()
                } else {
                    this.cloudGeneratingInterval -= timeInterval
                }
            }
        }
    }

    public reload(): void {
        this.sceneState = state.PLAY

        this.objectList.length = 0

        this.obstacleGeneratingInterval = config.CACTUS_GENERATING_INTERVAL
        this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL

        this.addObject(new Cactus(config.CACTUS_CANVAS_LOCATION))
        this.addObject(new Cloud(config.CLOUD_CANVAS_LOCATION))

        let location = config.GROUND_CANVAS_LOCATION.copy()
        let ground: Ground
        for (let i = 0; i < 3; i++) {
            ground = new Ground(location)
            this.addObject(ground)
            location = new Vector2D(location.getX() + ground.getWidth(), location.getY())
        }

        this.scoreBoard.reload()
        this.addObject(this.scoreBoard)

        this.addObject(this.trex)
    }

    public setup(): void {
        this.obstacleManager = new CactusManager(this)
        this.obstacleGeneratingInterval = config.CACTUS_GENERATING_INTERVAL

        this.cloudManager = new CloudManager(this)
        this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL

        this.addObject(new Bird(config.BIRD_HIGH_CANVAS_LOCATION))
        this.addObject(new Cloud(config.CLOUD_CANVAS_LOCATION))

        let location = config.GROUND_CANVAS_LOCATION
        let ground: Ground
        for (let i = 0; i < 3; i++) {
            ground = new Ground(location)
            this.addObject(ground)
            location = new Vector2D(location.getX() + ground.getWidth(), location.getY())
        }

        this.scoreBoard = new ScoreBoard(config.SCOREBOARD_CANVAS_LOCATION)
        this.addObject(this.scoreBoard)

        this.trex = new TRex(config.TREX_CANVAS_LOCATION)
        this.addObject(this.trex)
        this.inputHandler.attachKeyboardEvent(this.trex)
    }
}

export default TRexScene
