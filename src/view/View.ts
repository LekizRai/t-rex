import { BackGround } from '../sprites/BackGround'
import { Drawer } from '../Drawer'

export class View {
    public canvas: HTMLCanvasElement
    public drawer: Drawer

    public background: BackGround

    constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.drawer = new Drawer(this.canvas)
        this.background = new BackGround()
    }

    public update(): void {}

    public draw(): void {
        this.background.draw(this.drawer)
        document.body.appendChild(this.canvas)
    }
}
