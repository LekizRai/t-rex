import { Obstacle } from './Obstacle'
import { Coor2D, SpriteClip } from '../types/general'
import { randomInt } from '../utils/utils'

// 446, 2, 34, 70
// 480, 2, 68, 70
// 548, 2, 102, 70
// 652, 2, 50, 100
// 702, 2, 48, 100
// 752, 2, 98, 100
// 850, 2, 102, 100

var spriteList: SpriteClip[] = []
spriteList.push({ coor: { x: 446, y: 2 }, width: 34, height: 70, scale: 0.5 })
spriteList.push({ coor: { x: 480, y: 2 }, width: 68, height: 70, scale: 0.5 })
spriteList.push({ coor: { x: 548, y: 2 }, width: 102, height: 70, scale: 0.5 })
spriteList.push({ coor: { x: 652, y: 2 }, width: 50, height: 100, scale: 0.5 })
spriteList.push({ coor: { x: 702, y: 2 }, width: 48, height: 100, scale: 0.5 })
spriteList.push({ coor: { x: 752, y: 2 }, width: 98, height: 100, scale: 0.5 })
spriteList.push({ coor: { x: 850, y: 2 }, width: 102, height: 100, scale: 0.5 })

export class Cactus extends Obstacle {
    constructor(x: number, y: number) {
        var index: number = randomInt(0, 6)
        super(spriteList[index], x, y)
    }

    draw(drawer: any): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo('./assets/images/trex-sprites.png')
        }
        drawer.draw(
            this.tex,
            this.sprite.coor.x,
            this.sprite.coor.y,
            this.sprite.width,
            this.sprite.height,
            this.canvasLocation.x,
            this.canvasLocation.y,
            this.sprite.width * this.sprite.scale,
            this.sprite.height * this.sprite.scale
        )
    }

    update(): void {
        this.canvasLocation.x -= 5
        this.canvasLocation.y -= 0
    }

    getDisplayLocation(): Coor2D {
        return this.canvasLocation
    }

    getDisplayWidth(): number {
        return this.sprite.width * this.sprite.scale
    }

    getDisplayHeight(): number {
        return this.sprite.height * this.sprite.scale
    }
}
