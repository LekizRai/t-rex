import { View } from './view/View'
import { InputHandler } from './controllers/InputHandler'
import { StateHandler } from './controllers/StateHandler'

class Game {
    private canvaView: View
    private inputHandler: InputHandler
    private stateHandler: StateHandler
    private endGame: boolean

    constructor() {
        this.canvaView = new View()

        this.stateHandler = new StateHandler()
        this.stateHandler.register(this.canvaView.getTRex())

        this.inputHandler = new InputHandler(this.stateHandler)
        this.inputHandler.init()

        this.endGame = false
    }

    public update(): void {
        this.canvaView.update()
        this.endGame = this.canvaView.checkCollision()
    }

    private render(): void {
        this.canvaView.render()
    }

    private loop(): void {
        if (!this.endGame) {
            this.update()
            this.render()
            requestAnimationFrame(() => this.loop())
        }
        else {
            // alert("End game")
            // this.endGame = false
        }
    }

    public run(): void {
        requestAnimationFrame(() => this.loop())
    }
}

var game = new Game()
game.run()
