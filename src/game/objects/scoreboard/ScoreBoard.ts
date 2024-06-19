import Drawer from '../../../engine/utils/Drawer'
import config from '../../../engine/utils/configs'
import CurrentScore from './CurrentScore'
import HighScore from './HighScore'
import HI from './HI'
import GameObject from '../../../engine/base-classes/GameObject'
import Vector2D from '../../../engine/utils/Vector2D'

class ScoreBoard extends GameObject {
    private highPoint: HighScore
    private currentPoint: CurrentScore
    private HI: HI

    constructor(location: Vector2D) {
        super(location)
        this.highPoint = new HighScore()
        this.currentPoint = new CurrentScore(config.SCOREBOARD_SCORE_CHANGING_INTERVAL)
        this.HI = new HI()
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {
        this.highPoint.update(timeInterval)
        this.currentPoint.update(timeInterval)
        this.HI.update(timeInterval)
        this.updateHighScore()
    }

    public render(drawer: Drawer): void {
        this.highPoint.render(drawer)
        this.currentPoint.render(drawer)
        this.HI.render(drawer)
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
