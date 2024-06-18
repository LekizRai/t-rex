import { Coor2D, SpriteClip, TexInfo } from '../../../engine/types/general'
import sprite from '../../../engine/utils/sprites'
import Drawer from '../../../engine/utils/Drawer'
import config from '../../../engine/utils/configs'
import Figure from '../../../engine/base-classes/Figure'
import CurrentScore from './CurrentScore'
import HighScore from './HighScore'
import HI from './HI'
import GameObject from '../../../engine/base-classes/GameObject'
// import Text from '../../../engine/base-classes/Text'

class ScoreBoard extends GameObject {
    private highPoint: HighScore
    private currentPoint: CurrentScore
    private HI: HI

    constructor(canvasLocation: Coor2D) {
        super()
        this.highPoint = new HighScore()
        this.currentPoint = new CurrentScore()
        this.HI = new HI()
    }

    public handleInput(e: Event): void {}

    update(timeInterval: number): void {
        this.highPoint.update(timeInterval)
        this.currentPoint.update(timeInterval)
        this.HI.update(timeInterval)
        this.updateHighScore()
    }

    draw(drawer: Drawer): void {
        this.highPoint.draw(drawer)
        this.currentPoint.draw(drawer)
        this.HI.draw(drawer)
    }

    public reload(): void {
        this.highPoint.reload()
        this.currentPoint.reload()
    }

    public updateHighScore(): void {
        if (Number(this.highPoint.getContent()) < Number(this.currentPoint.getContent())) {
            window.localStorage.setItem('high_score', this.currentPoint.getContent())
        }
    }
}

export default ScoreBoard
