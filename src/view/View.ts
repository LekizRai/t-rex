import { BackGround } from '../objects/BackGround'
import { Obstacle } from '../objects/Obstacle'
import { Cactus } from '../objects/Cactus'
import { TRex } from '../objects/TRex'
import {PointBoard} from '../objects/PointBoard'
import { Drawer } from '../utils/Drawer'

export class View {
    public canvas: HTMLCanvasElement
    public drawer: Drawer

    private background: BackGround
    private trex: TRex
    private obstacleList: Obstacle[]
    private pointBoard: PointBoard

    private lastTime: number
    private period: number

    constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.canvas.width = window.innerWidth 
        this.canvas.height = window.innerHeight

        this.drawer = new Drawer(this.canvas)

        // Initialize background
        this.background = new BackGround()

        // Initialize obtacle
        this.obstacleList = []
        this.obstacleList.push(new Cactus(1000, 365))

        // Initialize TRex
        this.trex = new TRex(50, 370)

        // Initialize point board
        this.pointBoard = new PointBoard(500, 300)

        // Intialize time
        this.lastTime = window.performance.now()
        this.period = 1500
    }

    public update(): void {
        // Update background scene
        this.background.update()

        // Update obtacles
        this.obstacleList.forEach((obstacle) => {
            obstacle.update()
        })
        var currentTime = window.performance.now()
        if (this.obstacleList.length > 0) {
            if (
                this.obstacleList[0].getDisplayLocation().x +
                    this.obstacleList[0].getDisplayWidth() <
                0
            ) {
                this.obstacleList.shift()
            }
        }
        if (currentTime - this.lastTime > this.period) {
            this.obstacleList.push(new Cactus(1000, 365))
            this.lastTime = currentTime
        }

        // Update TRex
        this.trex.update()

        // Update points
        this.pointBoard.update() 
    }

    public checkCollision(): boolean {
        for (var obstacle of this.obstacleList) {
            if (obstacle.isCollided(this.trex)) {
                return true
            }
        }
        return false
    }

    public render(): void {
        // Clear the screen
        this.drawer.clear()

        // Draw background scene
        this.background.draw(this.drawer)

        // Draw obtacles
        this.obstacleList.forEach((obstacle) => {
            obstacle.draw(this.drawer)
        })

        // Draw TRex
        this.trex.draw(this.drawer)

        // Draw point board
        this.pointBoard.draw(this.drawer)

        // Stick scene on web page
        document.body.appendChild(this.canvas)
    }

    getTRex(): TRex {
        return this.trex
    }
}
