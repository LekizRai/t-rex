import GameManager from '../engine/GameManager'
import Scene from '../engine/base-classes/Scene'
import InputHandler from '../engine/controllers/InputHandler'
import PhysicsManager from '../engine/controllers/PhysicsManager'
import SceneManager from '../engine/controllers/SceneManager'
import config from '../engine/utils/configs'
import TRexScene from './TRexScene'

class TRexGameManager extends GameManager {
    constructor() {
        super()
    }

    public setup(): void {
        this.physicsManager = new PhysicsManager()
        this.physicsManager.setAccelerationX(0)
        this.physicsManager.setAccelerationY(config.TREX_JUMPING_ACCESSLATION)

        this.sceneManager = new SceneManager()
        let trexScene: Scene = new TRexScene(this.physicsManager)
        trexScene.setup()
        this.sceneManager.attachScene(trexScene)

        this.inputHandler = new InputHandler(this.sceneManager)
        this.inputHandler.addEventListener('keydown')
        this.inputHandler.addEventListener('keyup')
        this.inputHandler.addEventListener('mousedown')
        this.inputHandler.addEventListener('mouseup')
    }
}

export default TRexGameManager
