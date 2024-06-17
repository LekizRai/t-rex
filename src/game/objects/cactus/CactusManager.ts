import GameObjectManager from '../../../engine/base-classes/GameObjectManager'
import SceneManager from '../../../engine/controllers/SceneManager'
import config from '../../../engine/utils/configs'
import Cactus from './Cactus'

class CactusManager extends GameObjectManager {
    constructor(scene: SceneManager) {
        super(scene)
    }

    public spawn(): void {
        this.scene.addObject(new Cactus(this.scene, config.CACTUS_CANVAS_LOCATION))
    }
}

export default CactusManager
