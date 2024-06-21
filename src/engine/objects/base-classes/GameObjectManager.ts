import GameObject from './GameObject'

abstract class GameObjectManager {
    constructor() {}

    public abstract spawn(): GameObject
}

export default GameObjectManager
