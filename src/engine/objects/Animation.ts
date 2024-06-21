import Collider from '../components/Collider'
import { SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/webgl-utils/Drawer'
import Vector2D from '../types/Vector2D'
import GameObject from './base-classes/GameObject'

abstract class Animation extends GameObject {
    private spriteList: SpriteClip[]
    private adjustList: Vector2D[]
    private collidersList: Collider[][]

    private index: number
    private changingInterval: number
    private remainingInterval: number
    protected tex: TexInfo

    constructor(
        location: Vector2D,
        changingInterval: number,
        spriteList: SpriteClip[],
        zIndex?: number
    ) {
        if (zIndex) {
            super(location, zIndex)
        } else {
            super(location)
        }
        this.spriteList = spriteList
        this.adjustList = []
        this.collidersList = []
        this.changingInterval = changingInterval
        this.remainingInterval = this.changingInterval
        this.index = 0
    }

    public animate(timeInterval: number) {
        if (this.spriteList.length > 0) {
            if (this.remainingInterval < 0) {
                this.remainingInterval = this.changingInterval
                if (this.index >= 0 && this.index < this.adjustList.length) {
                    this.location = this.location.sub(this.adjustList[this.index])
                }
                this.index = (this.index + 1) % this.spriteList.length
                if (this.index >= 0 && this.index < this.adjustList.length) {
                    this.location = this.location.add(this.adjustList[this.index])
                }
                if (this.index >= 0 && this.index < this.collidersList.length) {
                    this.colliderList = this.collidersList[this.index]
                }
            } else {
                this.remainingInterval -= timeInterval
            }
        }
    }

    public render(): void {
        const drawer: Drawer = Drawer.getInstance()
        if (this.spriteList.length > 0) {
            drawer.draw(
                this.tex,
                this.spriteList[this.index].coor.getX(),
                this.spriteList[this.index].coor.getY(),
                this.spriteList[this.index].width,
                this.spriteList[this.index].height,
                this.location.getX(),
                this.location.getY(),
                this.spriteList[this.index].width * this.spriteList[this.index].scale,
                this.spriteList[this.index].height * this.spriteList[this.index].scale
            )
        }
    }

    // About sprite
    public getCurrentSprite(): SpriteClip {
        return this.spriteList[this.index]
    }

    public setSpriteList(spriteList: SpriteClip[]): void {
        this.index = 0
        this.spriteList = spriteList
    }

    public setAdjustList(adjustList: Vector2D[]): void {
        this.adjustList = adjustList
    }

    public setCollidersList(collidersList: Collider[][]): void {
        if (collidersList.length > 0) {
            this.colliderList = collidersList[0]
        }
        this.collidersList = collidersList
    }

    public getWidth(): number {
        if (this.spriteList.length > 0) {
            return this.spriteList[this.index].width * this.spriteList[this.index].scale
        }
        return 0
    }

    public getHeight(): number {
        if (this.spriteList.length > 0) {
            return this.spriteList[this.index].height * this.spriteList[this.index].scale
        }
        return 0
    }
}

export default Animation
