import { Coor2D, Coor3D, SpriteClip, TexInfo } from '../../../engine/types/general'
import Drawer from '../../../engine/utils/Drawer'
import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import GameObjectState from '../../../engine/base-classes/GameObjectState'
import TRexState from './TRexState'
import Figure from '../../../engine/base-classes/Figure'

class TRex extends Figure {
    private state: GameObjectState

    constructor(canvasLocation: Coor2D) {
        super(
            sprite.TREX_SPRITES[0].clip,
            canvasLocation,
            config.TREX_VELOCITY_X,
            config.TREX_VELOCITY_Y
        )
        this.locationAdjust = sprite.TREX_SPRITES[0].adjust
        this.changingTimeLeft = config.TREX_CHANGING_INTERVAL

        this.state = new TRexState.TRexRunningState()
    }

    handleInput(e: Event): void {
        console.log(12)
        this.state.handleInput(this, e)
    }

    update(timeInterval: number): void {
        this.state.update(this, timeInterval)
    }

    setDisplayLocation(location: Coor2D): void {
        this.canvasLocation = location
    }

    getChangingTimeLeft(): number {
        return this.changingTimeLeft
    }

    setChangingTimeLeft(timeInterval: number): void {
        this.changingTimeLeft = timeInterval
    }

    setState(state: GameObjectState): void {
        this.state = state
    }

    getVelocityX(): number {
        return this.velocityX
    }

    setVelocityX(velocityX: number): void {
        this.velocityX = velocityX
    }

    getVelocityY(): number {
        return this.velocityY
    }

    setVelocityY(velocityY: number): void {
        this.velocityY = velocityY
    }

    getSprite(): SpriteClip {
        return this.sprite
    }

    setSprite(sprite: SpriteClip): void {
        this.sprite = sprite
    }

    getLocationAdjust(): Coor2D {
        return this.locationAdjust
    }

    setLocationAdjust(locationAdjust: Coor2D): void {
        this.locationAdjust = locationAdjust
    }
}

export default TRex
