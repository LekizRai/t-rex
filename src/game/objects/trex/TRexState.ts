import config from '../../../engine/utils/configs'
import key from '../../../engine/utils/keys'
import sprite from '../../../engine/utils/sprites'
import GameObject from '../../../engine/base-classes/GameObject'
import GameObjectState from '../../../engine/base-classes/GameObjectState'
import TRex from './TRex'
import Vector2D from '../../../engine/utils/Vector2D'

const trexRunningSpriteList = [sprite.TREX_SPRITES[0].clip, sprite.TREX_SPRITES[1].clip]
const trexDuckingSpriteList = [sprite.TREX_SPRITES[2].clip, sprite.TREX_SPRITES[3].clip]
const trexJumpingSpriteList = [sprite.TREX_SPRITES[4].clip]

class TRexRunningState extends GameObjectState {
    constructor() {
        super()
    }

    public handleInput(obj: TRex, e: Event): void {
        if (e instanceof KeyboardEvent && e.type == 'keydown') {
            if (e.keyCode == key.ARROW_DOWN) {
                obj.setSpriteList(trexDuckingSpriteList)
                let location: Vector2D = config.TREX_CANVAS_LOCATION.add(sprite.TREX_SPRITES[2].adjust)
                obj.setDisplayLocation(location)
                obj.setState(new TRexDuckingState())
            } else if (e.keyCode == key.SPACE || e.keyCode == key.ARROW_UP) {
                if (!e.repeat) {
                    obj.setSpriteList(trexJumpingSpriteList)
                    obj.setState(new TRexJumpingState())
                    obj.setVelocityY(config.TREX_JUMPING_VELOCITY)
                    obj.setAccelerationEffect(true)
                }
            }
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

    public handleInput(obj: TRex, e: Event): void {
        if (e instanceof KeyboardEvent) {
            if (e.keyCode == key.ARROW_DOWN) {
                if (e.type == 'keyup') {
                    obj.setSpriteList(trexRunningSpriteList)
                    let location: Vector2D = config.TREX_CANVAS_LOCATION.add(sprite.TREX_SPRITES[0].adjust)
                    obj.setDisplayLocation(location)
                    obj.setState(new TRexRunningState())
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
    public handleInput(obj: GameObject, e: Event): void {}

    public update(obj: TRex, timeInterval: number): void {
        obj.animate(timeInterval)

        let shiftY = obj.getShiftY()

        let location = obj.getLocation().copy()
        if (location.getY() - shiftY > 370 || location.getY() < 0) {
            location.setY(370)
            obj.setSpriteList(trexRunningSpriteList)
            obj.setDisplayLocation(location)
            obj.setVelocityY(0)
            obj.setAccelerationEffect(false)
            obj.setState(new TRexRunningState())
        } else {
            location.setY(location.getY() - shiftY)
            obj.setDisplayLocation(location)
        }
    }
}

class TRexGameOverState extends GameObjectState {
    constructor() {
        super()
    }

    public handleInput(obj: TRex, e: Event): void {}

    public update(obj: TRex, timeInterval: number): void {
        obj.animate(timeInterval)
    }
}

export default { TRexDuckingState, TRexGameOverState, TRexJumpingState, TRexRunningState }
