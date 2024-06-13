import { keys } from '../utils/keys'
import { StateHandler } from './StateHandler'
import { Message } from './Message'

export class InputHandler {
    private stateHandler: StateHandler
    private message: Message

    constructor(stateHandler: StateHandler) {
        this.stateHandler = stateHandler
        this.message = new Message()
    }

    public init(): void {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case keys.ARROW_DOWN: {
                    this.message.setKeyCode(keys.ARROW_DOWN)
                    this.message.setStatus('down')
                    console.log(keys.ARROW_DOWN)
                    break
                }
                case keys.ARROW_UP: {
                    this.message.setKeyCode(keys.ARROW_UP)
                    this.message.setStatus('down')
                    console.log(keys.ARROW_UP)
                    break
                }
                case keys.SPACE: {
                    this.message.setKeyCode(keys.SPACE)
                    this.message.setStatus('down')
                    console.log(keys.SPACE)
                    break
                }
                case keys.PAUSE: {
                    this.message.setKeyCode(keys.PAUSE)
                    this.message.setStatus('down')
                    console.log(keys.PAUSE)
                    break
                }
            }
            this.stateHandler.notify(this.message)
        })

        document.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case keys.ARROW_DOWN: {
                    this.message.setKeyCode(keys.ARROW_DOWN)
                    this.message.setStatus('up')
                    console.log(keys.ARROW_DOWN)
                    break
                }
            }
            this.stateHandler.notify(this.message)
        })
    }
}
