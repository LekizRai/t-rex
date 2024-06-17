export type SpriteClip = {
    coor: Coor2D
    width: number
    height: number
    scale: number
}

export type TexInfo = {
    width: number
    height: number
    texture: WebGLTexture
}

export type Coor2D = {
    x: number
    y: number
}

export type Coor3D = {
    x: number
    y: number
    z: number
}
