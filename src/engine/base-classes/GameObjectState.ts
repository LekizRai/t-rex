import GameObject from './GameObject'

abstract class GameObjectState {
    constructor() {}
    public abstract handleInput(obj: GameObject, e: Event): void
    public abstract update(obj: GameObject, timeInterval: number): void
}

export default GameObjectState
