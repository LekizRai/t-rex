import Text from '../../../engine/base-classes/Text'
import Vector2D from '../../../engine/utils/Vector2D'
import sprite from '../../../engine/utils/sprites'

class HighScore extends Text {
    constructor() {
        super(new Vector2D(985, 260))
        this.setContent('00000')
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {}

    public reload(): void {
        const newContent = window.localStorage.getItem('high_score')
        if (newContent) {
            this.setContent(newContent)
        } else {
            this.setContent('00000')
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
