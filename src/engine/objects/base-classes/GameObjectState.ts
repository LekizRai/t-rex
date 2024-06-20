import Message from '../../controllers/Message'
import GameObject from './GameObject'

abstract class GameObjectState {
    constructor() {}
    public abstract handleInput(obj: GameObject, message: Message): void
    public abstract update(obj: GameObject, timeInterval: number): void
}

export default GameObjectState
