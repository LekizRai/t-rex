import Text from '../../../engine/objects/Text'
import Message from '../../../engine/controllers/Message'
import Vector2D from '../../../engine/types/Vector2D'
import sprite from '../../utils/sprites'

class HI extends Text {
    constructor() {
        super(new Vector2D(750, 182))
        this.setTex(this.resourceManager.getTex(0))
        this.setContent('HI')
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {}

    protected contentToSpriteList(): void {
        this.spriteList.length = 0
        this.spriteList.push(sprite.HI_SPRITE.clip)
    }
}

export default HI
