import { SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/Drawer'
import Vector2D from '../utils/Vector2D'
import GameObject from './GameObject'

abstract class Text extends GameObject {
    protected spriteList: SpriteClip[]
    protected content: string
    protected letterGap: number
    protected tex: TexInfo

    constructor(location: Vector2D) {
        super(location)
        this.spriteList = []
        this.content = ''
        this.letterGap = 1
    }

    public render(drawer: Drawer): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo(
                './assets/images/trex-sprites.png'
            ) as TexInfo
        }

        let shift = 0
        this.spriteList.forEach((spr) => {
            drawer.draw(
                this.tex,
                spr.coor.x,
                spr.coor.y,
                spr.width,
                spr.height,
                this.location.getX() + shift,
                this.location.getY(),
                spr.width * spr.scale,
                spr.height * spr.scale
            )
            shift += spr.width * spr.scale + this.letterGap
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
