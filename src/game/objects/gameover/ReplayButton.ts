import Image from '../../../engine/objects/Image'
import Message from '../../../engine/controllers/Message'
import Vector2D from '../../../engine/types/Vector2D'
import sprite from '../../utils/sprites'
import Button from '../../../engine/objects/Button'
import { SpriteClip } from '../../../engine/types/general'

class ReplayButton extends Button {
    constructor(location: Vector2D, sprite: SpriteClip, zIndex?: number) {
        if (zIndex) {
        super(location, sprite, zIndex)
        }
        else {
            super(location, sprite)
        }
        this.setTex(this.resourceManager.getTex(0))
    }

    public update(timeInterval: number): void {}
}

export default ReplayButton
