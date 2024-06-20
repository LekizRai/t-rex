import Vector2D from '../types/Vector2D'

class Collider {
    private origin: Vector2D
    private width: number
    private height: number

    constructor(origin: Vector2D, width: number, height: number) {
        this.origin = origin
        this.width = width
        this.height = height
    }

    public getOrigin(): Vector2D {
        return this.origin
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public setOrigin(origin: Vector2D): void {
        this.origin = origin
    }

    public setWidth(width: number): void {
        this.width = width
    }

    public setHeight(height: number): void {
        this.height = height
    }
}

export default Collider
