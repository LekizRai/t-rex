import GameObjectManager from '../../../engine/objects/base-classes/GameObjectManager'
import Scene from '../../../engine/scene/Scene'
import config from '../../utils/configs'
import Cactus from './cactus/Cactus'
import Bird from './bird/Bird'
import utils from '../../../engine/utils/utils'

class ObstacleManager extends GameObjectManager {
    constructor(scene: Scene) {
        super(scene)
    }

    public spawn(): void {
        let index: number = utils.randomInt(0, 9)
        if (index >= 8) {
            let status: number = utils.randomInt(0, 9)
            if (status <= 7) {
                this.scene.addObject(new Bird(config.BIRD_HIGH_CANVAS_LOCATION))
            } else {
                this.scene.addObject(new Bird(config.BIRD_LOW_CANVAS_LOCATION))
            }
        } else {
            this.scene.addObject(new Cactus(config.CACTUS_CANVAS_LOCATION))
        }
    }
}

export default ObstacleManager
