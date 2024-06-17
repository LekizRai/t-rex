import { Coor2D, SpriteClip, TexInfo } from '../../../engine/types/general'
import sprite from '../../../engine/utils/sprites'
import Drawer from '../../../engine/utils/Drawer'
import config from '../../../engine/utils/configs'
import Figure from '../../../engine/base-classes/Figure'
// import Text from '../../../engine/base-classes/Text'

class ScoreBoard extends Figure {
    private highPoint: number
    private currentPoint: number

    constructor(canvasLocation: Coor2D) {
        super(sprite.HI_SPRITE.clip, canvasLocation, 0, 0)

        this.highPoint = 0
        this.currentPoint = 0

        this.changingTimeLeft = config.SCOREBOARD_SCORE_CHANGING_INTERVAL
    }

    public handleInput(e: Event): void {}

    update(timeInterval: number): void {
        if (this.changingTimeLeft - timeInterval < 0) {
            this.currentPoint += 1
            this.changingTimeLeft = config.SCOREBOARD_SCORE_CHANGING_INTERVAL
        } else {
            this.changingTimeLeft -= timeInterval
        }
    }

    draw(drawer: Drawer): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo(
                './assets/images/trex-sprites.png'
            ) as TexInfo
        }

        let position: number
        let gap: number

        drawer.draw(
            this.tex,
            this.sprite.coor.x,
            this.sprite.coor.y,
            this.sprite.width,
            this.sprite.height,
            this.canvasLocation.x,
            this.canvasLocation.y,
            this.sprite.width * this.sprite.scale,
            this.sprite.height * this.sprite.scale
        )

        position = 0
        gap = 30
        this.numberToSpriteList(this.highPoint).forEach((digitSprite) => {
            drawer.draw(
                this.tex,
                digitSprite.coor.x,
                digitSprite.coor.y,
                digitSprite.width,
                digitSprite.height,
                this.canvasLocation.x + position * 11 + gap,
                this.canvasLocation.y,
                digitSprite.width * digitSprite.scale,
                digitSprite.height * digitSprite.scale
            )
            position += 1
        })

        position = 0
        gap = 120
        this.numberToSpriteList(this.currentPoint).forEach((digitSprite) => {
            drawer.draw(
                this.tex,
                digitSprite.coor.x,
                digitSprite.coor.y,
                digitSprite.width,
                digitSprite.height,
                this.canvasLocation.x + position * 11 + gap,
                this.canvasLocation.y,
                digitSprite.width * digitSprite.scale,
                digitSprite.height * digitSprite.scale
            )
            position += 1
        })
    }

    numberToSpriteList(val: number): SpriteClip[] {
        let spriteList: SpriteClip[] = []
        let digit: number
        for (let i: number = 4; i > -1; i--) {
            digit = Math.floor(val / 10 ** i)
            val = val % 10 ** i
            spriteList.push(sprite.NUMBER_SPRITES[digit].clip)
        }
        return spriteList
    }
}

export default ScoreBoard
