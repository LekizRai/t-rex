import SceneManager from './controllers/SceneManager'
import InputHandler from './controllers/InputHandler'

abstract class GameManager {
    protected scene: SceneManager
    protected inputHandler: InputHandler
    private lastTime: number

    constructor() {
        this.lastTime = window.performance.now()
    }

    private update(): void {
        let currentTime: number = window.performance.now()
        this.scene.update(currentTime - this.lastTime)
        this.lastTime = currentTime
        this.scene.synchronize()
    }

    private render(): void {
        this.scene.render()
    }

    public run(): void {
        this.update()
        this.render()
        requestAnimationFrame(() => this.run())
    }

    public abstract setup(): void
}

export default GameManager
