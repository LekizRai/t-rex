import Drawer from '../utils/Drawer'
import GameObject from '../base-classes/GameObject'

let gameState: string[] = ['play', 'pause', 'gameover']

// Control:
// 1. Emerging and destroying objects
// 2. Update and render objects
// 3. In update having collision checking ???

abstract class SceneManager {
    private canvas: HTMLCanvasElement
    private drawer: Drawer
    protected objectList: GameObject[]

    private toAddObjectList: GameObject[]
    private toRemoveObjectList: GameObject[]

    constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.drawer = new Drawer(this.canvas)
        this.objectList = []
        this.toAddObjectList = []
        this.toRemoveObjectList = []
    }

    public render(): void {
        this.drawer.clear()
        this.objectList.forEach((obj) => {
            obj.draw(this.drawer)
        })
        document.body.appendChild(this.canvas)
    }

    public synchronize(): void {
        this.toAddObjectList.forEach((obj) => {
            this.objectList.push(obj)
        })
        this.toAddObjectList.length = 0

        let index: number
        this.toRemoveObjectList.forEach((obj) => {
            index = this.objectList.indexOf(obj)
            if (index > -1) {
                this.objectList.splice(index, 1)
            }
        })
        this.toRemoveObjectList.length = 0
    }

    public addObject(obj: GameObject): void {
        this.toAddObjectList.push(obj)
    }

    public removeObject(obj: GameObject): void {
        this.toRemoveObjectList.push(obj)
    }

    public abstract setup(): void
    public abstract handleInput(e: Event): void
    public abstract update(timeInterval: number): void
}

export default SceneManager
