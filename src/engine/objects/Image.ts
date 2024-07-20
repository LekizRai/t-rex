import { SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/webgl-utils/Drawer'
import Vector2D from '../types/Vector2D'
import GameObject from './base-classes/GameObject'

abstract class Image extends GameObject {
    protected sprite: SpriteClip

    constructor(location: Vector2D, sprite: SpriteClip, zIndex?: number) {
        if (zIndex) {
            super(location, zIndex)
        } else {
            super(location)
        }
        this.sprite = sprite
    }

    public render(): void {
        if (this.getIsRendered()) {
            const drawer: Drawer = Drawer.getInstance()
            drawer.draw(
                this.getTex(),
                this.sprite.coor.getX(),
                this.sprite.coor.getY(),
                this.sprite.width,
                this.sprite.height,
                this.getX(),
                this.getY(),
                this.sprite.width * this.sprite.scale,
                this.sprite.height * this.sprite.scale
            )
        }
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
