import GameObjectManager from '../../../engine/objects/base-classes/GameObjectManager'
import Vector2D from '../../../engine/types/Vector2D'
import config from '../../utils/configs'
import utils from '../../../engine/utils/utils'
import Cloud from './Cloud'
import GameObject from '../../../engine/objects/base-classes/GameObject'

class CloudManager extends GameObjectManager {
    constructor() {
        super()
    }

    public spawn(): GameObject {
        const newY: number = utils.randomInt(config.CLOUD_LOW_Y, config.CLOUD_HIGH_Y)
        const newLocation: Vector2D = config.CLOUD_CANVAS_LOCATION.copy()
        newLocation.setY(newY)
        return new Cloud(newLocation)
    }
}

export default CloudManager
