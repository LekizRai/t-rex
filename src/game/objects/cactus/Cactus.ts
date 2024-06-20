import utils from '../../../engine/utils/utils'
import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Image from '../../../engine/base-classes/Image'
import Collider from '../../../engine/components/Collider'
import RigidBody from '../../../engine/components/RigidBody'
import Vector2D from '../../../engine/utils/Vector2D'
import Message from '../../../engine/controllers/Message'

class Cactus extends Image {
    constructor(location: Vector2D) {
        let index: number = utils.randomInt(0, 6)
        let newLocation = location.add(sprite.CACTUS_SPRITES[index].adjust)
        super(newLocation, sprite.CACTUS_SPRITES[index].clip)
        this.tex = this.resourceManager.getTex(0)
        this.setColliderList([new Collider(new Vector2D(0, 0), this.getWidth(), this.getHeight())])
        this.setRigidBody(new RigidBody(config.CACTUS_VELOCITY_X, config.CACTUS_VELOCITY_Y, 0))
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        let shiftX = this.rigidBody.getShiftX()
        this.location.setX(this.location.getX() - shiftX)
        if (this.location.getX() + this.getWidth() < 0) {
            this.sceneManager.removeObjectFromScene(this)
        }
    }
}

export default Cactus
