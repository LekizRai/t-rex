import GameObject from '../base-classes/GameObject'
import { Coor2D } from '../types/general'

class Collider {
    private origin: Coor2D
    private width: number
    private height: number

    constructor(origin: Coor2D, width: number, height: number) {
        this.origin = Object.assign({}, origin)
        this.width = width
        this.height = height
    }

    public getOrigin(): Coor2D {
        return this.origin
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public setOrigin(origin: Coor2D): void {
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
