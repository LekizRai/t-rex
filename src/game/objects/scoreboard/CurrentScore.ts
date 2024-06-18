import Text from '../../../engine/base-classes/Text'
import config from '../../../engine/utils/configs'
import sprite from '../../../engine/utils/sprites'

class CurrentScore extends Text {
    private changingInterval: number

    constructor() {
        super(0, 0)
        this.canvasLocation = {x: 1080, y: 260}
        this.setContent('00000')
        this.changingInterval = config.SCOREBOARD_SCORE_CHANGING_INTERVAL
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {
        if (this.changingInterval - timeInterval < 0) {
            this.changingInterval = config.SCOREBOARD_SCORE_CHANGING_INTERVAL
            let score: number = Number(this.getContent())
            // console.log(String(score))
            score += 1
            let newContent: string = ''
            let digit: number
            for (let i: number = 4; i > -1; i--) {
                digit = Math.floor(score / 10 ** i)
                score = score % 10 ** i
                newContent = newContent + String(digit)
            }
            this.setContent(newContent)
        }
        else {
            this.changingInterval -= timeInterval
        }
    }

    public reload(): void {
        this.setContent("00000")
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
