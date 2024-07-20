import Text from '../../../engine/objects/Text'
import Message from '../../../engine/controllers/Message'
import Vector2D from '../../../engine/types/Vector2D'
import sprite from '../../utils/sprites'

class HighScore extends Text {
    constructor() {
        super(new Vector2D(785, 182))
        this.setTex(this.resourceManager.getTex(0))
        this.setContent('00000')
        window.localStorage.setItem('high_score', this.getContent())
    }

    public handleInput(message: Message): void {}

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
