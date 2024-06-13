import { Message } from '../controllers/Message'
import { Coor2D, Coor3D, SpriteClip } from '../types/general'
import { Drawer } from '../utils/Drawer'
import { keys } from '../utils/keys'

// 1516, 4, 84, 90 running first frame

// 1604, 4, 84, 90 running second frame

// 1868, 38, 114, 56 ducking first frame

// 1986, 38, 114, 56 ducking second frame

// 1340, 4, 84, 90 jumping frame

// 1428, 4, 84, 90 blinking first frame

// 1692, 4, 84, 90 blinking second frame

// 78, 6, 88, 92 start trex

var spriteList: SpriteClip[] = []
spriteList.push({ coor: { x: 1516, y: 4 }, width: 84, height: 90, scale: 0.5 })
spriteList.push({ coor: { x: 1604, y: 4 }, width: 84, height: 90, scale: 0.5 })
spriteList.push({ coor: { x: 1868, y: 38 }, width: 114, height: 56, scale: 0.5 })
spriteList.push({ coor: { x: 1986, y: 38 }, width: 114, height: 56, scale: 0.5 })
spriteList.push({ coor: { x: 1340, y: 4 }, width: 84, height: 90, scale: 0.5 })
spriteList.push({ coor: { x: 1428, y: 4 }, width: 84, height: 90, scale: 0.5 })
spriteList.push({ coor: { x: 1692, y: 4 }, width: 84, height: 90, scale: 0.5 })
spriteList.push({ coor: { x: 78, y: 6 }, width: 88, height: 92, scale: 0.5 })

export class TRex {
    private sprite: SpriteClip
    private canvasLocation: Coor2D
    private tex: any

    private isDucking: boolean
    private isDuckingFirstFrame: boolean

    private isJumping: boolean
    private jumpingTime: number
    private jumpingPeriod: number
    /////
    private addTimes: number
    /////

    private isRunningFirstFrame: boolean

    private lastTime: number
    private speed: number

    constructor(x: number, y: number) {
        this.sprite = spriteList[0]
        this.canvasLocation = { x: x, y: y }

        this.isDucking = false
        this.isDuckingFirstFrame = true

        this.isJumping = false
        this.jumpingTime = window.performance.now()
        this.jumpingPeriod = 500
        this.addTimes = 0

        this.isRunningFirstFrame = true

        this.lastTime = window.performance.now()
        this.speed = 100
    }

    draw(drawer: Drawer): void {
        if (!this.tex) {
            this.tex = drawer.loadImageAndCreateTextureInfo('./assets/images/trex-sprites.png')
        }
        if (this.isDucking) {
            if (this.isDuckingFirstFrame) {
                this.sprite = spriteList[2]
            } else {
                this.sprite = spriteList[3]
            }
        } else if (this.isJumping) {
            this.sprite = spriteList[4]
        } else {
            if (this.isRunningFirstFrame) {
                this.sprite = spriteList[0]
            } else {
                this.sprite = spriteList[1]
            }
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
        if (this.isDucking) {
            var currentTime = window.performance.now()
            if (currentTime - this.lastTime > this.speed) {
                this.lastTime = currentTime
                this.isDuckingFirstFrame = !this.isDuckingFirstFrame
            }
        } else if (this.isJumping) {
            var currentTime = window.performance.now()
            if (currentTime - this.jumpingTime > this.jumpingPeriod) {
                if (this.addTimes > 1) {
                    this.canvasLocation.y += 4
                    this.addTimes -= 1
                }
                else {
                    this.isJumping = false
                }
            }
            if (currentTime - this.jumpingTime < this.jumpingPeriod / 2) {
                this.canvasLocation.y -= 4
                this.addTimes += 1
            }
            else if (currentTime - this.jumpingTime >= this.jumpingPeriod / 2) {
                this.canvasLocation.y += 4
                this.addTimes -= 1
            }
            
        } else {
            var currentTime = window.performance.now()
            if (currentTime - this.lastTime > this.speed) {
                this.lastTime = currentTime
                this.isRunningFirstFrame = !this.isRunningFirstFrame
            }
        }
    }

    changeState(message: Message): void {
        if (message.getKeyCode() == keys.ARROW_UP || message.getKeyCode() == keys.SPACE) {
            if (message.getStatus() == 'down') {
                this.isJumping = true
                this.jumpingTime = window.performance.now()
            }
        } else if (message.getKeyCode() == keys.ARROW_DOWN) {
            if (message.getStatus() == 'down') {
                this.isDucking = true
            } else {
                this.isDucking = false
            }
        }
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
