import { SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/Drawer'
import Vector2D from '../utils/Vector2D'
import GameObject from './GameObject'

abstract class Image extends GameObject {
    protected sprite: SpriteClip
    protected tex: TexInfo

    constructor(location: Vector2D, sprite: SpriteClip) {
        super(location)
        this.sprite = sprite
    }

    public render(drawer: Drawer): void {
        if (!this.tex) {
            const tex = drawer.loadImageAndCreateTextureInfo('./assets/images/trex-sprites.png')
            if (tex) {
                this.tex = tex
            }
        }
        drawer.draw(
            this.tex,
            this.sprite.coor.x,
            this.sprite.coor.y,
            this.sprite.width,
            this.sprite.height,
            this.location.getX(),
            this.location.getY(),
            this.sprite.width * this.sprite.scale,
            this.sprite.height * this.sprite.scale
        )
    }

    public setSprite(sprite: SpriteClip): void {
        this.sprite = sprite
    }

    public getWidth(): number {
        return this.sprite.width * this.sprite.scale
    }

    public getHeight(): number {
        return this.sprite.height * this.sprite.scale
    }
}

export default Image
