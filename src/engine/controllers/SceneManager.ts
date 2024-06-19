import Drawer from '../utils/Drawer'
import GameObject from '../base-classes/GameObject'
import Scene from '../base-classes/Scene'

class SceneManager {
    private canvas: HTMLCanvasElement
    private drawer: Drawer
    private currentScene: Scene
    private toAddObjectList: GameObject[]
    private toRemoveObjectList: GameObject[]
    private static instance: SceneManager

    private constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.drawer = new Drawer(this.canvas)
        this.toAddObjectList = []
        this.toRemoveObjectList = []
    }

    public static getInstance(): SceneManager {
        if (!this.instance) {
            this.instance = new SceneManager()
        }
        return this.instance
    }

    public handleInput(e: Event): void {
        this.currentScene.handleInput(e)
    }

    public update(timeInterval: number): void {
        this.currentScene.update(timeInterval)
        this.synchronize()
    }

    public render(): void {
        this.currentScene.render(this.drawer)
        document.body.appendChild(this.canvas)
    }

    private synchronize(): void {
        this.toAddObjectList.forEach((obj) => {
            this.currentScene.addObject(obj)
        })
        this.toAddObjectList.length = 0

        this.toRemoveObjectList.forEach((obj) => {
            this.currentScene.removeObject(obj)
        })
        this.toRemoveObjectList.length = 0
    }

    public addObjectToScene(obj: GameObject): void {
        this.toAddObjectList.push(obj)
    }

    public removeObjectFromScene(obj: GameObject): void {
        this.toRemoveObjectList.push(obj)
    }

    public attachScene(scene: Scene): void {
        this.currentScene = scene
    }
}

export default SceneManager
