import config from '../../utils/configs'
import key from '../../utils/keys'
import sprite from '../../utils/sprites'
import GameObject from '../../../engine/objects/base-classes/GameObject'
import GameObjectState from '../../../engine/objects/base-classes/GameObjectState'
import TRex from './TRex'
import Vector2D from '../../../engine/types/Vector2D'
import Message from '../../../engine/controllers/Message'
import Collider from '../../../engine/components/Collider'

const trexRunningSpriteList = [sprite.TREX_SPRITES[0].clip, sprite.TREX_SPRITES[1].clip]
const trexRunningAdjustList = [sprite.TREX_SPRITES[0].adjust, sprite.TREX_SPRITES[1].adjust]
const trexRunningJumpingColliderList = [
    new Collider(new Vector2D(20, 0), 22, 12),
    new Collider(new Vector2D(10, 11), 27, 21),
    new Collider(new Vector2D(10, 32), 15, 12),
    new Collider(new Vector2D(0, 15), 12, 10),
    new Collider(new Vector2D(5, 25), 7, 10),
]
const trexRunningJumpingCollidersList = [
    trexRunningJumpingColliderList,
    trexRunningJumpingColliderList,
]

const trexDuckingSpriteList = [sprite.TREX_SPRITES[2].clip, sprite.TREX_SPRITES[3].clip]
const trexDuckingAdjustList = [sprite.TREX_SPRITES[2].adjust, sprite.TREX_SPRITES[3].adjust]
const trexDuckingColliderList = [
    new Collider(new Vector2D(34, 2), 22, 16),
    new Collider(new Vector2D(11, 2), 23, 26),
    new Collider(new Vector2D(0, 0), 12, 16),
]
const trexDuckingCollidersList = [trexDuckingColliderList, trexDuckingColliderList]

const trexJumpingSpriteList = [sprite.TREX_SPRITES[4].clip]
const trexJumpingAdjustList = [sprite.TREX_SPRITES[4].adjust]

class TRexRunningState extends GameObjectState {
    constructor() {
        super()
    }

    public handleInput(obj: TRex, message: Message): void {
        const e = message.getEvent()
        if (e instanceof Event) {
            if (e instanceof KeyboardEvent && e.type == 'keydown') {
                if (e.keyCode == key.ARROW_DOWN) {
                    obj.setSpriteList(trexDuckingSpriteList)
                    obj.setState(new TRexDuckingState())
                    obj.setAdjustList(trexDuckingAdjustList)
                    obj.setCollidersList(trexDuckingCollidersList)
                } else if (e.keyCode == key.SPACE || e.keyCode == key.ARROW_UP) {
                    if (!e.repeat) {
                        obj.setSpriteList(trexJumpingSpriteList)
                        obj.setState(new TRexJumpingState())
                        obj.setVelocityY(config.TREX_JUMPING_VELOCITY)
                        obj.setAdjustList(trexJumpingAdjustList)
                        obj.setAccelerationEffect(true)
                    }
                }
            }
        } else if (e == 'gameover') {
            const location: Vector2D = config.TREX_CANVAS_LOCATION.add(
                sprite.TREX_SPRITES[5].adjust
            )
            obj.setLocation(location)
            obj.setState(new TRexDuckingState())
            obj.setAdjustList(trexDuckingAdjustList)
            obj.setCollidersList(trexDuckingCollidersList)
        }
    }

    public update(obj: TRex, timeInterval: number): void {
        obj.animate(timeInterval)
    }
}

class TRexDuckingState extends GameObjectState {
    constructor() {
        super()
    }

    public handleInput(obj: TRex, message: Message): void {
        const e = message.getEvent()
        if (e instanceof Event)
            if (e instanceof KeyboardEvent) {
                if (e.keyCode == key.ARROW_DOWN) {
                    if (e.type == 'keyup') {
                        obj.setSpriteList(trexRunningSpriteList)
                        obj.setState(new TRexRunningState())
                        obj.setAdjustList(trexRunningAdjustList)
                        obj.setCollidersList(trexRunningJumpingCollidersList)
                    }
                }
            }
    }

    public update(obj: TRex, timeInterval: number): void {
        obj.animate(timeInterval)
    }
}

class TRexJumpingState extends GameObjectState {
    constructor() {
        super()
    }
    public handleInput(obj: GameObject, message: Message): void {}

    public update(obj: TRex, timeInterval: number): void {
        obj.animate(timeInterval)

        let shiftY = obj.getShiftY()

        let location = obj.getLocation().copy()
        if (location.getY() - shiftY > 370 || location.getY() < 0) {
            location.setY(370)
            obj.setSpriteList(trexRunningSpriteList)
            obj.setLocation(location)
            obj.setVelocityY(0)
            obj.setAccelerationEffect(false)
            obj.setState(new TRexRunningState())
        } else {
            location.setY(location.getY() - shiftY)
            obj.setLocation(location)
        }
    }
}

class TRexGameOverState extends GameObjectState {
    constructor() {
        super()
    }

    public handleInput(obj: TRex, message: Message): void {}

    public update(obj: TRex, timeInterval: number): void {
        obj.animate(timeInterval)
    }
}

export default { TRexDuckingState, TRexGameOverState, TRexJumpingState, TRexRunningState }
