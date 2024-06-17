import { Coor2D, SpriteClip, TexInfo } from '../types/general'
import Drawer from '../utils/Drawer'

abstract class GameObject {
    protected velocityX: number
    protected velocityY: number
    protected changingTimeLeft: number

    constructor() {}

    public abstract handleInput(e: Event): void

    public abstract draw(drawer: Drawer): void

    public abstract update(timeInterval: number): void
}

export default GameObject
