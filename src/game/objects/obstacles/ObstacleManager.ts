import GameObjectManager from '../../../engine/objects/base-classes/GameObjectManager'
import config from '../../utils/configs'
import Cactus from './cactus/Cactus'
import Bird from './bird/Bird'
import utils from '../../../engine/utils/utils'
import GameObject from '../../../engine/objects/base-classes/GameObject'

class ObstacleManager extends GameObjectManager {
    constructor() {
        super()
    }

    public spawn(): GameObject {
        let index: number = utils.randomInt(0, 9)
        if (index >= 8) {
            let status: number = utils.randomInt(0, 9)
            if (status <= 7) {
                return new Bird(config.BIRD_HIGH_CANVAS_LOCATION)
            } else {
                return new Bird(config.BIRD_LOW_CANVAS_LOCATION)
            }
        } else {
            return new Cactus(config.CACTUS_CANVAS_LOCATION)
        }
    }
}

export default ObstacleManager
