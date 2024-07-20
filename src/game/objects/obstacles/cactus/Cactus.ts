import utils from '../../../../engine/utils/utils'
import sprite from '../../../utils/sprites'
import config from '../../../utils/configs'
import Image from '../../../../engine/objects/Image'
import Collider from '../../../../engine/components/Collider'
import RigidBody from '../../../../engine/components/RigidBody'
import Vector2D from '../../../../engine/types/Vector2D'
import Message from '../../../../engine/controllers/Message'

const cactusCollidersList = [
    [
        new Collider(new Vector2D(1, 9), 10, 14),
        new Collider(new Vector2D(6, 5), 10, 10),
        new Collider(new Vector2D(6, 1), 6, 10),
    ],
    [
        new Collider(new Vector2D(1, 9), 10, 14),
        new Collider(new Vector2D(23, 5), 10, 10),
        new Collider(new Vector2D(6, 1), 22, 10),
    ],
    [
        new Collider(new Vector2D(1, 9), 10, 14),
        new Collider(new Vector2D(40, 5), 10, 10),
        new Collider(new Vector2D(6, 1), 39, 10),
    ],
    [
        new Collider(new Vector2D(1, 13), 10, 14),
        new Collider(new Vector2D(14, 11), 10, 10),
        new Collider(new Vector2D(9, 1), 7, 14),
    ],
    [
        new Collider(new Vector2D(1, 13), 10, 14),
        new Collider(new Vector2D(14, 11), 10, 10),
        new Collider(new Vector2D(9, 1), 7, 14),
    ],
    [
        new Collider(new Vector2D(1, 6), 10, 20),
        new Collider(new Vector2D(38, 12), 10, 20),
        new Collider(new Vector2D(9, 1), 32, 14),
    ],
    [
        new Collider(new Vector2D(1, 17), 10, 18),
        new Collider(new Vector2D(38, 12), 12, 20),
        new Collider(new Vector2D(7, 1), 35, 16),
    ],
]

class Cactus extends Image {
    constructor(location: Vector2D) {
        let index: number = utils.randomInt(0, 6)
        let newLocation = location.add(sprite.CACTUS_SPRITES[index].adjust)
        super(newLocation, sprite.CACTUS_SPRITES[index].clip)
        this.setTex(this.resourceManager.getTex(0))
        this.setColliderList(cactusCollidersList[index])
        this.setVelocityX(config.CACTUS_VELOCITY_X)
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        let shiftX = this.getShiftX()
        this.setX(this.getX() - shiftX)
    }
}

export default Cactus
