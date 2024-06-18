import Figure from '../../../engine/base-classes/Figure'
import Vector2D from '../../../engine/utils/Vector2D'
import config from '../../../engine/utils/configs'
import sprite from '../../../engine/utils/sprites'

class ReplayButton extends Figure {
    constructor(location: Vector2D) {
        super(location, sprite.PLAY_BUTTON_SPRITE.clip)
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {}
}

export default ReplayButton
