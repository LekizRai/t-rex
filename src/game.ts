import { View } from './view/View'

class Game {
    public canvaView: View

    constructor() {
        this.canvaView = new View()
        this.canvaView.draw()
    }

    public update(): void {}

    public run(): void {}
}

new Game()
