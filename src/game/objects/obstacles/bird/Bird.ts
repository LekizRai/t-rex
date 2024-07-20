import sprite from '../../../utils/sprites'
import config from '../../../utils/configs'
import Animation from '../../../../engine/objects/Animation'
import Collider from '../../../../engine/components/Collider'
import Vector2D from '../../../../engine/types/Vector2D'
import Message from '../../../../engine/controllers/Message'

const birdSpriteList = [sprite.BIRD_SPRITE[0].clip, sprite.BIRD_SPRITE[1].clip]
const birdAdjustList = [sprite.BIRD_SPRITE[0].adjust, sprite.BIRD_SPRITE[1].adjust]
const birdCollidersList = [
    [
        new Collider(new Vector2D(0, 0), 18, 12),
        new Collider(new Vector2D(16, 12), 8, 20),
        new Collider(new Vector2D(24, 12), 18, 9),
    ],
    [
        new Collider(new Vector2D(0, 6), 18, 12),
        new Collider(new Vector2D(16, 0), 8, 20),
        new Collider(new Vector2D(24, 10), 8, 10),
        new Collider(new Vector2D(18, 20), 24, 8),
    ],
]

class Bird extends Animation {
    constructor(location: Vector2D) {
        super(location, config.BIRD_CHANGING_INTERVAL, birdSpriteList)
        this.setAdjustList(birdAdjustList)
        this.setCollidersList(birdCollidersList)
        this.setVelocityX(config.BIRD_VELOCITY_X)
        this.setTex(this.resourceManager.getTex(0))
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        this.animate(timeInterval)

        let shiftX = this.getShiftX()
        this.setX(this.getX() - shiftX)
    }
}

export default Bird
