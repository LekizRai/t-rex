import GameManager from '../engine/GameManager'
import InputHandler from '../engine/controllers/InputHandler'
import TRexSceneManager from './TRexSceneManager'

class TRexGameManager extends GameManager {
    constructor() {
        super()
    }

    public setup(): void {
        this.scene = new TRexSceneManager()
        this.scene.setup()

        this.inputHandler = new InputHandler(this.scene)
        this.inputHandler.addEventListener("keydown")
        this.inputHandler.addEventListener("keyup")
    }
}

export default TRexGameManager
