import SceneManager from '../engine/controllers/SceneManager'
import config from '../engine/utils/configs'
import Cactus from './objects/cactus/Cactus'
import CactusManager from './objects/cactus/CactusManager'
import Cloud from './objects/cloud/Cloud'
import CloudManager from './objects/cloud/CloudManager'
import Ground from './objects/ground/Ground'
import ScoreBoard from './objects/scoreboard/ScoreBoard'
import TRex from './objects/trex/TRex'

// => clear full => resize canvas => viewport

class TRexSceneManager extends SceneManager {
    private cactusManager: CactusManager
    private cactusGeneratingInterval: number

    private cloudManager: CloudManager
    private cloudGeneratingInterval: number

    constructor() {
        super()
    }

    public handleInput(e: Event) {
        this.objectList.forEach((obj) => {
            obj.handleInput(e)
        })
    }

    public update(timeInterval: number): void {
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
    }

    public setup(): void {
        this.cactusManager = new CactusManager(this)
        this.cactusGeneratingInterval = config.CACTUS_GENERATING_INTERVAL

        this.cloudManager = new CloudManager(this)
        this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL

        this.addObject(new Cactus(this, config.CACTUS_CANVAS_LOCATION))
        this.addObject(new Cloud(this, config.CLOUD_CANVAS_LOCATION))

        let location = config.GROUND_CANVAS_LOCATION
        let ground: Ground
        for (let i = 0; i < 3; i++) {
            ground = new Ground(this, location)
            this.addObject(ground)
            location = { x: location.x + ground.getDisplayWidth(), y: location.y }
        }

        this.addObject(new ScoreBoard(config.SCOREBOARD_CANVAS_LOCATION))
        this.addObject(new TRex(config.TREX_CANVAS_LOCATION))
    }
}

export default TRexSceneManager
