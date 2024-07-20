import { SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/webgl-utils/Drawer'
import Vector2D from '../types/Vector2D'
import GameObject from './base-classes/GameObject'

abstract class Text extends GameObject {
    protected spriteList: SpriteClip[]
    protected content: string
    protected letterGap: number

    constructor(location: Vector2D, zIndex?: number) {
        if (zIndex) {
            super(location, zIndex)
        } else {
            super(location)
        }
        this.spriteList = []
        this.content = ''
        this.letterGap = 1
    }

    public render(): void {
        if (this.getIsRendered()) {
            const drawer: Drawer = Drawer.getInstance()
            let shift = 0
            this.spriteList.forEach((spr) => {
                drawer.draw(
                    this.getTex(),
                    spr.coor.getX(),
                    spr.coor.getY(),
                    spr.width,
                    spr.height,
                    this.getX() + shift,
                    this.getY(),
                    spr.width * spr.scale,
                    spr.height * spr.scale
                )
                shift += spr.width * spr.scale + this.letterGap
            })
        }
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
