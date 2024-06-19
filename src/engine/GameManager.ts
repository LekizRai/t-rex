import SceneManager from './controllers/SceneManager'
import InputHandler from './controllers/InputHandler'
import PhysicsManager from './controllers/PhysicsManager'
import Scene from './base-classes/Scene'

abstract class GameManager {
    protected inputHandler: InputHandler
    protected sceneManager: SceneManager
    protected physicsManager: PhysicsManager
    private lastTime: number

    constructor() {
        this.inputHandler = InputHandler.getInstance()
        this.sceneManager = SceneManager.getInstance()
        this.physicsManager = PhysicsManager.getInstance()
        this.lastTime = window.performance.now()
    }

    private update(): void {
        let currentTime: number = window.performance.now()
        this.physicsManager.update(currentTime - this.lastTime)
        this.sceneManager.update(currentTime - this.lastTime)
        this.lastTime = currentTime
    }

    private render(): void {
        this.sceneManager.render()
    }

    public run(): void {
        this.update()
        this.render()
        requestAnimationFrame(() => this.run())
    }
       
    public abstract setup(): void
}

export default GameManager
