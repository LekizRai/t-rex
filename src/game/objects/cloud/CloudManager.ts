import GameObjectManager from '../../../engine/base-classes/GameObjectManager'
import SceneManager from '../../../engine/controllers/SceneManager'
import config from '../../../engine/utils/configs'
import Cloud from './Cloud'

class CloudManager extends GameObjectManager {
    constructor(scene: SceneManager) {
        super(scene)
    }

    public spawn(): void {
        this.scene.addObject(new Cloud(this.scene, config.CLOUD_CANVAS_LOCATION))
    }
}

export default CloudManager
