import config from '../../../engine/utils/configs'
import key from '../../../engine/utils/keys'
import sprite from '../../../engine/utils/sprites'
import utils from '../../../engine/utils/utils'
import GameObject from '../../../engine/base-classes/GameObject'
import GameObjectState from '../../../engine/base-classes/GameObjectState'
import TRex from './TRex'

class TRexRunningState extends GameObjectState {
    private isFirstRunningFrame: boolean

    constructor() {
        super()
        this.isFirstRunningFrame = true
    }

    public handleInput(obj: TRex, e: Event): void {
        if (e instanceof KeyboardEvent && e.type == 'keydown') {
            if (e.keyCode == key.ARROW_DOWN) {
                obj.setState(new TRexDuckingState())
            } else if (e.keyCode == key.SPACE || e.keyCode == key.ARROW_UP) {
                if (!e.repeat) {
                    obj.setState(new TRexJumpingState())
                    obj.setVelocityY(config.TREX_JUMPING_VELOCITY)
                }
            }
        }
    }

    public update(obj: TRex, timeInterval: number): void {
        if (this.isFirstRunningFrame) {
            obj.setSprite(sprite.TREX_SPRITES[0].clip)
            obj.setLocationAdjust(sprite.TREX_SPRITES[0].adjust)
        } else {
            obj.setSprite(sprite.TREX_SPRITES[1].clip)
            obj.setLocationAdjust(sprite.TREX_SPRITES[1].adjust)
        }

        let changingTimeLeft = obj.getChangingTimeLeft()
        if (changingTimeLeft - timeInterval < 0) {
            this.isFirstRunningFrame = !this.isFirstRunningFrame
            obj.setChangingTimeLeft(config.TREX_CHANGING_INTERVAL)
        } else {
            obj.setChangingTimeLeft(changingTimeLeft - timeInterval)
        }
    }
}

class TRexDuckingState extends GameObjectState {
    private isFirstDuckingFrame: boolean

    constructor() {
        super()
        this.isFirstDuckingFrame = true
    }

    public handleInput(obj: TRex, e: Event): void {
        if (e instanceof KeyboardEvent) {
            if (e.keyCode == key.ARROW_DOWN) {
                if (e.type == 'keyup') {
                    obj.setState(new TRexRunningState())
                }
            }
        }
    }

    public update(obj: TRex, timeInterval: number): void {
        if (this.isFirstDuckingFrame) {
            obj.setSprite(sprite.TREX_SPRITES[2].clip)
            obj.setLocationAdjust(sprite.TREX_SPRITES[2].adjust)
        } else {
            obj.setSprite(sprite.TREX_SPRITES[3].clip)
            obj.setLocationAdjust(sprite.TREX_SPRITES[3].adjust)
        }

        let changingTimeLeft = obj.getChangingTimeLeft()
        if (changingTimeLeft - timeInterval < 0) {
            this.isFirstDuckingFrame = !this.isFirstDuckingFrame
            obj.setChangingTimeLeft(config.TREX_CHANGING_INTERVAL)
        } else {
            obj.setChangingTimeLeft(changingTimeLeft - timeInterval)
        }
    }
}

class TRexJumpingState extends GameObjectState {
    constructor() {
        super()
    }
    public handleInput(obj: GameObject, e: Event): void {}

    public update(obj: TRex, timeInterval: number): void {
        obj.setSprite(sprite.TREX_SPRITES[4].clip)
        obj.setLocationAdjust(sprite.TREX_SPRITES[4].adjust)

        let shift = utils.calcShift(
            obj.getVelocityY(),
            config.TREX_JUMPING_ACCESSLATION,
            timeInterval
        )
        let location = Object.assign({}, obj.getDisplayLocation())
        if (location.y - shift > 370) {
            location.y = 370
            obj.setDisplayLocation(location)
            obj.setVelocityY(0)
            obj.setState(new TRexRunningState())
        } else {
            location.y -= shift
            obj.setDisplayLocation(location)
            obj.setVelocityY(
                utils.calcVelocity(
                    obj.getVelocityY(),
                    config.TREX_JUMPING_ACCESSLATION,
                    timeInterval
                )
            )
        }
    }
}

class TRexGameOverState extends GameObjectState {
    private isFirstBlinkingFrame: boolean
    constructor() {
        super()
        this.isFirstBlinkingFrame = true
    }

    public handleInput(obj: TRex, e: Event): void {}

    public update(obj: TRex, timeInterval: number): void {
        if (this.isFirstBlinkingFrame) {
            obj.setSprite(sprite.TREX_SPRITES[5].clip)
            obj.setLocationAdjust(sprite.TREX_SPRITES[5].adjust)
        } else {
            obj.setSprite(sprite.TREX_SPRITES[6].clip)
            obj.setLocationAdjust(sprite.TREX_SPRITES[6].adjust)
        }

        let changingTimeLeft = obj.getChangingTimeLeft()
        if (changingTimeLeft - timeInterval < 0) {
            this.isFirstBlinkingFrame = !this.isFirstBlinkingFrame
            obj.setChangingTimeLeft(config.TREX_CHANGING_INTERVAL)
        } else {
            obj.setChangingTimeLeft(changingTimeLeft - timeInterval)
        }
    }
}

export default { TRexDuckingState, TRexGameOverState, TRexJumpingState, TRexRunningState }
