import config from '../../utils/configs'
import CurrentScore from './CurrentScore'
import HighScore from './HighScore'
import HI from './HI'
import GameObject from '../../../engine/objects/base-classes/GameObject'
import Vector2D from '../../../engine/types/Vector2D'
import Message from '../../../engine/controllers/Message'

class ScoreBoard extends GameObject {
    private highPoint: HighScore
    private currentPoint: CurrentScore
    private HI: HI
    private isUpdated: boolean

    constructor(location: Vector2D, zIndex?: number) {
        if (zIndex) {
            super(location, zIndex)
        } else {
            super(location)
        }
        this.highPoint = new HighScore()
        this.currentPoint = new CurrentScore(config.SCOREBOARD_SCORE_CHANGING_INTERVAL)
        this.HI = new HI()
        this.isUpdated = true
    }

    public handleInput(message: Message): void {}

    public update(timeInterval: number): void {
        if (this.isUpdated) {
            this.highPoint.update(timeInterval)
            this.currentPoint.update(timeInterval)
            this.HI.update(timeInterval)
            this.updateHighScore()
        }
    }

    public render(): void {
        if (this.getIsRendered()) {
            this.highPoint.render()
            this.currentPoint.render()
            this.HI.render()
        }
    }

    public reload(): void {
        this.highPoint.reload()
        this.currentPoint.reload()
    }

    public setIsUpdated(status: boolean) {
        this.isUpdated = status
    }

    public updateHighScore(): void {
        if (Number(this.highPoint.getContent()) < Number(this.currentPoint.getContent())) {
            window.localStorage.setItem('high_score', this.currentPoint.getContent())
        }
    }
}

export default ScoreBoard
