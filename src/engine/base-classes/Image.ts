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

    public render(): void {
        const drawer: Drawer = Drawer.getInstance()
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

        // Refining only
        let boxLocation: Vector2D
        this.colliderList.forEach((col) => {
            boxLocation = this.location.add(col.getOrigin())
            drawer.draw(
                this.box,
                0,
                0,
                this.box.width,
                this.box.height,
                boxLocation.getX(),
                boxLocation.getY(),
                col.getWidth(),
                col.getHeight()
            )
        })
        //
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
