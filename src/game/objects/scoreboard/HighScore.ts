import Text from '../../../engine/base-classes/Text'
import config from '../../../engine/utils/configs'
import sprite from '../../../engine/utils/sprites'

class HighScore extends Text {
    constructor() {
        super(0, 0)
        this.canvasLocation = { x: 985, y: 260 }
        this.setContent("00000")
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {}

    public reload(): void {
        const newContent = window.localStorage.getItem('high_score')
        console.log(newContent)
        if (newContent) {
            this.setContent(newContent)
        }
        else {
            this.setContent("00000")
        }
    }

    protected contentToSpriteList(): void {
        this.spriteList.length = 0
        for (let i: number = 0; i < this.content.length; i++) {
            this.spriteList.push(
                sprite.NUMBER_SPRITES[this.content[i] as keyof typeof sprite.NUMBER_SPRITES].clip
            )
        }
    }
}

export default HighScore
