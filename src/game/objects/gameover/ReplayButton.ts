import Image from '../../../engine/base-classes/Image'
import Vector2D from '../../../engine/utils/Vector2D'
import sprite from '../../../engine/utils/sprites'

class ReplayButton extends Image {
    constructor(location: Vector2D) {
        super(location, sprite.PLAY_BUTTON_SPRITE.clip)
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {}
}

export default ReplayButton
