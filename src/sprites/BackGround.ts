import * as webGLUtils from '../Drawer'

export class BackGround {
    constructor() {}

    draw(drawer: any): void {
        drawer.draw()
        // drawer.drawPolygons([0, 0, 0, 1, 1, 0], 1)
    }
    move(): void {}
}
