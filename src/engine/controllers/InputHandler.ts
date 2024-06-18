import SceneManager from './SceneManager'

class InputHandler {
    private scene: SceneManager

    constructor(scene: SceneManager) {
        this.scene = scene
    }

    public addEventListener(name: string) {
        document.addEventListener(name, (e) => {
            e.preventDefault()
            this.scene.handleInput(e)
        }, false)
    }
}

export default InputHandler
