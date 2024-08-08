import config from '../../utils/configs'
import utils from '../../../engine/utils/utils'
import GameObject from '../../../engine/objects/base-classes/GameObject'
import Vector2D from '../../../engine/types/Vector2D'
import Image from '../../../engine/objects/Image'
import Ground from './Ground'
import Scene from '../../../engine/scene/Scene'

class GroundGroup extends GameObject {
    private objectList: Ground[]
    private velocityChangingInterval: number

    constructor() {
        const relativeLocation = new Vector2D(0, 0)
        super(relativeLocation)
        this.objectList = []
        this.setVelocityX(config.GROUND_VELOCITY_X)
        this.velocityChangingInterval = config.VELOCITY_CHANGING_INTERVAL
    }

    public addObject(obj: Ground): void {
        this.objectList.push(obj)
    }

    private removeObject(obj: Ground): void {
        const index: number = this.objectList.indexOf(obj)
        if (index > -1) {
            this.objectList.splice(index, 1)
        }
    }

    public clearObjectList(): void {
        this.objectList.length = 0
    }

    public update(timeInterval: number): void {
        this.objectList.forEach((obj) => {
            obj.update(timeInterval)
        })

        for (let i = 0; i < this.objectList.length; i++) {
            if (this.objectList[i].getX() + this.objectList[i].getWidth() < 0) {
                let newLocation = new Vector2D(
                    this.objectList[i].getX() + this.objectList[i].getWidth() * 3,
                    this.objectList[i].getY()
                )
                const newGround: Ground = new Ground(newLocation)
                newGround.setVelocityX(this.getVelocityX())
                this.addObject(newGround)
                this.objectList[i].destroy()
                this.removeObject(this.objectList[i])
                break
            }
        }

        if (this.velocityChangingInterval - timeInterval < 0) {
            this.velocityChangingInterval = config.VELOCITY_CHANGING_INTERVAL
            this.setVelocityX(this.getVelocityX() + 1)
            this.objectList.forEach((obj) => {
                obj.setVelocityX(this.getVelocityX())
            })
        } else {
            this.velocityChangingInterval -= timeInterval
        }
    }

    public render(): void {
        this.objectList.forEach((obj) => {
            obj.render()
        })
    }

    public setup(): void {
        let location = config.GROUND_CANVAS_LOCATION.copy()
        let ground: Ground
        for (let i = 0; i < 3; i++) {
            ground = new Ground(location)
            this.addObject(ground)
            location = new Vector2D(location.getX() + ground.getWidth(), location.getY())
        }
    }
}

export default GroundGroup
