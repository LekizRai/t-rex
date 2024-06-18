import Text from '../../../engine/base-classes/Text'
import Vector2D from '../../../engine/utils/Vector2D'
import config from '../../../engine/utils/configs'
import sprite from '../../../engine/utils/sprites'

class HI extends Text {
    constructor() {
        super(new Vector2D(950, 260))
        this.setContent('HI')
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {}

    protected contentToSpriteList(): void {
        this.spriteList.length = 0
        this.spriteList.push(sprite.HI_SPRITE.clip)
    }
}

export default HI
