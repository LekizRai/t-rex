import Collider from '../components/Collider'
import RigidBody from '../components/RigidBody'
import InputHandler from '../controllers/InputHandler'
import Message from '../controllers/Message'
import PhysicsManager from '../controllers/PhysicsManager'
import ResourceManger from '../controllers/ResourceManager'
import SceneManager from '../controllers/SceneManager'
import { TexInfo } from '../types/general'
import Vector2D from '../utils/Vector2D'
import GameObjectState from './GameObjectState'

abstract class GameObject {
    protected location: Vector2D
    protected state: GameObjectState
    protected colliderList: Collider[]
    protected rigidBody: RigidBody

    protected inputHandler: InputHandler
    protected sceneManager: SceneManager
    protected physicsManager: PhysicsManager
    protected resourceManager: ResourceManger

    protected tex: TexInfo

    // Refining only
    protected box: TexInfo
    protected smallBox: TexInfo
    //

    constructor(location: Vector2D) {
        this.location = location.copy()
        this.colliderList = []
        this.rigidBody = new RigidBody(0, 0, 0)

        this.inputHandler = InputHandler.getInstance()
        this.sceneManager = SceneManager.getInstance()
        this.physicsManager = PhysicsManager.getInstance()
        this.resourceManager = ResourceManger.getInstance()

        // Refining only
        this.box = this.resourceManager.getTex(1)
        this.smallBox = this.resourceManager.getTex(2)
        //
    }

    // About location
    public getLocation(): Vector2D {
        return this.location
    }

    public setLocation(location: Vector2D): void {
        this.location = location.copy()
    }

    // About state
    public getState(): GameObjectState {
        return this.state
    }

    public setState(state: GameObjectState): void {
        this.state = state
    }

    // About collidder list
    public getColliderList(): Collider[] {
        return this.colliderList
    }
    
    public setColliderList(colliderList: Collider[]): void {
        this.colliderList = colliderList
    }

    public addCollider(col: Collider): void {
        this.colliderList.push(col)
    }

    public clearColliderList(): void {
        this.colliderList.length = 0
    }

    // About rigid body
    public setRigidBody(rig: RigidBody): void {
        this.rigidBody = rig
    }

    public getVelocityX(): number {
        return this.rigidBody.getVelocityX()
    }

    public setVelocityX(velocityX: number): void {
        this.rigidBody.setVelocityX(velocityX)
    }

    public getVelocityY(): number {
        return this.rigidBody.getVelocityY()
    }

    public setVelocityY(velocityY: number): void {
        this.rigidBody.setVelocityY(velocityY)
    }

    public getShiftX(): number {
        return this.rigidBody.getShiftX()
    }

    public getShiftY(): number {
        return this.rigidBody.getShiftY()
    }

    public setAccelerationEffect(status: boolean): void {
        this.rigidBody.setAccelerationEffect(status)
    }

    public setPhysicsEffect(status: boolean): void {
        this.rigidBody.setPhysicsEffect(status)
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
                r1 = new Vector2D(
                    l1.getX() + this.colliderList[i].getWidth(),
                    l1.getY() + this.colliderList[i].getHeight()
                )
                l2 = obj.colliderList[j].getOrigin()
                l2 = l2.add(obj.location)
                r2 = new Vector2D(
                    l2.getX() + obj.colliderList[j].getWidth(),
                    l2.getY() + obj.colliderList[j].getHeight()
                )
                // if (
                //     l1.getX() === r1.getX() ||
                //     l1.getY() === r1.getY() ||
                //     l2.getX() === r2.getX() ||
                //     l2.getY() === r2.getY()
                // ) {
                //     continue
                // }
                if (r1.getX() - l2.getX() <= -2 || r2.getX() - l1.getX() <= -2) {
                    continue
                }
                if (r1.getY() - l2.getY() <= -2 || r2.getY() - l1.getY() <= -2) {
                    continue
                }
                return true
            }
        }
        return false
    }

    public abstract handleInput(message: Message): void
    public abstract update(timeInterval: number): void
    public abstract render(): void
}

export default GameObject
