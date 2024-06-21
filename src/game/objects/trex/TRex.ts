import sprite from '../../utils/sprites'
import config from '../../utils/configs'
import TRexState from './TRexState'
import Animation from '../../../engine/objects/Animation'
import Collider from '../../../engine/components/Collider'
import Vector2D from '../../../engine/types/Vector2D'
import Message from '../../../engine/controllers/Message'

const trexRunningSpriteList = [sprite.TREX_SPRITES[0].clip, sprite.TREX_SPRITES[1].clip]
const trexRunningAdjustList = [sprite.TREX_SPRITES[0].adjust, sprite.TREX_SPRITES[1].adjust]
const trexRunningJumpingColliderList = [
    new Collider(new Vector2D(20, 0), 22, 12),
    new Collider(new Vector2D(0, 11), 39, 13),
    new Collider(new Vector2D(4, 24), 27, 10),
    new Collider(new Vector2D(10, 34), 15, 10),
]
const trexRunningJumpingCollidersList = [
    trexRunningJumpingColliderList,
    trexRunningJumpingColliderList,
]

class TRex extends Animation {
    constructor(location: Vector2D, zIndex?: number) {
        if (zIndex) {
            super(location, config.TREX_CHANGING_INTERVAL, trexRunningSpriteList, zIndex)
        } else {
            super(location, config.TREX_CHANGING_INTERVAL, trexRunningSpriteList)
        }
        this.tex = this.resourceManager.getTex(0)

        this.setState(new TRexState.TRexRunningState())

        this.setAdjustList(trexRunningAdjustList)
        this.setCollidersList(trexRunningJumpingCollidersList)
    }

    handleInput(message: Message): void {
        this.handleInputState(message)
    }

    update(timeInterval: number): void {
        this.updateState(timeInterval)
    }
}

export default TRex
