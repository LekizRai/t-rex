import GameObjectManager from '../../../engine/objects/base-classes/GameObjectManager'
import Scene from '../../../engine/scene/Scene'
import Vector2D from '../../../engine/types/Vector2D'
import config from '../../utils/configs'
import utils from '../../../engine/utils/utils'
import Cloud from './Cloud'

class CloudManager extends GameObjectManager {
    constructor(scene: Scene) {
        super(scene)
    }

    public spawn(): void {
        const newY: number = utils.randomInt(config.CLOUD_LOW_Y, config.CLOUD_HIGH_Y)
        const newLocation: Vector2D = config.CLOUD_CANVAS_LOCATION.copy()
        newLocation.setY(newY)
        this.scene.addObject(new Cloud(newLocation))
    }
}

export default CloudManager
