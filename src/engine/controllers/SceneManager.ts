import Drawer from '../utils/webgl-utils/Drawer'
import GameObject from '../objects/base-classes/GameObject'
import Scene from '../scene/Scene'
import Message from './Message'

class SceneManager {
    private canvas: HTMLCanvasElement
    private sceneList: Scene[]
    private static instance: SceneManager

    private constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.sceneList = []
        Drawer.init(this.canvas)
    }

    public static getInstance(): SceneManager {
        if (!this.instance) {
            this.instance = new SceneManager()
        }
        return this.instance
    }

    public handleInput(message: Message): void {
        this.sceneList.forEach((scene) => {
            scene.handleInput(message)
        })
    }

    public update(timeInterval: number): void {
        this.sceneList.forEach((scene) => {
            scene.update(timeInterval)
        })
    }

    public render(): void {
        const drawer: Drawer = Drawer.getInstance()
        drawer.clear()
        this.sceneList.forEach((scene) => {
            if (scene.getActive()) {
                scene.render()
            }
        })
        document.body.appendChild(this.canvas)
    }

    public addScene(scene: Scene): void {
        this.sceneList.push(scene)
    }

    public setSceneStatus(index: number, status: boolean): void {
        if (index >= 0 && index < this.sceneList.length) {
            this.sceneList[index].setActive(status)
        }
    }

    public reloadScene(index: number): void {
        if (index >= 0 && index < this.sceneList.length) {
            this.sceneList[index].reload()
        }
    }
}

export default SceneManager
