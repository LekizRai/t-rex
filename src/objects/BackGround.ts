import { Ground } from './Ground'
import { Cloud } from './Cloud'
import { Drawer } from '../utils/Drawer'
import { Coor2D, Coor3D, SpriteClip } from '../types/general'

export class BackGround {
    private groundList: Ground[]
    private cloudList: Cloud[]
    private lastTime: number
    private period: number
    // {width: 1, height: 1, texture: WebGLTexture}

    constructor() {
        // Initialize ground
        this.groundList = []
        this.groundList.push(new Ground(0, 400))
        var previousCoor = this.groundList[0].getDisplayLocation()
        var previousWidth = Math.ceil(this.groundList[0].getDisplayWidth())
        this.groundList.push(new Ground(previousCoor.x + previousWidth, 400))
        previousCoor = this.groundList[1].getDisplayLocation()
        previousWidth = Math.ceil(this.groundList[1].getDisplayWidth())
        this.groundList.push(new Ground(previousCoor.x + previousWidth, 400))

        // Initialize cloud
        this.cloudList = []
        this.cloudList.push(new Cloud(1000, 340))

        // Initialize time
        this.lastTime = window.performance.now()
        this.period = 2000
    }

    draw(drawer: Drawer): void {
        // Draw ground
        this.groundList.forEach((ground) => {
            ground.draw(drawer)
        })

        // Draw cloud
        this.cloudList.forEach((cloud) => {
            cloud.draw(drawer)
        })
    }

    update(): void {
        // Update ground
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

        // Update cloud
        this.cloudList.forEach((cloud) => {
            cloud.update()
        })
        var currentTime = window.performance.now()
        if (this.cloudList[0].getDisplayLocation().x + this.cloudList[0].getDisplayWidth() < 0) {
            this.cloudList.shift()
        }
        if (currentTime - this.lastTime > this.period) {
            this.cloudList.push(new Cloud(1000, 340))
            this.lastTime = currentTime
        }
    }
}
