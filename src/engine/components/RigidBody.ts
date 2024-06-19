import PhysicsManager from "../controllers/PhysicsManager"

class RigidBody {
    private velocityX: number
    private velocityY: number
    private shiftX: number
    private shiftY: number
    private accelerationEffect: boolean
    private mass: number

    constructor(velocityX: number, velocityY: number, mass: number) {
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.shiftX = 0
        this.shiftY = 0
        this.accelerationEffect = false
        this.mass = mass

        const physicsManager = PhysicsManager.getInstance()
        physicsManager.attach(this)
    }

    public getVelocityX(): number {
        return this.velocityX
    }

    public getVelocityY(): number {
        return this.velocityY
    }

    public setVelocityX(velocityX: number): void {
        this.velocityX = velocityX
    }

    public setVelocityY(velocityY: number): void {
        this.velocityY = velocityY
    }

    public getMass(): number {
        return this.mass
    }

    public setMass(mass: number): void {
        this.mass = mass
    }

    public getAccelerationEffect(): boolean {
        return this.accelerationEffect
    }

    public setAccelerationEffect(status: boolean): void {
        this.accelerationEffect = status
    }

    public getShiftX(): number {
        return this.shiftX
    }

    public setShiftX(shiftX: number): void {
        this.shiftX = shiftX
    }

    public getShiftY(): number {
        return this.shiftY
    }

    public setShiftY(shiftY: number): void {
        this.shiftY = shiftY
    }
}

export default RigidBody
