import RigidBody from '../components/RigidBody'

class PhysicsManager {
    private rigidBodyList: RigidBody[]
    private accelerationX: number
    private accelerationY: number

    private static instance: PhysicsManager

    private constructor() {
        this.rigidBodyList = []
    }

    public static getInstance(): PhysicsManager {
        if (!this.instance) {
            this.instance = new PhysicsManager()
        }
        return this.instance
    }

    public setAccelerationX(accelerationX: number): void {
        this.accelerationX = accelerationX
    }

    public setAccelerationY(accelerationY: number): void {
        this.accelerationY = accelerationY
    }

    public attach(rig: RigidBody): void {
        this.rigidBodyList.push(rig)
    }

    public detach(rig: RigidBody): void {
        const index: number = this.rigidBodyList.indexOf(rig)
        if (index > -1) {
            this.rigidBodyList.splice(index, 1)
        }
    }

    public update(timeInterval: number): void {
        let time = timeInterval / 1000
        this.rigidBodyList.forEach((rig) => {
            if (rig.getPhysicsEffect()) {
                if (rig.getAccelerationEffect()) {
                    rig.setShiftX(
                        Math.floor(
                            0.5 * this.accelerationX * time * time + rig.getVelocityX() * time
                        )
                    )
                    rig.setShiftY(
                        Math.floor(
                            0.5 * this.accelerationY * time * time + rig.getVelocityY() * time
                        )
                    )
                    rig.setVelocityX(Math.floor(rig.getVelocityX() + this.accelerationX * time))
                    rig.setVelocityY(Math.floor(rig.getVelocityY() + this.accelerationY * time))
                } else {
                    rig.setShiftX(Math.floor(rig.getVelocityX() * time))
                    rig.setShiftY(Math.floor(rig.getVelocityY() * time))
                }
            }
        })
    }
}

export default PhysicsManager
