import config from '../../utils/configs'
import utils from '../../../engine/utils/utils'
import GameObject from '../../../engine/objects/base-classes/GameObject'
import Image from '../../../engine/objects/Image'
import Animation from '../../../engine/objects/Animation'
import Vector2D from '../../../engine/types/Vector2D'
import Cloud from './Cloud'

class CloudGroup extends GameObject {
    private objectList: GameObject[]
    private cloudGeneratingInterval: number

    constructor() {
        const relativeLocation: Vector2D = new Vector2D(0, 0)
        super(relativeLocation)
        this.objectList = []
        this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL
    }

    private addObject(obj: GameObject): void {
        this.objectList.push(obj)
    }

    private removeObject(obj: GameObject): void {
        const index: number = this.objectList.indexOf(obj)
        if (index > -1) {
            this.objectList.splice(index, 1)
        }
    }

    public clearObjectList(): void {
        this.objectList.length = 0
    }

    public update(timeInterval: number): void {
        if (this.cloudGeneratingInterval - timeInterval < 0) {
            this.cloudGeneratingInterval = config.CLOUD_GENERATING_INTERVAL
            this.spawn()
        } else {
            this.cloudGeneratingInterval -= timeInterval
        }

        let removedObjectList: GameObject[] = []
        this.objectList.forEach((obj: GameObject) => {
            if (obj instanceof Image || obj instanceof Animation) {
                if (obj.getX() + obj.getWidth() < 0) {
                    removedObjectList.push(obj)
                }
            }
        })
        removedObjectList.forEach((obj: GameObject) => {
            this.removeObject(obj)
            this.getScene().removeObject(obj)
            obj.destroy()
        })
    }

    public spawn(): void {
        const newY: number = utils.randomInt(config.CLOUD_LOW_Y, config.CLOUD_HIGH_Y)
        const newLocation: Vector2D = config.CLOUD_CANVAS_LOCATION.copy()
        newLocation.setY(newY)
        const newCloud = new Cloud(newLocation)
        this.addObject(newCloud)
        this.getScene().addObject(newCloud)
    }
}

export default CloudGroup
