import SceneManager from '../../controllers/SceneManager'
import Scene from '../../scene/Scene'

abstract class GameObjectManager {
    protected sceneManager: SceneManager
    protected scene: Scene
    constructor(scene: Scene) {
        this.sceneManager = SceneManager.getInstance()
        this.scene = scene
    }

    public abstract spawn(): void
}

export default GameObjectManager
