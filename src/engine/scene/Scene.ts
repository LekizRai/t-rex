import GameObject from '../objects/base-classes/GameObject'
import Message from '../controllers/Message'
import InputHandler from '../controllers/InputHandler'

abstract class Scene {
    private isUpdated: boolean
    private isRendered: boolean
    private state: string

    protected objectList: GameObject[]

    private toAddObjectList: GameObject[]
    private toRemoveObjectList: GameObject[]

    protected inputHandler: InputHandler

    constructor() {
        this.objectList = []
        this.toAddObjectList = []
        this.toRemoveObjectList = []
        this.inputHandler = InputHandler.getInstance()
        this.isUpdated = true
        this.isRendered = true

        this.setup()
    }

    public getState(): string {
        return this.state
    }

    public setState(state: string): void {
        this.state = state
    }

    public render(): void {
        this.synchronize()
        if (this.isRendered) {
            this.objectList.forEach((obj) => {
                obj.render()
            })
        }
    }

    public update(timeInterval: number): void {
        if (this.isUpdated) {
            this.objectList.forEach((obj) => {
                obj.update(timeInterval)
            })
        }
    }

    private synchronize(): void {
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

    public getObjectList(): GameObject[] {
        return this.objectList
    }

    public setObjectList(objectList: GameObject[]): void {
        this.objectList = objectList
    }

    public clearObjectList(): void {
        this.objectList.length = 0
    }

    public pause(): void {
        this.isUpdated = false
    }

    public resume(): void {
        this.isUpdated = true
    }

    public stop(): void {
        this.isUpdated = false
        this.isRendered = false
    }

    public start(): void {
        this.reload()
        this.isUpdated = true
        this.isRendered = true
    }

    public getIsRendered(): boolean {
        return this.isRendered
    }

    public setIsRendered(status: boolean): void {
        this.isRendered = status
    }

    public getIsUpdated(): boolean {
        return this.isUpdated
    }

    public setIsUpdated(status: boolean): void {
        this.isUpdated = status
    }

    public abstract reload(): void
    public abstract setup(): void
    public abstract handleInput(message: Message): void
}

export default Scene
