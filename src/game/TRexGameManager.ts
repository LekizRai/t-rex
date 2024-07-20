import GameManager from '../engine/GameManager'
import Scene from '../engine/scene/Scene'
import config from './utils/configs'
import GameoverScene from './scenes/GameoverScene'
import PlayScene from './scenes/PlayScene'

class TRexGameManager extends GameManager {
    constructor() {
        super()
    }

    protected setup(): void {
        this.resourceManager.loadImage('trex-sprites.png')
        this.resourceManager.loadImage('small-red-square.png')

        this.physicsManager.setAccelerationX(0)
        this.physicsManager.setAccelerationY(config.TREX_JUMPING_ACCESSLATION)

        let playScene: Scene = new PlayScene()
        let gameoverScene: Scene = new GameoverScene()
        gameoverScene.stop()
        this.sceneManager.addScene(playScene)
        this.sceneManager.addScene(gameoverScene)
        this.sceneManager.setSceneWidth(1000)
        this.sceneManager.setSceneHeight(500)

        this.inputHandler.addEventListener('keydown')
        this.inputHandler.addEventListener('keyup')
        this.inputHandler.addEventListener('mousedown')
        this.inputHandler.addEventListener('mouseup')
    }
}

export default TRexGameManager
