import Figure from '../../../engine/base-classes/Figure'
import Text from '../../../engine/base-classes/Text'
import { Coor2D } from '../../../engine/types/general'
import config from '../../../engine/utils/configs'
import sprite from '../../../engine/utils/sprites'

class ReplayButton extends Figure {
    constructor(canvasLocation: Coor2D) {
        super(
            sprite.PLAY_BUTTON_SPRITE.clip,
            canvasLocation,
            config.CACTUS_VELOCITY_X,
            config.CACTUS_VELOCITY_Y
        )
        this.canvasLocation = { x: 680, y: 300 }
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {}
}

export default ReplayButton
