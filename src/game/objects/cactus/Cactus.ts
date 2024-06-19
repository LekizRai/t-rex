import utils from '../../../engine/utils/utils'
import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Image from '../../../engine/base-classes/Image'
import SceneManager from '../../../engine/controllers/SceneManager'
import Collider from '../../../engine/components/Collider'
import RigidBody from '../../../engine/components/RigidBody'
import Vector2D from '../../../engine/utils/Vector2D'
import Scene from '../../../engine/base-classes/Scene'

class Cactus extends Image {
    private scene: Scene

    constructor(scene: Scene, location: Vector2D) {
        let index: number = utils.randomInt(0, 6)
        let newLocation = location.add(sprite.CACTUS_SPRITES[index].adjust)
        super(newLocation, sprite.CACTUS_SPRITES[index].clip)
        this.setColliderList([new Collider(new Vector2D(0, 0), this.getWidth(), this.getHeight())])
        this.setRigidBody(new RigidBody(config.CACTUS_VELOCITY_X, config.CACTUS_VELOCITY_Y, 0))
        this.scene = scene
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {
        let shift = Math.floor((timeInterval / 1000) * config.CACTUS_VELOCITY_X)
        this.location.setX(this.location.getX() - shift)
        if (this.location.getX() + this.getWidth() < 0) {
            this.scene.removeObject(this)
        }
    }
}

export default Cactus
