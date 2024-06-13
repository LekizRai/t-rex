import { Drawer } from '../utils/Drawer'
import { Coor2D, Coor3D, SpriteClip } from '../types/general'

// 164, 0, 96, 32

export class Cloud {
    private sprite: SpriteClip
    private canvasLocation: Coor2D
    private tex: any
    // {width: 1, height: 1, texture: WebGLTexture}

    constructor(x: number, y: number) {
        this.sprite = {coor: {x: 164, y: 0}, width: 96, height: 32, scale: 0.5}
        this.canvasLocation = {x: x, y: y}
    }

    draw(drawer: Drawer): void {
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
        this.canvasLocation.x -= 2
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
