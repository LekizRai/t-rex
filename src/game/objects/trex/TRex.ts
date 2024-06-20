import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import TRexState from './TRexState'
import Animation from '../../../engine/base-classes/Animation'
import Collider from '../../../engine/components/Collider'
import RigidBody from '../../../engine/components/RigidBody'
import Vector2D from '../../../engine/utils/Vector2D'
import Message from '../../../engine/controllers/Message'

const trexRunningSpriteList = [sprite.TREX_SPRITES[0].clip, sprite.TREX_SPRITES[1].clip]
const trexRunningJumpingColliderList = [
    new Collider(new Vector2D(20, 0), 22, 12),
    new Collider(new Vector2D(10, 11), 27, 21),
    new Collider(new Vector2D(10, 32), 15, 12),
    new Collider(new Vector2D(0, 15), 12, 10),
    new Collider(new Vector2D(5, 25), 7, 10),
]

class TRex extends Animation {
    constructor(location: Vector2D) {
        super(location, config.TREX_CHANGING_INTERVAL, trexRunningSpriteList)
        this.tex = this.resourceManager.getTex(0)

        this.state = new TRexState.TRexRunningState()

        this.setColliderList(trexRunningJumpingColliderList)
        this.setRigidBody(new RigidBody(config.TREX_VELOCITY_X, config.TREX_VELOCITY_Y, 0))
    }

    handleInput(message: Message): void {
        this.state.handleInput(this, message)
    }

    update(timeInterval: number): void {
        this.state.update(this, timeInterval)
    }
}

export default TRex
