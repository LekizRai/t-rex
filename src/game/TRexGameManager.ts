import GameManager from '../engine/GameManager'
import InputHandler from '../engine/controllers/InputHandler'
import PhysicsManager from '../engine/controllers/PhysicsManager'
import config from '../engine/utils/configs'
import TRexSceneManager from './TRexSceneManager'

class TRexGameManager extends GameManager {
    constructor() {
        super()
    }

    public setup(): void {
        this.physicsManager = new PhysicsManager()
        this.physicsManager.setAccelerationX(0)
        this.physicsManager.setAccelerationY(config.TREX_JUMPING_ACCESSLATION)

        this.scene = new TRexSceneManager(this.physicsManager)
        this.scene.setup()

        this.inputHandler = new InputHandler(this.scene)
        this.inputHandler.addEventListener('keydown')
        this.inputHandler.addEventListener('keyup')
        this.inputHandler.addEventListener('mousedown')
        this.inputHandler.addEventListener('mouseup')
    }
}

export default TRexGameManager
