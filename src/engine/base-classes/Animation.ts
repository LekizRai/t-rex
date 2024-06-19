import { SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/Drawer'
import Vector2D from '../utils/Vector2D'
import config from '../utils/configs'
import GameObject from './GameObject'

abstract class Animation extends GameObject {
    private spriteList: SpriteClip[]
    private index: number
    private changingInterval: number
    private remainingInterval: number
    protected tex: TexInfo

    constructor(location: Vector2D, changingInterval: number, spriteList: SpriteClip[]) {
        super(location)
        this.spriteList = spriteList
        this.changingInterval = changingInterval
        this.remainingInterval = this.changingInterval
        this.index = 0
    }

    public animate(timeInterval: number) {
        if (this.spriteList.length > 0) {
            if (this.remainingInterval < 0) {
                this.remainingInterval = this.changingInterval
                this.index = (this.index + 1) % this.spriteList.length
            } else {
                this.remainingInterval -= timeInterval
            }
        }
    }

    public render(drawer: Drawer): void {
        if (!this.tex) {
            const tex = drawer.loadImageAndCreateTextureInfo(
                './assets/images/trex-sprites.png'
            )
            if (tex) {
                this.tex = tex
            }
        }
        if (this.spriteList.length > 0) {
            drawer.draw(
                this.tex,
                this.spriteList[this.index].coor.x,
                this.spriteList[this.index].coor.y,
                this.spriteList[this.index].width,
                this.spriteList[this.index].height,
                this.location.getX(),
                this.location.getY(),
                this.spriteList[this.index].width * this.spriteList[this.index].scale,
                this.spriteList[this.index].height * this.spriteList[this.index].scale
            )
        }
    }

    public setSpriteList(spriteList: SpriteClip[]): void {
        this.index = 0
        this.spriteList = spriteList
    }

    public getCurrentSprite(): SpriteClip {
        return this.spriteList[this.index]
    }

    public getWidth(): number {
        return this.spriteList[this.index].width * this.spriteList[this.index].scale
    }

    public getHeight(): number {
        return this.spriteList[this.index].height * this.spriteList[this.index].scale
    }
}

export default Animation
