import { SpriteClip, Coor2D, TexInfo } from '../types/general'
import Drawer from '../utils/Drawer'
import sprite from '../utils/sprites'
import GameObject from './GameObject'

abstract class Text extends GameObject {
    protected spriteList: SpriteClip[]
    protected content: string
    protected tex: TexInfo
    protected letterGap: number

    constructor(velocityX: number, velocityY: number) {
        super()
        this.spriteList = []
        this.content = ''
        this.letterGap = 1
    }

    public draw(drawer: Drawer): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo(
                './assets/images/trex-sprites.png'
            ) as TexInfo
        }

        let position = 0
        this.spriteList.forEach((spr) => {
            drawer.draw(
                this.tex,
                spr.coor.x,
                spr.coor.y,
                spr.width,
                spr.height,
                this.canvasLocation.x + position,
                this.canvasLocation.y,
                spr.width * spr.scale,
                spr.height * spr.scale
            )
            position += spr.width * spr.scale + this.letterGap
        })
    }

    public getContent(): string {
        return this.content
    }

    public setContent(content: string): void {
        this.content = content
        this.contentToSpriteList()
    }

    protected abstract contentToSpriteList(): void
}

export default Text
