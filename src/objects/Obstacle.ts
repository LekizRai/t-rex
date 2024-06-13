import { Drawer } from '../utils/Drawer'
import { TRex } from './TRex'
import { Coor2D, SpriteClip, TexInfo } from '../types/general'

export abstract class Obstacle {
    protected sprite: SpriteClip
    protected canvasLocation: Coor2D
    protected tex: TexInfo

    constructor(sprite: SpriteClip, x: number, y: number) {
        this.sprite = sprite
        this.canvasLocation = { x: x, y: y }
    }

    public abstract draw(drawer: Drawer): void

    public abstract update(): void

    public abstract getDisplayLocation(): Coor2D

    public abstract getDisplayHeight(): number

    public abstract getDisplayWidth(): number

    public isCollided(obj: TRex): boolean {
        var widthTruncation, heightTruncation: number
        widthTruncation = 5
        heightTruncation = 16
        var l1, r1, l2, r2: Coor2D
        l1 = this.canvasLocation
        r1 = {
            x: l1.x + this.getDisplayWidth(),
            y: l1.y + this.getDisplayHeight(),
        }
        l2 = obj.getDisplayLocation()
        r2 = {
            x: l2.x + obj.getDisplayWidth(),
            y: l2.y + obj.getDisplayHeight(),
        }

        if (l1.x === r1.x || l1.y === r1.y || l2.x === r2.x || l2.y === r2.y) {
            return false
        }

        if (-l2.x + r1.x < widthTruncation || -l1.x + r2.x < heightTruncation) {
            return false
        }

        if (-l2.y + r1.y < widthTruncation || -l1.y + r2.y < heightTruncation) {
            return false
        }

        return true
    }
}
