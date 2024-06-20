import { SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/Drawer'
import Vector2D from '../utils/Vector2D'
import config from '../utils/configs'
import GameObject from './GameObject'

abstract class Animation extends GameObject {
    private spriteList: SpriteClip[]
    private adjustList: Vector2D[]
    private index: number
    private changingInterval: number
    private remainingInterval: number
    protected tex: TexInfo

    constructor(location: Vector2D, changingInterval: number, spriteList: SpriteClip[], adjustList?: Vector2D[]) {
        super(location)
        this.spriteList = spriteList
        if (adjustList) {
            this.adjustList = adjustList
        }
        else {
            this.adjustList = []
        }
        this.changingInterval = changingInterval
        this.remainingInterval = this.changingInterval
        this.index = 0
    }

    public animate(timeInterval: number) {
        if (this.spriteList.length > 0) {
            if (this.remainingInterval < 0) {
                this.remainingInterval = this.changingInterval
                this.index = (this.index + 1) % this.spriteList.length
            } else {
                this.remainingInterval -= timeInterval
            }
        }
    }

    public render(): void {
        const drawer: Drawer = Drawer.getInstance()
        if (this.spriteList.length > 0) {
            let newLocation: Vector2D = this.location
            if (this.index >= 0 && this.index < this.adjustList.length) {
                newLocation = newLocation.add(this.adjustList[this.index])
            }
            drawer.draw(
                this.tex,
                this.spriteList[this.index].coor.x,
                this.spriteList[this.index].coor.y,
                this.spriteList[this.index].width,
                this.spriteList[this.index].height,
                newLocation.getX(),
                newLocation.getY(),
                this.spriteList[this.index].width * this.spriteList[this.index].scale,
                this.spriteList[this.index].height * this.spriteList[this.index].scale
            )
        }

        // Refining only
        let boxLocation: Vector2D
        this.colliderList.forEach((col) => {
            boxLocation = this.location.add(col.getOrigin())
            drawer.draw(
                this.smallBox,
                0,
                0,
                this.smallBox.width,
                this.smallBox.height,
                boxLocation.getX(),
                boxLocation.getY(),
                col.getWidth(),
                col.getHeight()
            )
        })
        //
        //
    }

    public setSpriteList(spriteList: SpriteClip[]): void {
        this.index = 0
        this.spriteList = spriteList
    }

    public setAdjustList(adjustList: Vector2D[]): void {
        this.adjustList = adjustList
    }

    public getCurrentSprite(): SpriteClip {
        return this.spriteList[this.index]
    }

    public getWidth(): number {
        return this.spriteList[this.index].width * this.spriteList[this.index].scale
    }

    public getHeight(): number {
        return this.spriteList[this.index].height * this.spriteList[this.index].scale
    }
}

export default Animation
