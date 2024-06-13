import { Coor2D, SpriteClip } from '../types/general'
import { Drawer } from '../utils/Drawer'

var numberSpriteList: SpriteClip[] = []
numberSpriteList.push({ coor: { x: 952, y: 0 }, width: 22, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 974, y: 0 }, width: 20, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 992, y: 0 }, width: 22, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 1012, y: 0 }, width: 22, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 1032, y: 0 }, width: 22, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 1052, y: 0 }, width: 22, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 1072, y: 0 }, width: 22, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 1092, y: 0 }, width: 22, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 1112, y: 0 }, width: 22, height: 26, scale: 0.5 })
numberSpriteList.push({ coor: { x: 1132, y: 0 }, width: 22, height: 26, scale: 0.5 })

var highPointSprite: SpriteClip = { coor: { x: 1152, y: 0 }, width: 42, height: 26, scale: 0.5 }

export class PointBoard {
    private sprite: SpriteClip
    private canvasLocation: Coor2D
    private tex: any

    private highPoint: number
    private currentPoint: number

    private lastTime: number
    private period: number

    constructor(x: number, y: number) {
        this.sprite = highPointSprite
        this.canvasLocation = { x: x, y: y }

        this.highPoint = 1000
        this.currentPoint = 0

        this.lastTime = window.performance.now()
        this.period = 100
    }

    draw(drawer: Drawer): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo('./assets/images/trex-sprites.png')
        }

        var position: number
        var gap: number

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

        position = 0
        gap = 30
        this.numberToSpriteList(this.highPoint).forEach((digitSprite) => {
            drawer.draw(
                this.tex,
                digitSprite.coor.x,
                digitSprite.coor.y,
                digitSprite.width,
                digitSprite.height,
                this.canvasLocation.x + position * 11 + gap,
                this.canvasLocation.y,
                digitSprite.width * digitSprite.scale,
                digitSprite.height * digitSprite.scale
            )
            position += 1
        })

        position = 0
        gap = 120
        this.numberToSpriteList(this.currentPoint).forEach((digitSprite) => {
            drawer.draw(
                this.tex,
                digitSprite.coor.x,
                digitSprite.coor.y,
                digitSprite.width,
                digitSprite.height,
                this.canvasLocation.x + position * 11 + gap,
                this.canvasLocation.y,
                digitSprite.width * digitSprite.scale,
                digitSprite.height * digitSprite.scale
            )
            position += 1
        })
    }

    update(): void {
        var currentTime: number = window.performance.now()
        if (currentTime - this.lastTime > this.period) {
            this.currentPoint += 1
            this.lastTime = currentTime
        }
    }

    numberToSpriteList(val: number): SpriteClip[] {
        var spriteList: SpriteClip[] = []
        var digit: number
        for (var i: number = 4; i > -1; i--) {
            digit = Math.floor(val / (10 ** i))
            val = val % (10 ** i)
            spriteList.push(numberSpriteList[digit])
        }
        return spriteList
    }


}
