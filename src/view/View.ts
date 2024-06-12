import { Ground } from '../sprites/Ground'
import { TRex } from '../sprites/TRex'
import { Drawer } from '../utils/Drawer'

export class View {
    public canvas: HTMLCanvasElement
    public drawer: Drawer

    public groundList: Ground[]
    public TRex: TRex

    constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.drawer = new Drawer(this.canvas)

        this.groundList = []
        this.groundList.push(new Ground(0, 400))

        var previousCoor = this.groundList[0].getDisplayLocation()
        var previousWidth = Math.ceil(this.groundList[0].getDisplayWidth())
        this.groundList.push(new Ground(previousCoor.x + previousWidth, 400))

        previousCoor = this.groundList[1].getDisplayLocation()
        previousWidth = Math.ceil(this.groundList[1].getDisplayWidth())
        this.groundList.push(new Ground(previousCoor.x + previousWidth, 400))

        this.TRex = new TRex(50, 370)
    }

    public update(): void {
        // Update ground scene
        this.groundList.forEach((ground) => {
            ground.update()
        })
        var previousCoor = this.groundList[0].getDisplayLocation()
        var previousWidth = Math.ceil(this.groundList[0].getDisplayWidth())
        if (previousCoor.x + previousWidth < 0) {
            this.groundList.shift()
            previousCoor = this.groundList[1].getDisplayLocation()
            previousWidth = Math.ceil(this.groundList[1].getDisplayWidth())
            this.groundList.push(new Ground(previousCoor.x + previousWidth, 400))
        }

        // Update background scene

        // Update TRex
        this.TRex.update()

        // Update obtacles

        // Update points
    }

    public render(): void {
        // Clear the screen
        this.drawer.clear()

        // Draw the ground scene
        this.groundList.forEach((ground) => {
            ground.draw(this.drawer)
        })

        // Draw background scene

        // Draw TRex
        this.TRex.draw(this.drawer)

        // Draw obtacles

        // Stick scene on web page
        document.body.appendChild(this.canvas)
    }
}
