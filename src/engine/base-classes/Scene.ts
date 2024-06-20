import Drawer from '../utils/Drawer'
import GameObject from '../base-classes/GameObject'
import Message from '../controllers/Message'
import InputHandler from '../controllers/InputHandler'

abstract class Scene {
    protected objectList: GameObject[]
    protected inputHandler: InputHandler
    protected isActive: boolean

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
        if (!this.isActive) {
            if (status) {
                this.doTurnedOn()
            }
        }
        else {
            if (!status) {
                this.doTurnedOff()
            }
        }
        this.isActive = status
    }

    public doTurnedOn(): void {}
    public doTurnedOff(): void {}

    public abstract reload(): void
    public abstract setup(): void
    public abstract handleInput(message: Message): void
    public abstract update(timeInterval: number): void
}

export default Scene
