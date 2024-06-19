import Scene from '../engine/base-classes/Scene'
import PhysicsManager from '../engine/controllers/PhysicsManager'
import SceneManager from '../engine/controllers/SceneManager'
import Vector2D from '../engine/utils/Vector2D'
import config from '../engine/utils/configs'
import Cactus from './objects/cactus/Cactus'
import CactusManager from './objects/cactus/CactusManager'
import Cloud from './objects/cloud/Cloud'
import CloudManager from './objects/cloud/CloudManager'
import GameOver from './objects/gameover/GameOver'
import ReplayButton from './objects/gameover/ReplayButton'
import Ground from './objects/ground/Ground'
import ScoreBoard from './objects/scoreboard/ScoreBoard'
import TRex from './objects/trex/TRex'

// => clear full => resize canvas => viewport

const state = {
    PLAY: 'play',
    GAMEOVER: 'gameover',
    PAUSED: 'paused',
}

class TRexScene extends Scene {
    private cactusManager: CactusManager
    private cactusGeneratingInterval: number

    private cloudManager: CloudManager
    private cloudGeneratingInterval: number

    private sceneState: string

    private physicsManager: PhysicsManager
    private gameOver: GameOver
    private replayButton: ReplayButton
    private scoreBoard: ScoreBoard

    private mouseStatus: string

    constructor(physicsManager: PhysicsManager) {
        super()
        this.physicsManager = physicsManager
        this.sceneState = state.PLAY
        this.mouseStatus = 'down'
    }

    public handleInput(e: Event) {
        if (this.sceneState == state.PLAY) {
            this.objectList.forEach((obj) => {
                obj.handleInput(e)
            })
        } else if (this.sceneState == state.GAMEOVER) {
            if (e instanceof MouseEvent) {
                let location: Vector2D = this.replayButton.getLocation()
                if (e.x >= location.getX() && e.y >= location.getY()) {
                    if (
                        e.x <= location.getX() + this.replayButton.getWidth() &&
                        e.y <= location.getY() + this.replayButton.getHeight()
                    ) {
                        if (e.type == 'mousedown') {
                            if (this.mouseStatus == 'down') {
                                this.mouseStatus = 'up'
                            }
                        } else if (e.type == 'mouseup') {
                            if (this.mouseStatus == 'up') {
                                this.sceneState = state.PLAY
                                this.reload()
                            }
                        }
                    } else {
                        this.mouseStatus = 'down'
                    }
                } else {
                    this.mouseStatus = 'down'
                }
            }
        }
    }

    public update(timeInterval: number): void {
        if (this.sceneState == state.PLAY) {
            this.objectList.forEach((obj) => {
                obj.update(timeInterval)
            })

            if (this.cactusGeneratingInterval - timeInterval < 0) {
                this.cactusGeneratingInterval = config.CACTUS_GENERATING_INTERVAL
                this.cactusManager.spawn()
            } else {
                this.cactusGeneratingInterval -= timeInterval
            }

            if (this.cloudGeneratingInterval - timeInterval < 0) {
                this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL
                this.cloudManager.spawn()
            } else {
                this.cloudGeneratingInterval -= timeInterval
            }

            for (let i: number = 0; i < this.objectList.length; i++) {
                if (this.objectList[i] instanceof TRex) {
                    for (let j: number = 0; j < this.objectList.length; j++) {
                        if (this.objectList[j] instanceof Cactus) {
                            if (this.objectList[i].isCollied(this.objectList[j])) {
                                this.sceneState = state.GAMEOVER
                                this.addObject(this.gameOver)
                                this.addObject(this.replayButton)
                                break
                            }
                        }
                    }
                    break
                }
            }
        }
    }

    public reload(): void {
        this.objectList.length = 0
        this.cactusGeneratingInterval = config.CACTUS_GENERATING_INTERVAL
        this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL

        this.addObject(new Cactus(this, config.CACTUS_CANVAS_LOCATION))
        this.addObject(new Cloud(this, config.CLOUD_CANVAS_LOCATION))

        let location = config.GROUND_CANVAS_LOCATION.copy()
        let ground: Ground
        for (let i = 0; i < 3; i++) {
            ground = new Ground(this, location)
            this.addObject(ground)
            location = new Vector2D(location.getX() + ground.getWidth(), location.getY())
        }

        this.scoreBoard.reload()
        this.addObject(this.scoreBoard)
        this.addObject(new TRex(this.physicsManager, config.TREX_CANVAS_LOCATION))
    }

    public setup(): void {
        this.cactusManager = new CactusManager(this)
        this.cactusGeneratingInterval = config.CACTUS_GENERATING_INTERVAL

        this.cloudManager = new CloudManager(this)
        this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL

        this.gameOver = new GameOver()
        this.replayButton = new ReplayButton(new Vector2D(680, 300))
        this.scoreBoard = new ScoreBoard(config.SCOREBOARD_CANVAS_LOCATION)

        this.addObject(new Cactus(this, config.CACTUS_CANVAS_LOCATION))
        this.addObject(new Cloud(this, config.CLOUD_CANVAS_LOCATION))

        let location = config.GROUND_CANVAS_LOCATION
        let ground: Ground
        for (let i = 0; i < 3; i++) {
            ground = new Ground(this, location)
            this.addObject(ground)
            location = new Vector2D(location.getX() + ground.getWidth(), location.getY())
        }

        this.addObject(this.scoreBoard)
        this.addObject(new TRex(this.physicsManager, config.TREX_CANVAS_LOCATION))
    }
}

export default TRexScene
