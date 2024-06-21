import sprite from '../../utils/sprites'
import config from '../../utils/configs'
import Image from '../../../engine/objects/Image'
import Vector2D from '../../../engine/types/Vector2D'
import Message from '../../../engine/controllers/Message'

class Ground extends Image {
    constructor(location: Vector2D) {
        super(location, sprite.GROUND_SPRITE.clip)
        this.tex = this.resourceManager.getTex(0)
        this.setVelocityX(config.GROUND_VELOCITY_X)
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        let shiftX: number = this.getShiftX()
        this.setX(this.getX() - shiftX)
        if (this.getX() + this.getWidth() < 0) {
            let newLocation = new Vector2D(
                this.getX() + this.getWidth() * 3,
                this.getY()
            )
            this.scene.addObject(new Ground(newLocation))
            this.scene.removeObject(this)
            this.destroy()
        }
    }
}

export default Ground
