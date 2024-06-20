import Collider from '../components/Collider'
import Vector2D from './Vector2D'

export type SpriteClip = {
    coor: Vector2D
    width: number
    height: number
    scale: number
}

export type TexInfo = {
    width: number
    height: number
    texture: WebGLTexture
}
