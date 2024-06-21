class Vector2D {
    private x
    private y
    
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
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

    public add(vec: Vector2D): Vector2D {
        let returned_vec = new Vector2D(0, 0)
        returned_vec.setX(this.x + vec.getX())
        returned_vec.setY(this.y + vec.getY())
        return returned_vec
    }

    public sub(vec: Vector2D): Vector2D {
        let returned_vec = new Vector2D(0, 0)
        returned_vec.setX(this.x - vec.getX())
        returned_vec.setY(this.y - vec.getY())
        return returned_vec
    }

    public assign(vec: Vector2D) {
        this.x = vec.getX()
        this.y = vec.getY()
    }

    public copy(): Vector2D {
        return new Vector2D(this.x, this.y)
    }
}

export default Vector2D
