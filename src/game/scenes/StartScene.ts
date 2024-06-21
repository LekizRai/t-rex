import Message from '../../engine/controllers/Message'
import Scene from '../../engine/scene/Scene'
import TRex from '../objects/trex/TRex'
import config from '../utils/configs'

class StartScene extends Scene {
    public handleInput(message: Message): void {}
    public update(timeInterval: number): void {}
    public reload(): void {}
    public setup(): void {}
}
