import { SpriteClip, Coor2D, TexInfo } from '../types/general'
import Drawer from '../utils/Drawer'
import GameObject from './GameObject'

abstract class Figure extends GameObject {
    protected sprite: SpriteClip
    protected canvasLocation: Coor2D
    protected locationAdjust: Coor2D
    protected tex: TexInfo

    constructor(sprite: SpriteClip, canvasLocation: Coor2D, velocityX: number, velocityY: number) {
        super()
        this.sprite = Object.assign({}, sprite)
        this.canvasLocation = Object.assign({}, canvasLocation)
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.locationAdjust = { x: 0, y: 0 }
        this.changingTimeLeft = 0
    }

    public draw(drawer: Drawer): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo(
                './assets/images/trex-sprites.png'
            ) as TexInfo
        }
        drawer.draw(
            this.tex,
            this.sprite.coor.x,
            this.sprite.coor.y,
            this.sprite.width,
            this.sprite.height,
            this.canvasLocation.x + this.locationAdjust.x,
            this.canvasLocation.y + this.locationAdjust.y,
            this.sprite.width * this.sprite.scale,
            this.sprite.height * this.sprite.scale
        )
    }

    public getDisplayLocation(): Coor2D {
        return this.canvasLocation
    }

    public getDisplayWidth(): number {
        return this.sprite.width * this.sprite.scale
    }

    public getDisplayHeight(): number {
        return this.sprite.height * this.sprite.scale
    }

    public abstract update(timeInterval: number): void
}

export default Figure
