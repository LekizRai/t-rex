import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Image from '../../../engine/base-classes/Image'
import SceneManager from '../../../engine/controllers/SceneManager'
import Vector2D from '../../../engine/utils/Vector2D'
import Scene from '../../../engine/base-classes/Scene'

class Ground extends Image {
    constructor(location: Vector2D) {
        super(location, sprite.GROUND_SPRITE.clip)
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {
        let shift = Math.floor((timeInterval / 1000) * config.GROUND_VELOCITY_X)
        this.location.setX(this.location.getX() - shift)
        if (this.location.getX() + this.getWidth() < 0) {
            let newLocation = new Vector2D(
                this.location.getX() + this.getWidth() * 3,
                this.location.getY()
            )
            this.sceneManager.addObjectToScene(new Ground(newLocation))
            this.sceneManager.removeObjectFromScene(this)
        }
    }
}

export default Ground
