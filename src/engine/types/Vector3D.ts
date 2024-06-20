class Vector3D {
    private x
    private y
    private z

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    public getX(): number {
        return this.x
    }

    public setX(x: number): void {
        this.x = x
    }

    public getY(): number {
        return this.y
    }

    public setY(y: number): void {
        this.y = y
    }

    public getZ(): number {
        return this.z
    }

    public setZ(z: number): void {
        this.z = z
    }

    public add(vec: Vector3D): Vector3D {
        let returned_vec = new Vector3D(0, 0, 0)
        returned_vec.setX(this.x + vec.getX())
        returned_vec.setY(this.y + vec.getY())
        returned_vec.setZ(this.z + vec.getZ())
        return returned_vec
    }

    public copy(): Vector3D {
        return new Vector3D(this.x, this.y, this.z)
    }
}

export default Vector3D
