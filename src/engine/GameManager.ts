import SceneManager from './controllers/SceneManager'
import InputHandler from './controllers/InputHandler'
import PhysicsManager from './controllers/PhysicsManager'
import ResourceManager from './controllers/ResourceManager'

abstract class GameManager {
    protected inputHandler: InputHandler
    protected sceneManager: SceneManager
    protected physicsManager: PhysicsManager
    protected resourceManager: ResourceManager
    private lastTime: number

    constructor() {
        this.inputHandler = InputHandler.getInstance()
        this.sceneManager = SceneManager.getInstance()
        this.physicsManager = PhysicsManager.getInstance()
        this.resourceManager = ResourceManager.getInstance()
        this.lastTime = window.performance.now()

        this.setup()
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
        requestAnimationFrame(() => {
            this.run()
        })
    }

    protected abstract setup(): void
}

export default GameManager
