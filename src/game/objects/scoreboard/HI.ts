import Text from '../../../engine/base-classes/Text'
import Message from '../../../engine/controllers/Message'
import Vector2D from '../../../engine/utils/Vector2D'
import config from '../../../engine/utils/configs'
import sprite from '../../../engine/utils/sprites'

class HI extends Text {
    constructor() {
        super(new Vector2D(950, 260))
        this.tex = this.resourceManager.getTex(0)
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
