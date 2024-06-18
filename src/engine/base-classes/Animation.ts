import { Coor2D, SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/Drawer'
import config from '../utils/configs'
import GameObject from './GameObject'

abstract class Animation extends GameObject {
    private spriteList: SpriteClip[]
    private index: number
    private changingInterval: number
    private remainingInterval: number
    protected tex: TexInfo

    constructor(spriteList: SpriteClip[], canvasLocation: Coor2D, velocityX: number, velocityY: number) {
        super()
        this.spriteList = spriteList
        this.canvasLocation = Object.assign({}, canvasLocation)
        this.changingInterval = config.TREX_CHANGING_INTERVAL
        this.remainingInterval = this.changingInterval
        this.index = 0
    }

    public animate(timeInterval: number) {
        if (this.remainingInterval < 0) {
            this.remainingInterval = this.changingInterval
            this.index = (this.index + 1) % this.spriteList.length
        } else {
            this.remainingInterval -= timeInterval
        }
    }

    public draw(drawer: Drawer): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo(
                './assets/images/trex-sprites.png'
            ) as TexInfo
        }
        drawer.draw(
            this.tex,
            this.spriteList[this.index].coor.x,
            this.spriteList[this.index].coor.y,
            this.spriteList[this.index].width,
            this.spriteList[this.index].height,
            this.canvasLocation.x,
            this.canvasLocation.y,
            this.spriteList[this.index].width * this.spriteList[this.index].scale,
            this.spriteList[this.index].height * this.spriteList[this.index].scale
        )
    }

    public setSpriteList(spriteList: SpriteClip[]): void {
        this.index = 0
        this.spriteList = spriteList
    }

    public getCurrentSprite(): SpriteClip {
        return this.spriteList[this.index]
    }

    public getDisplayWidth(): number {
        return this.spriteList[this.index].width * this.spriteList[this.index].scale
    }

    public getDisplayHeight(): number {
        return this.spriteList[this.index].height * this.spriteList[this.index].scale
    }
}

export default Animation
