import Message from '../controllers/Message'
import Vector2D from '../types/Vector2D'
import { SpriteClip } from '../types/general'
import Image from './Image'

abstract class Button extends Image {
    private callbackList: Function[]
    private clicked: boolean
    private isActive: boolean
    private mouseDown: boolean

    constructor(location: Vector2D, sprite: SpriteClip, zIndex?: number) {
        if (zIndex) {
            super(location, sprite, zIndex)
        } else {
            super(location, sprite)
        }
        this.callbackList = []
        this.clicked = true
        this.isActive = true
        this.mouseDown = true
    }

    public handleInput(message: Message): void {
        if (this.isActive) {
            const e = message.getEvent()
            if (e instanceof Event) {
                if (e instanceof MouseEvent) {
                    if (e.x >= this.getLocation().getX() && e.y >= this.getLocation().getY()) {
                        if (
                            e.x <= this.getLocation().getX() + this.getWidth() &&
                            e.y <= this.getLocation().getY() + this.getHeight()
                        ) {
                            if (!this.clicked) {
                                this.callbackList.forEach((callback) => {
                                    callback()
                                })
                            } else {
                                if (e.type == 'mousedown') {
                                    if (this.mouseDown) {
                                        this.mouseDown = false
                                    }
                                } else if (e.type == 'mouseup') {
                                    if (!this.mouseDown) {
                                        this.callbackList.forEach((callback) => {
                                            callback()
                                        })
                                    }
                                }
                            }
                        } else {
                            this.mouseDown = true
                        }
                    } else {
                        this.mouseDown = true
                    }
                }
            }
        }
    }

    public setClicked(status: boolean) {
        this.clicked = status
    }

    public setActive(status: boolean) {
        this.isActive = status
    }

    public attach(callback: Function): void {
        this.callbackList.push(callback)
    }
}

export default Button
