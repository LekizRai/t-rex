import { Coor2D } from '../../../engine/types/general'
import utils from '../../../engine/utils/utils'
import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Figure from '../../../engine/base-classes/Figure'
import TRex from '../trex/TRex'
import SceneManager from '../../../engine/controllers/SceneManager'
import Collider from '../../../engine/components/Collider'
import RigidBody from '../../../engine/components/RigidBody'

class Cactus extends Figure {
    private scene: SceneManager
    constructor(scene: SceneManager, canvasLocation: Coor2D) {
        let index: number = utils.randomInt(0, 6)
        let adjust = sprite.CACTUS_SPRITES[index].adjust
        canvasLocation = Object.assign({}, canvasLocation)
        canvasLocation.x += adjust.x
        canvasLocation.y += adjust.y
        super(
            sprite.CACTUS_SPRITES[index].clip,
            canvasLocation,
            config.CACTUS_VELOCITY_X,
            config.CACTUS_VELOCITY_Y
        )
        this.setColliderList(
            [new Collider({x: 0, y: 0}, this.getDisplayWidth(), this.getDisplayHeight())]
        )
        this.setRigidBody(new RigidBody(config.CACTUS_VELOCITY_X, config.CACTUS_VELOCITY_Y, 0))
        
        this.scene = scene
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {
        let shift = Math.floor((timeInterval / 1000) * config.CACTUS_VELOCITY_X)
        this.canvasLocation.x -= shift
        if (this.canvasLocation.x + this.getDisplayWidth() < 0) {
            this.scene.removeObject(this)
        }
    }

    public isCollided(obj: TRex): boolean {
        let widthTruncation, heightTruncation: number
        widthTruncation = 5
        heightTruncation = 16
        let l1, r1, l2, r2: Coor2D
        l1 = this.canvasLocation
        r1 = {
            x: l1.x + this.getDisplayWidth(),
            y: l1.y + this.getDisplayHeight(),
        }
        l2 = obj.getDisplayLocation()
        r2 = {
            x: l2.x + obj.getDisplayWidth(),
            y: l2.y + obj.getDisplayHeight(),
        }

        if (l1.x === r1.x || l1.y === r1.y || l2.x === r2.x || l2.y === r2.y) {
            return false
        }

        if (-l2.x + r1.x < widthTruncation || -l1.x + r2.x < heightTruncation) {
            return false
        }

        if (-l2.y + r1.y < widthTruncation || -l1.y + r2.y < heightTruncation) {
            return false
        }

        return true
    }
}

export default Cactus
