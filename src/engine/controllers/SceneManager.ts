import Drawer from '../utils/Drawer'
import GameObject from '../base-classes/GameObject'
import Scene from '../base-classes/Scene'
import Message from './Message'

class SceneManager {
    private canvas: HTMLCanvasElement

    private toAddObjectList: GameObject[]
    private toRemoveObjectList: GameObject[]
    private currentScene: Scene

    private static instance: SceneManager

    private constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.toAddObjectList = []
        this.toRemoveObjectList = []

        Drawer.init(this.canvas)
    }

    public static getInstance(): SceneManager {
        if (!this.instance) {
            this.instance = new SceneManager()
        }
        return this.instance
    }

    public handleInput(message: Message): void {
        this.currentScene.handleInput(message)
    }

    public update(timeInterval: number): void {
        this.currentScene.update(timeInterval)
        this.synchronize()
    }

    public render(): void {
        this.currentScene.render()
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
