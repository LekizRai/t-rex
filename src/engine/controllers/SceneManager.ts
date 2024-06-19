import Drawer from '../utils/Drawer'
import GameObject from '../base-classes/GameObject'
import Scene from '../base-classes/Scene'

class SceneManager {
    private canvas: HTMLCanvasElement
    private drawer: Drawer

    private scene: Scene

    private toAddObjectList: GameObject[]
    private toRemoveObjectList: GameObject[]

    constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.drawer = new Drawer(this.canvas)
        this.toAddObjectList = []
        this.toRemoveObjectList = []
    }

    public handleInput(e: Event): void {
        this.scene.handleInput(e)
    }

    public update(timeInterval: number): void {
        this.scene.update(timeInterval)
        this.synchronize()
    }

    public render(): void {
        this.scene.render(this.drawer)
        document.body.appendChild(this.canvas)
    }

    private synchronize(): void {
        this.toAddObjectList.forEach((obj) => {
            this.scene.addObject(obj)
        })
        this.toAddObjectList.length = 0

        this.toRemoveObjectList.forEach((obj) => {
            this.scene.removeObject(obj)
        })
        this.toRemoveObjectList.length = 0
    }

    public addObjectToScene(obj: GameObject): void {
        this.toAddObjectList.push(obj)
    }

    public removeObjectFromScene(obj: GameObject): void {
        this.toRemoveObjectList.push(obj)
    }

    public attachScene(scene: Scene): void {
        this.scene = scene
    }

    public setup(): void {}
}

export default SceneManager
