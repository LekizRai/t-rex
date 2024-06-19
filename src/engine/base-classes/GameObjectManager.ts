import SceneManager from '../controllers/SceneManager'
import GameObject from './GameObject'
import Scene from './Scene'

abstract class GameObjectManager {
    protected sceneManager: SceneManager
    constructor() {
        this.sceneManager = SceneManager.getInstance()
    }

    public abstract spawn(): void
}

export default GameObjectManager
