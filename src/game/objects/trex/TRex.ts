import { SpriteClip } from '../../../engine/types/general'
import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import GameObjectState from '../../../engine/base-classes/GameObjectState'
import TRexState from './TRexState'
import Animation from '../../../engine/base-classes/Animation'
import Collider from '../../../engine/components/Collider'
import RigidBody from '../../../engine/components/RigidBody'
import PhysicsManager from '../../../engine/controllers/PhysicsManager'
import Vector2D from '../../../engine/utils/Vector2D'

const trexRunningSpriteList = [sprite.TREX_SPRITES[0].clip, sprite.TREX_SPRITES[1].clip]

class TRex extends Animation {
    private state: GameObjectState
    private physicsManager: PhysicsManager

    constructor(physicsManager: PhysicsManager, location: Vector2D) {
        super(location, config.TREX_CHANGING_INTERVAL, trexRunningSpriteList)

        this.physicsManager = physicsManager

        this.setColliderList(
            [new Collider(new Vector2D(0, 0), this.getWidth(), this.getHeight())]
        )
        this.setRigidBody(new RigidBody(config.TREX_VELOCITY_X, config.TREX_VELOCITY_Y, 0))
        this.rigidBody.setAccelerationEffect(false)
        this.physicsManager.addRigidBodyList(this.rigidBody)

        this.state = new TRexState.TRexRunningState()
    }

    handleInput(e: Event): void {
        this.state.handleInput(this, e)
    }

    update(timeInterval: number): void {
        this.state.update(this, timeInterval)
    }

    setDisplayLocation(location: Vector2D): void {
        this.location = location
    }

    setState(state: GameObjectState): void {
        this.state = state
    }

    getVelocityX(): number {
        return this.rigidBody.getVelocityX()
    }

    setVelocityX(velocityX: number): void {
        this.rigidBody.setVelocityX(velocityX)
    }

    getVelocityY(): number {
        return this.rigidBody.getVelocityY()
    }

    setVelocityY(velocityY: number): void {
        this.rigidBody.setVelocityY(velocityY)
    }

    getShiftX(): number {
        return this.rigidBody.getShiftX()
    }

    getShiftY(): number {
        return this.rigidBody.getShiftY()
    }

    getSprite(): SpriteClip {
        return this.getCurrentSprite()
    }

    setAccelerationEffect(status: boolean): void {
        this.rigidBody.setAccelerationEffect(status)
    }
}

export default TRex
