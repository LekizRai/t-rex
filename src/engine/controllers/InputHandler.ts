import Scene from '../base-classes/Scene'
import SceneManager from './SceneManager'

class InputHandler {
    private scene: SceneManager

    private static instance: InputHandler

    private constructor() {}

    public register(scene: SceneManager): void {
        this.scene = scene

    }

    public static getInstance(): InputHandler {
        if (!this.instance) {
            this.instance = new InputHandler()
        }
        return this.instance
    }

    public addEventListener(name: string) {
        document.addEventListener(name, (e) => {
            e.preventDefault()
            this.scene.handleInput(e)
        }, false)
    }
}

export default InputHandler
