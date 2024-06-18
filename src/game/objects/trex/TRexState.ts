import config from '../../../engine/utils/configs'
import key from '../../../engine/utils/keys'
import sprite from '../../../engine/utils/sprites'
import utils from '../../../engine/utils/utils'
import GameObject from '../../../engine/base-classes/GameObject'
import GameObjectState from '../../../engine/base-classes/GameObjectState'
import TRex from './TRex'

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
                let location = Object.assign({}, config.TREX_CANVAS_LOCATION)
                location.x += sprite.TREX_SPRITES[2].adjust.x
                location.y += sprite.TREX_SPRITES[2].adjust.y
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
                    let location = Object.assign({}, config.TREX_CANVAS_LOCATION)
                    location.x += sprite.TREX_SPRITES[0].adjust.x
                    location.y += sprite.TREX_SPRITES[0].adjust.y
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

        let location = Object.assign({}, obj.getDisplayLocation())
        if (location.y - shiftY > 370 || location.y < 0) {
            location.y = 370
            obj.setSpriteList(trexRunningSpriteList)
            obj.setDisplayLocation(location)
            obj.setVelocityY(0)
            obj.setAccelerationEffect(false)
            obj.setState(new TRexRunningState())
        } else {
            location.y -= shiftY
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
