import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Animation from '../../../engine/base-classes/Animation'
import Collider from '../../../engine/components/Collider'
import RigidBody from '../../../engine/components/RigidBody'
import Vector2D from '../../../engine/utils/Vector2D'
import Message from '../../../engine/controllers/Message'

const birdSpriteList = [sprite.BIRD_SPRITE[0].clip, sprite.BIRD_SPRITE[1].clip]
const birdAdjustList = [sprite.BIRD_SPRITE[0].adjust, sprite.BIRD_SPRITE[1].adjust]

class Bird extends Animation {
    constructor(location: Vector2D) {
        super(location, config.BIRD_CHANGING_INTERVAL, birdSpriteList, birdAdjustList)
        this.tex = this.resourceManager.getTex(0)
        this.setColliderList([new Collider(new Vector2D(0, 0), this.getWidth(), this.getHeight())])
        this.setRigidBody(new RigidBody(config.BIRD_VELOCITY_X, config.BIRD_VELOCITY_Y, 0))
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        this.animate(timeInterval)

        let shiftX = this.rigidBody.getShiftX()
        this.location.setX(this.location.getX() - shiftX)
        if (this.location.getX() + this.getWidth() < 0) {
            this.sceneManager.removeObjectFromScene(this)
        }
    }
}

export default Bird
