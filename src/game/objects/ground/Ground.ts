import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Figure from '../../../engine/base-classes/Figure'
import SceneManager from '../../../engine/controllers/SceneManager'
import Vector2D from '../../../engine/utils/Vector2D'

class Ground extends Figure {
    private scene: SceneManager

    constructor(scene: SceneManager, location: Vector2D) {
        super(location, sprite.GROUND_SPRITE.clip)
        this.scene = scene
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
            this.scene.addObject(new Ground(this.scene, newLocation))
            this.scene.removeObject(this)
        }
    }
}

export default Ground
