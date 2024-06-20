import GameObject from '../objects/base-classes/GameObject'
import Message from '../controllers/Message'
import InputHandler from '../controllers/InputHandler'

abstract class Scene {
    private isActive: boolean

    protected objectList: GameObject[]
    protected inputHandler: InputHandler

    constructor() {
        this.objectList = []
        this.inputHandler = InputHandler.getInstance()
        this.isActive = true

        this.setup()
    }

    public render(): void {
        this.objectList.forEach((obj) => {
            obj.render()
        })
    }

    public addObject(obj: GameObject): void {
        this.objectList.push(obj)
        this.objectList.sort((x, y) => {
            if (x.getZIndex() > y.getZIndex()) {
                return 1
            } else if (x.getZIndex() < y.getZIndex()) {
                return -1
            }
            return 0
        })
        obj.attachScene(this)
    }

    public removeObject(obj: GameObject): void {
        let index: number = this.objectList.indexOf(obj)
        if (index > -1) {
            this.objectList.splice(index, 1)
        }
    }

    public getActive(): boolean {
        return this.isActive
    }

    public setActive(status: boolean): void {
        this.isActive = status
    }

    public abstract reload(): void
    public abstract setup(): void
    public abstract handleInput(message: Message): void
    public abstract update(timeInterval: number): void
}

export default Scene
