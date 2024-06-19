import SceneManager from '../controllers/SceneManager'
import GameObject from './GameObject'
import Scene from './Scene'

abstract class GameObjectManager {
    protected scene: Scene

    constructor(scene: Scene) {
        this.scene = scene
    }

    public abstract spawn(): void
}

export default GameObjectManager
