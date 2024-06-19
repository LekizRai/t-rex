import Drawer from '../utils/Drawer'
import GameObject from '../base-classes/GameObject'

abstract class Scene {
    // private canvas: HTMLCanvasElement
    // private drawer: Drawer
    protected objectList: GameObject[]

    constructor() {
        this.objectList = []
    }

    public render(drawer: Drawer): void {
        drawer.clear()
        this.objectList.forEach((obj) => {
            obj.render(drawer)
        })
    }

    public addObject(obj: GameObject): void {
        this.objectList.push(obj)
    }

    public removeObject(obj: GameObject): void {
        let index: number = this.objectList.indexOf(obj)
        if (index > -1) {
            this.objectList.splice(index, 1)
        }
    }

    public abstract setup(): void
    public abstract handleInput(e: Event): void
    public abstract update(timeInterval: number): void
}

export default Scene
