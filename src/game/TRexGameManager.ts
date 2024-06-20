import GameManager from '../engine/GameManager'
import Scene from '../engine/base-classes/Scene'
import config from '../engine/utils/configs'
import GameoverScene from './scenes/GameoverScene'
import TRexScene from './scenes/TRexScene'

class TRexGameManager extends GameManager {
    constructor() {
        super()
    }

    protected setup(): void {
        this.resourceManager.loadImage('trex-sprites.png')
        this.resourceManager.loadImage('red-square.png')
        this.resourceManager.loadImage('small-red-square.png')

        this.physicsManager.setAccelerationX(0)
        this.physicsManager.setAccelerationY(config.TREX_JUMPING_ACCESSLATION)

        let trexScene: Scene = new TRexScene()
        let gameoverScene: Scene = new GameoverScene()
        gameoverScene.setActive(false)
        // trexScene.setup()
        this.sceneManager.addScene(trexScene)
        this.sceneManager.addScene(gameoverScene)

        this.inputHandler.addEventListener('keydown')
        this.inputHandler.addEventListener('keyup')
        this.inputHandler.addEventListener('mousedown')
        this.inputHandler.addEventListener('mouseup')
    }
}

export default TRexGameManager
