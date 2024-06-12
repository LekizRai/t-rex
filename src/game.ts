import { View } from './view/View'

class Game {
    public canvaView: View

    constructor() {
        this.canvaView = new View()
    }

    public update(): void {
        this.canvaView.update()
    }

    private render(): void {
        this.canvaView.render()
    }

    private loop(): void {
        this.update()
        this.render()
        requestAnimationFrame(() => this.loop())
    }

    public run(): void {
        requestAnimationFrame(() => this.loop())
    }
}

var game = new Game()
game.run()
