import sprite from '../../utils/sprites'
import config from '../../utils/configs'
import Image from '../../../engine/objects/Image'
import Vector2D from '../../../engine/types/Vector2D'
import Message from '../../../engine/controllers/Message'

class Cloud extends Image {
    constructor(location: Vector2D) {
        super(location, sprite.CLOUD_SPRITE.clip)
        this.tex = this.resourceManager.getTex(0)
        this.setVelocityX(config.CLOUD_VELOCITY_X)
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        let shiftX = this.getShiftX()
        this.setX(this.getX() - shiftX)
        if (this.getX() + this.getWidth() < 0) {
            this.scene.removeObject(this)
            this.destroy()
        }
    }
}

export default Cloud
