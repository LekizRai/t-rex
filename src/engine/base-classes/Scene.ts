import Drawer from '../utils/Drawer'
import GameObject from '../base-classes/GameObject'
import Message from '../controllers/Message'
import InputHandler from '../controllers/InputHandler'

abstract class Scene {
    protected objectList: GameObject[]
    protected inputHandler: InputHandler

    constructor() {
        this.objectList = []
        this.inputHandler = InputHandler.getInstance()
    }

    public render(): void {
        const drawer: Drawer = Drawer.getInstance()
        drawer.clear()
        this.objectList.forEach((obj) => {
            obj.render()
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
    public abstract handleInput(message: Message): void
    public abstract update(timeInterval: number): void
}

export default Scene
