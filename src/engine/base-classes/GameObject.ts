import Collider from '../components/Collider'
import RigidBody from '../components/RigidBody'
import InputHandler from '../controllers/InputHandler'
import PhysicsManager from '../controllers/PhysicsManager'
import SceneManager from '../controllers/SceneManager'
import Drawer from '../utils/Drawer'
import Vector2D from '../utils/Vector2D'
import Scene from './Scene'

abstract class GameObject {
    protected location: Vector2D
    protected colliderList: Collider[]
    protected rigidBody: RigidBody

    protected inputHandler: InputHandler
    protected sceneManager: SceneManager
    protected physicsManager: PhysicsManager

    constructor(location: Vector2D) {
        this.location = location.copy()
        this.colliderList = []
        this.rigidBody = new RigidBody(0, 0, 0)

        this.inputHandler = InputHandler.getInstance()
        this.sceneManager = SceneManager.getInstance()
        this.physicsManager = PhysicsManager.getInstance()
    }

    public getLocation(): Vector2D {
        return this.location
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
                let l1: Vector2D
                let r1: Vector2D
                let l2: Vector2D
                let r2: Vector2D
                l1 = this.colliderList[i].getOrigin()
                l1 = l1.add(this.location)
                r1 = new Vector2D(l1.getX() + this.colliderList[i].getWidth(), l1.getY() + this.colliderList[i].getHeight())
                l2 = obj.colliderList[j].getOrigin()
                l2 = l2.add(obj.location)
                r2 = new Vector2D(l2.getX() + obj.colliderList[j].getWidth(), l2.getY() + obj.colliderList[j].getHeight())
                if (l1.getX() === r1.getX() || l1.getY() === r1.getY() || l2.getX() === r2.getX() || l2.getY() === r2.getY()) {
                    continue
                }
                if (r1.getX() - l2.getX() < 0 || r2.getX() - l1.getX() < 0) {
                    continue
                }
                if (r1.getY() - l2.getY() < 0 || r2.getY() - l1.getY() < 0) {
                    continue
                }
                return true
            }
        }
        return false
    }

    public abstract handleInput(e: Event): void
    public abstract update(timeInterval: number): void
    public abstract render(drawer: Drawer): void
}

export default GameObject
