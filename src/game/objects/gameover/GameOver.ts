import Text from '../../../engine/base-classes/Text'
import config from '../../../engine/utils/configs'
import sprite from '../../../engine/utils/sprites'

class GameOver extends Text {
    constructor() {
        super(0, 0)
        this.canvasLocation = { x: 550, y: 250 }
        this.setContent('GAMEOVER')
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {}

    protected contentToSpriteList(): void {
        this.spriteList.length = 0
        this.spriteList.push(sprite.GAMEOVER_SPRITE.clip)
    }
}

export default GameOver
