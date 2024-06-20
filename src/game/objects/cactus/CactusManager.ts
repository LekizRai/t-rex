import GameObjectManager from '../../../engine/base-classes/GameObjectManager'
import Scene from '../../../engine/base-classes/Scene'
import SceneManager from '../../../engine/controllers/SceneManager'
import config from '../../../engine/utils/configs'
import Cactus from './Cactus'

class CactusManager extends GameObjectManager {
    constructor(scene: Scene) {
        super(scene)
    }

    public spawn(): void {
        this.scene.addObject(new Cactus(config.CACTUS_CANVAS_LOCATION))
    }
}

export default CactusManager
