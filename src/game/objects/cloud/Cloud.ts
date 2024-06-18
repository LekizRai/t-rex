// Image class for all

import Drawer from '../../../engine/utils/Drawer'
import { Coor2D, Coor3D, SpriteClip, TexInfo } from '../../../engine/types/general'
import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Figure from '../../../engine/base-classes/Figure'
import SceneManager from '../../../engine/controllers/SceneManager'

class Cloud extends Figure {
    private scene: SceneManager
    constructor(scene: SceneManager, canvasLocation: Coor2D) {
        super(
            sprite.CLOUD_SPRITE.clip,
            canvasLocation,
            config.CLOUD_VELOCITY_X,
            config.CLOUD_VELOCITY_Y
        )
        this.scene = scene
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {
        let shift = Math.floor((timeInterval / 1000) * config.CLOUD_VELOCITY_X)
        this.canvasLocation.x -= shift
        if (this.canvasLocation.x + this.getDisplayWidth() < 0) {
            this.scene.removeObject(this)
        }
    }
}

export default Cloud
