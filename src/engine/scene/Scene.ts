import GameObject from '../objects/base-classes/GameObject'
import Message from '../controllers/Message'
import InputHandler from '../controllers/InputHandler'

abstract class Scene {
    private isActive: boolean

    protected objectList: GameObject[]

    private toAddObjectList: GameObject[]
    private toRemoveObjectList: GameObject[]

    protected inputHandler: InputHandler

    constructor() {
        this.objectList = []
        this.toAddObjectList = []
        this.toRemoveObjectList = []
        this.inputHandler = InputHandler.getInstance()
        this.isActive = true

        this.setup()
    }

    public render(): void {
        this.synchronize()
        this.objectList.forEach((obj) => {
            obj.render()
        })
    }

    public synchronize(): void {
        this.toAddObjectList.forEach((obj) => {
            this.objectList.push(obj)
        })
        this.objectList.sort((x, y) => {
            if (x.getZIndex() > y.getZIndex()) {
                return 1
            } else if (x.getZIndex() < y.getZIndex()) {
                return -1
            }
            return 0
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
        obj.attachScene(this)
    }

    public removeObject(obj: GameObject): void {
        this.toRemoveObjectList.push(obj)
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
