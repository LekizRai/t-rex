import { SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/webgl-utils/Drawer'
import Vector2D from '../types/Vector2D'
import GameObject from './base-classes/GameObject'

abstract class Text extends GameObject {
    protected spriteList: SpriteClip[]
    protected content: string
    protected letterGap: number
    protected tex: TexInfo

    constructor(location: Vector2D, zIndex?: number) {
        if (zIndex) {
            super(location, zIndex)
        }
        else {
            super(location)
        }
        this.spriteList = []
        this.content = ''
        this.letterGap = 1
    }

    public render(): void {
        const drawer: Drawer = Drawer.getInstance()
        let shift = 0
        this.spriteList.forEach((spr) => {
            drawer.draw(
                this.tex,
                spr.coor.getX(),
                spr.coor.getY(),
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
