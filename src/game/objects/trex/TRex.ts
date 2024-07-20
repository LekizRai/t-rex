import sprite from '../../utils/sprites'
import config from '../../utils/configs'
import TRexState from './TRexState'
import Animation from '../../../engine/objects/Animation'
import Vector2D from '../../../engine/types/Vector2D'
import Message from '../../../engine/controllers/Message'
import GameObject from '../../../engine/objects/base-classes/GameObject'

const trexStartSpriteList = [sprite.TREX_SPRITES[7].clip]
const trexStartAdjustList = [sprite.TREX_SPRITES[7].adjust]

class TRex extends Animation {
    private onCollideWithDictionary: {[obj: string]: (() => void)[]}
    private onCollideWithList: GameObject[]

    constructor(location: Vector2D, zIndex?: number) {
        if (zIndex) {
            super(location, config.TREX_CHANGING_INTERVAL, trexStartSpriteList, zIndex)
        } else {
            super(location, config.TREX_CHANGING_INTERVAL, trexStartSpriteList)
        }
        this.setTex(this.resourceManager.getTex(0))

        this.setState(new TRexState.TRexStartState())
        this.setAdjustList(trexStartAdjustList)

        this.onCollideWithDictionary = {}
        this.onCollideWithList = []
    }

    public handleInput(message: Message): void {
        this.handleInputState(message)
    }

    public update(timeInterval: number): void {
        this.updateState(timeInterval)
        this.onCollideWithList.forEach((obj: GameObject) => {
            if (this.isColliedWith(obj)) {
                this.onCollideWithDictionary[JSON.stringify(obj)].forEach((callback: () => void) => {
                    callback()
                })
            }
        })
    }

    public onCollideWith(obj: GameObject, callback: () => void): void {
        if (!this.onCollideWithDictionary[JSON.stringify(obj)]) {
            this.onCollideWithDictionary[JSON.stringify(obj)] = []
        }
        this.onCollideWithDictionary[JSON.stringify(obj)].push(callback)
        if (this.onCollideWithList.indexOf(obj) < 0) {
            this.onCollideWithList.push(obj)
        }
    }
}

export default TRex
