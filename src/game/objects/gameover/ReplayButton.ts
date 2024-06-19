import Image from '../../../engine/base-classes/Image'
import Message from '../../../engine/controllers/Message'
import Vector2D from '../../../engine/utils/Vector2D'
import sprite from '../../../engine/utils/sprites'

class ReplayButton extends Image {
    private clicked: boolean
    private callbackList: Function[]
    private mouseStatus: string
    private isActive: boolean

    constructor(location: Vector2D) {
        super(location, sprite.PLAY_BUTTON_SPRITE.clip)
        this.callbackList = []
        this.clicked = false
        this.isActive = false
        this.mouseStatus = 'down'
    }

    public handleInput(message: Message): void {
        if (this.isActive) {
            const e = message.getEvent()
            if (e instanceof Event) {
                if (e instanceof MouseEvent) {
                    if (e.x >= this.location.getX() && e.y >= this.location.getY()) {
                        if (
                            e.x <= this.location.getX() + this.getWidth() &&
                            e.y <= this.location.getY() + this.getHeight()
                        ) {
                            if (e.type == 'mousedown') {
                                if (this.mouseStatus == 'down') {
                                    this.mouseStatus = 'up'
                                }
                            } else if (e.type == 'mouseup') {
                                if (this.mouseStatus == 'up') {
                                    this.callbackList.forEach((callback) => {
                                        callback()
                                    })
                                }
                            }
                        } else {
                            this.mouseStatus = 'down'
                        }
                    } else {
                        this.mouseStatus = 'down'
                    }
                }
            }
        }
    }

    public setActive(active: boolean): void {
        this.isActive = active
    }

    public attach(callback: Function): void {
        this.callbackList.push(callback)
    }

    public update(timeInterval: number): void {}
}

export default ReplayButton
