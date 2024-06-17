import Drawer from '../../../engine/utils/Drawer'
import { Coor2D, TexInfo } from '../../../engine/types/general'
import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Figure from '../../../engine/base-classes/Figure'
import SceneManager from '../../../engine/controllers/SceneManager'

class Ground extends Figure {
    private scene: SceneManager

    constructor(scene: SceneManager, canvasLocation: Coor2D) {
        super(
            sprite.GROUND_SPRITE.clip,
            canvasLocation,
            config.GROUND_VELOCITY_X,
            config.GROUND_VELOCITY_Y
        )
        this.scene = scene
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {
        let shift = Math.floor((timeInterval / 1000) * this.velocityX)
        this.canvasLocation.x -= shift
        if (this.canvasLocation.x + this.getDisplayWidth() < 0) {
            let newLocation = Object.assign(
                {},
                {
                    x: this.canvasLocation.x + this.getDisplayWidth() * 3,
                    y: this.canvasLocation.y,
                }
            )
            this.scene.addObject(new Ground(this.scene, newLocation))
            this.scene.removeObject(this)
        }
    }
}

export default Ground
