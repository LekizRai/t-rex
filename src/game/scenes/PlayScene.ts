import Scene from '../../engine/scene/Scene'
import Message from '../../engine/controllers/Message'
import SceneManager from '../../engine/controllers/SceneManager'
import Vector2D from '../../engine/types/Vector2D'
import config from '../utils/configs'
import Bird from '../objects/obstacles/bird/Bird'
import Cactus from '../objects/obstacles/cactus/Cactus'
import Cloud from '../objects/cloud/Cloud'
import CloudManager from '../objects/cloud/CloudManager'
import Ground from '../objects/ground/Ground'
import ScoreBoard from '../objects/scoreboard/ScoreBoard'
import TRex from '../objects/trex/TRex'
import GameObject from '../../engine/objects/base-classes/GameObject'
import ObstacleManager from '../objects/obstacles/ObstacleManager'
import utils from '../../engine/utils/utils'

const state = {
    PLAY: 'play',
    GAMEOVER: 'gameover',
}

class PlayScene extends Scene {
    private gameVelocityX: number
private velocityChangingInterval: number
    private obstacleManager: ObstacleManager
    private obstacleGeneratingInterval: number

    private cloudManager: CloudManager
    private cloudGeneratingInterval: number

    private sceneState: string

    private trex: TRex
    private obstacleList: GameObject[]

    private scoreBoard: ScoreBoard

    constructor() {
        super()
        this.obstacleList = []
        this.velocityChangingInterval = config.VELOCITY_CHANGING_INTERVAL
        this.sceneState = state.PLAY
        this.gameVelocityX = config.GROUND_VELOCITY_X
    }

    public handleInput(message: Message) {}

    public update(timeInterval: number): void {
        if (this.sceneState == state.PLAY) {
            for (let i: number = 0; i < this.obstacleList.length; i++) {
                if (this.trex.isColliedWith(this.obstacleList[i])) {
                    this.sceneState = state.GAMEOVER
                    SceneManager.getInstance().setSceneStatus(1, true)
                    SceneManager.getInstance().reloadScene(1)
                    break
                }
            }
        }

        if (this.sceneState == state.PLAY) {
            this.objectList.forEach((obj) => {
                obj.update(timeInterval)
            })

            if (this.velocityChangingInterval - timeInterval < 0) {
                this.velocityChangingInterval = config.VELOCITY_CHANGING_INTERVAL
                // this.gameVelocityX += 1
                this.getObjectList().forEach((obj) => {
                    if (obj instanceof Cactus || obj instanceof Bird || obj instanceof Ground) {
                        obj.setVelocityX(this.gameVelocityX)
                    }
                })
            }
            else {
                this.velocityChangingInterval -= timeInterval
            }

            if (this.obstacleGeneratingInterval - timeInterval < 0) {
                let timeShift: number = utils.randomInt(-500, 500)
                this.obstacleGeneratingInterval = config.OBSTACLE_GENERATING_INTERVAL + timeShift
                const newObstacle: GameObject = this.obstacleManager.spawn()
                this.addObject(newObstacle)
                this.obstacleList.push(newObstacle)
            } else {
                this.obstacleGeneratingInterval -= timeInterval
            }

            if (this.cloudGeneratingInterval - timeInterval < 0) {
                this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL
                const newCloud: GameObject = this.cloudManager.spawn()
                this.addObject(newCloud)
            } else {
                this.cloudGeneratingInterval -= timeInterval
            }
        }
    }

    public reload(): void {
        this.sceneState = state.PLAY

        this.objectList.forEach((obj) => {
            if (!(obj instanceof TRex) && !(obj instanceof ScoreBoard)) {
                obj.destroy()
            }
        })
        this.objectList.length = 0

        this.obstacleList.length = 0

        this.obstacleGeneratingInterval = config.OBSTACLE_GENERATING_INTERVAL
        this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL

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
        this.obstacleManager = new ObstacleManager()
        this.obstacleGeneratingInterval = config.OBSTACLE_GENERATING_INTERVAL

        this.cloudManager = new CloudManager()
        this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL

        let location = config.GROUND_CANVAS_LOCATION
        let ground: Ground
        for (let i = 0; i < 3; i++) {
            ground = new Ground(location)
            this.addObject(ground)
            location = new Vector2D(location.getX() + ground.getWidth(), location.getY())
        }

        this.scoreBoard = new ScoreBoard(config.SCOREBOARD_CANVAS_LOCATION)
        this.addObject(this.scoreBoard)

        this.trex = new TRex(config.TREX_CANVAS_LOCATION, 1)
        this.addObject(this.trex)
        this.inputHandler.attachKeyboardEvent(this.trex)
    }
}

export default PlayScene
