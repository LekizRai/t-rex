import sprite from '../../../engine/utils/sprites'
import config from '../../../engine/utils/configs'
import Image from '../../../engine/base-classes/Image'
import SceneManager from '../../../engine/controllers/SceneManager'
import Vector2D from '../../../engine/utils/Vector2D'
import Scene from '../../../engine/base-classes/Scene'

class Cloud extends Image {
    private scene: Scene
    
    constructor(scene: Scene, location: Vector2D) {
        super(location, sprite.CLOUD_SPRITE.clip)
        this.scene = scene
    }

    public handleInput(e: Event): void {}

    public update(timeInterval: number): void {
        let shift = Math.floor((timeInterval / 1000) * config.CLOUD_VELOCITY_X)
        this.location.setX(this.location.getX() - shift)
        if (this.location.getX() + this.getWidth() < 0) {
            this.scene.removeObject(this)
        }
    }
}

export default Cloud
