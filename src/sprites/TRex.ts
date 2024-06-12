import { Coor2D, Coor3D, SpriteClip } from '../types/general'

// 1516, 4, 82, 90

// 1604, 4, 82, 90

// 1868, 38, 114, 56

// 1986, 38, 114, 56

export class TRex {
    private spriteList: SpriteClip[]
    private canvasLocation: Coor2D
    private tex: any
    private isDuck: boolean
    private firstFrame: boolean

    lastTime: number
    speed: number

    constructor(x: number, y: number) {
        this.spriteList = []
        this.spriteList.push({ coor: { x: 1516, y: 4 }, width: 82, height: 90, scale: 0.5 })
        this.spriteList.push({ coor: { x: 1604, y: 4 }, width: 82, height: 90, scale: 0.5 })
        this.spriteList.push({ coor: { x: 1868, y: 38 }, width: 114, height: 56, scale: 0.5 })
        this.spriteList.push({ coor: { x: 1986, y: 38 }, width: 114, height: 56, scale: 0.5 })
        this.canvasLocation = { x: x, y: y }

        this.lastTime = window.performance.now()
        this.speed = 200

        this.isDuck = false
        this.firstFrame = true
    }

    draw(drawer: any): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo('./assets/images/trex-sprites.png')
        }
        var sprite: SpriteClip
        if (this.isDuck) {
            if (this.firstFrame) {
                sprite = this.spriteList[2]
            }
            else {
                sprite = this.spriteList[3]
            }
        }
        else {
            if (this.firstFrame) {
                sprite = this.spriteList[0]
            }
            else {
                sprite = this.spriteList[1]
            }
        }
        drawer.draw(
            this.tex,
            sprite.coor.x,
            sprite.coor.y,
            sprite.width,
            sprite.height,
            this.canvasLocation.x,
            this.canvasLocation.y,
            sprite.width * sprite.scale,
            sprite.height * sprite.scale
        )
    }

    update(): void {
        var currentTime = window.performance.now()
        if (currentTime - this.lastTime > this.speed) {
            this.lastTime = currentTime
            this.firstFrame = !this.firstFrame
        }
    }
}
