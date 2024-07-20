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
            scene.render()
        })
        document.body.appendChild(this.canvas)
    }

    public addScene(scene: Scene): void {
        this.sceneList.push(scene)
    }

    public setSceneWidth(width: number): void {
        this.canvas.width = width
    }

    public setSceneHeight(height: number): void {
        this.canvas.height = height
    }

    // public setSceneStatus(index: number, status: boolean): void {
    //     if (index >= 0 && index < this.sceneList.length) {
    //         this.sceneList[index].setActive(status)
    //     }
    // }

    public reloadScene(index: number): void {
        if (index >= 0 && index < this.sceneList.length) {
            this.sceneList[index].setIsRendered(true)
            this.sceneList[index].setIsUpdated(true)
            this.sceneList[index].reload()
        }
    }

    public startScene(index: number): void {
        if (index >= 0 && index < this.sceneList.length) {
            this.sceneList[index].setIsRendered(true)
            this.sceneList[index].setIsUpdated(true)
            this.sceneList[index].reload()
        }
    }

    public stopScene(index: number): void {
        if (index >= 0 && index < this.sceneList.length) {
            this.sceneList[index].setIsRendered(false)
            this.sceneList[index].setIsUpdated(false)
        }
    }

    public pauseScene(index: number): void {
        if (index >= 0 && index < this.sceneList.length) {
            this.sceneList[index].setIsUpdated(false)
        }
    }

    public resumeScene(index: number): void {
        if (index >= 0 && index < this.sceneList.length) {
            this.sceneList[index].setIsUpdated(true)
        }
    }
}

export default SceneManager
