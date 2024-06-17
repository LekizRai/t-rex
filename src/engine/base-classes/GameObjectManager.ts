import SceneManager from '../controllers/SceneManager'
import GameObject from './GameObject'

abstract class GameObjectManager {
    protected scene: SceneManager

    constructor(scene: SceneManager) {
        this.scene = scene
    }

    public abstract spawn(): void
}

export default GameObjectManager
