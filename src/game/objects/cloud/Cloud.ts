import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Image from '../../../engine/base-classes/Image'
import Vector2D from '../../../engine/utils/Vector2D'
import RigidBody from '../../../engine/components/RigidBody'
import Message from '../../../engine/controllers/Message'

class Cloud extends Image {
    constructor(location: Vector2D) {
        super(location, sprite.CLOUD_SPRITE.clip)
        this.tex = this.resourceManager.getTex(0)
        this.setRigidBody(new RigidBody(config.CLOUD_VELOCITY_X, config.TREX_VELOCITY_Y, 0))
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        let shiftX = this.rigidBody.getShiftX()
        this.location.setX(this.location.getX() - shiftX)
        if (this.location.getX() + this.getWidth() < 0) {
            this.scene.removeObject(this)
        }
    }
}

export default Cloud
