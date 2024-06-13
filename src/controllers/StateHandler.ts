import { TRex } from '../objects/TRex'
import { Message } from './Message'

export class StateHandler {
    private subcriberList: TRex[]

    constructor() {
        this.subcriberList = []
    }

    public register(obj: TRex): void {
        this.subcriberList.push(obj)
    }

    public notify(message: Message): void {
        this.subcriberList.forEach((subcriber) => {
            subcriber.changeState(message)
        })
    }
}
