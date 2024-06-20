import GameObject from '../objects/base-classes/GameObject'
import Scene from '../scene/Scene'
import Message from './Message'
import SceneManager from './SceneManager'

class InputHandler {
    private scene: SceneManager

    private mouseEventList: GameObject[]
    private keyboardEventList: GameObject[]

    private static instance: InputHandler

    private constructor() {
        this.mouseEventList = []
        this.keyboardEventList = []
    }

    public register(scene: SceneManager): void {
        this.scene = scene
    }

    public static getInstance(): InputHandler {
        if (!this.instance) {
            this.instance = new InputHandler()
        }
        return this.instance
    }

    public attachMouseEvent(obj: GameObject): void {
        this.mouseEventList.push(obj)
    }

    public attachKeyboardEvent(obj: GameObject): void {
        this.keyboardEventList.push(obj)
    }

    public detach(obj: GameObject): void {
        let index: number = this.mouseEventList.indexOf(obj)
        if (index > -1) {
            this.mouseEventList.splice(index, 1)
        }

        index = this.keyboardEventList.indexOf(obj)
        if (index > -1) {
            this.keyboardEventList.splice(index, 1)
        }
    }

    private notify(e: Event) {
        if (e instanceof KeyboardEvent) {
            this.keyboardEventList.forEach((obj) => {
                obj.handleInput(new Message(e))
            })
        } else if (e instanceof MouseEvent) {
            this.mouseEventList.forEach((obj) => {
                obj.handleInput(new Message(e))
            })
        }
    }

    public addEventListener(name: string) {
        document.addEventListener(
            name,
            (e) => {
                e.preventDefault()
                this.notify(e)
                // this.scene.handleInput(e)
            },
            false
        )
    }
}

export default InputHandler
