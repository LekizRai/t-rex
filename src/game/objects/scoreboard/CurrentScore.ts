import Text from '../../../engine/objects/Text'
import Message from '../../../engine/controllers/Message'
import Vector2D from '../../../engine/types/Vector2D'
import config from '../../utils/configs'
import sprite from '../../utils/sprites'

class CurrentScore extends Text {
    private changingInterval: number

    constructor(changingInterval: number) {
        super(new Vector2D(880, 182))
        this.setTex(this.resourceManager.getTex(0))
        this.setContent('00000')
        this.changingInterval = changingInterval
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        if (this.changingInterval - timeInterval < 0) {
            this.changingInterval = config.SCOREBOARD_SCORE_CHANGING_INTERVAL
            let score: number = Number(this.getContent())
            score += 1
            let newContent: string = ''
            let digit: number
            for (let i: number = 4; i > -1; i--) {
                digit = Math.floor(score / 10 ** i)
                score = score % 10 ** i
                newContent = newContent + String(digit)
            }
            this.setContent(newContent)
        } else {
            this.changingInterval -= timeInterval
        }
    }

    public reload(): void {
        this.setContent('00000')
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

export default CurrentScore
