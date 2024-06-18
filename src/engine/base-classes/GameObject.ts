import Collider from '../components/Collider'
import RigidBody from '../components/RigidBody'
import { Coor2D } from '../types/general'
import Drawer from '../utils/Drawer'

abstract class GameObject {
    protected canvasLocation: Coor2D
    // protected locationAdjust: Coor2D
    protected colliderList: Collider[]
    protected rigidBody: RigidBody

    constructor() {
        this.colliderList = []
    }

    public getDisplayLocation(): Coor2D {
        return this.canvasLocation
    }

    public setColliderList(colliderList: Collider[]): void {
        this.colliderList = colliderList
    }

    public setRigidBody(rig: RigidBody): void {
        this.rigidBody = rig
    }

    public isCollied(obj: GameObject): boolean {
        for (let i: number = 0; i < this.colliderList.length; i++) {
            for (let j: number = 0; j < obj.colliderList.length; j++) {
                let l1, r1, l2, r2: Coor2D
                l1 = Object.assign({}, this.colliderList[i].getOrigin())
                l1.x += this.canvasLocation.x
                l1.y += this.canvasLocation.y
                r1 = {
                    x: l1.x + this.colliderList[i].getWidth(),
                    y: l1.y + this.colliderList[i].getHeight(),
                }
                l2 = Object.assign({}, obj.colliderList[j].getOrigin())
                l2.x += obj.canvasLocation.x
                l2.y += obj.canvasLocation.y
                r2 = {
                    x: l2.x + obj.colliderList[j].getWidth(),
                    y: l2.y + obj.colliderList[j].getHeight(),
                }
                if (l1.x === r1.x || l1.y === r1.y || l2.x === r2.x || l2.y === r2.y) {
                    continue
                }
                if (r1.x - l2.x < 0 || r2.x - l1.x < 0) {
                    continue
                }
                if (r1.y - l2.y < 0 || r2.y - l1.y < 0) {
                    continue
                }
                return true
            }
        }
        return false
    }

    public abstract handleInput(e: Event): void
    public abstract update(timeInterval: number): void
    public abstract draw(drawer: Drawer): void
}

export default GameObject
