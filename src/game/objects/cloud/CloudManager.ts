import GameObjectManager from '../../../engine/base-classes/GameObjectManager'
import Scene from '../../../engine/base-classes/Scene'
import SceneManager from '../../../engine/controllers/SceneManager'
import config from '../../../engine/utils/configs'
import Cloud from './Cloud'

class CloudManager extends GameObjectManager {
    constructor() {
        super()
    }

    public spawn(): void {
        this.sceneManager.addObjectToScene(new Cloud(config.CLOUD_CANVAS_LOCATION))
    }
}

export default CloudManager
