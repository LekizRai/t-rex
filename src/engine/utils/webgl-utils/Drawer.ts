import { TexInfo } from '../../types/general'
import utils from './webGLUtils'

class Drawer {
    private gl: WebGLRenderingContext

    private program: WebGLProgram

    private vertexSource: string
    private fragmentSource: string

    private positionLocation: number
    private texcoordLocation: number

    // private resolutionUniformLocation: WebGLUniformLocation
    // private colorUniformLocation: WebGLUniformLocation
    private textureLocation: WebGLUniformLocation
    private matrixLocation: WebGLUniformLocation
    private textureMatrixLocation: WebGLUniformLocation

    private positionBuffer: WebGLBuffer
    private texcoordBuffer: WebGLBuffer

    private static instance: Drawer
    private static canvas: HTMLCanvasElement

    private constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl')
        if (gl) {
            this.gl = gl
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
            this.gl.enable(this.gl.BLEND)
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
            this.gl.clearColor(1.0, 1.0, 1.0, 1.0)
            this.gl.clear(this.gl.COLOR_BUFFER_BIT)

            this.vertexSource = `
attribute vec4 a_position;
attribute vec2 a_texcoord;

uniform mat4 u_matrix;
uniform mat4 u_textureMatrix;

varying vec2 v_texcoord;

void main() {
    gl_Position = u_matrix * a_position;
    v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;
}
`
            this.fragmentSource = `
precision mediump float;

varying vec2 v_texcoord;
uniform sampler2D u_texture;

void main() {
    gl_FragColor = texture2D(u_texture, v_texcoord);
}
`

            let vertexShader = utils.createShader(this.gl, this.gl.VERTEX_SHADER, this.vertexSource)
            let fragmentShader = utils.createShader(
                this.gl,
                this.gl.FRAGMENT_SHADER,
                this.fragmentSource
            )

            if (vertexShader && fragmentShader) {
                const program = utils.createProgram(this.gl, vertexShader, fragmentShader)
                if (program) this.program = program
            }

            this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position')
            this.texcoordLocation = this.gl.getAttribLocation(this.program, 'a_texcoord')

            const matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix')
            if (matrixLocation) {
                this.matrixLocation = matrixLocation
            }

            const textureMatrixLocation = this.gl.getUniformLocation(
                this.program,
                'u_textureMatrix'
            )
            if (textureMatrixLocation) {
                this.textureMatrixLocation = textureMatrixLocation
            }

            const textureLocation = this.gl.getUniformLocation(this.program, 'u_texture')
            if (textureLocation) {
                this.textureLocation = textureLocation
            }

            const positionBuffer = this.gl.createBuffer()
            if (positionBuffer) {
                this.positionBuffer = positionBuffer
            }

            const texcoordBuffer = this.gl.createBuffer()
            if (texcoordBuffer) {
                this.texcoordBuffer = texcoordBuffer
            }
        }
    }

    public static init(canvas: HTMLCanvasElement): void {
        this.canvas = canvas
    }

    public static getInstance(): Drawer {
        if (!this.instance) {
            this.instance = new Drawer(Drawer.canvas)
        }
        return this.instance
    }

    public loadImageAndCreateTextureInfo(url: string): TexInfo {
        const tex = this.gl.createTexture()
        if (tex) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex)
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                1,
                1,
                0,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                new Uint8Array([255, 255, 255, 255])
            )

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR)

            let textureInfo = {
                width: 1,
                height: 1,
                texture: tex,
            }

            let img = new Image()
            img.addEventListener('load', (e) => {
                textureInfo.width = img.width
                textureInfo.height = img.height

                if (this.gl) {
                    this.gl.bindTexture(this.gl.TEXTURE_2D, textureInfo.texture)
                    this.gl.texImage2D(
                        this.gl.TEXTURE_2D,
                        0,
                        this.gl.RGBA,
                        this.gl.RGBA,
                        this.gl.UNSIGNED_BYTE,
                        img
                    )
                }
            })
            img.src = url
            return textureInfo
        }
        return { width: 0, height: 0, texture: WebGLTexture }
    }

    public draw(
        tex: TexInfo,
        srcX: number,
        srcY: number,
        srcWidth: number,
        srcHeight: number,
        dstX: number,
        dstY: number,
        dstWidth: number,
        dstHeight: number
    ): void {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
        let positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer)
        let texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texcoords), this.gl.STATIC_DRAW)

        this.drawImage(
            tex.texture,
            tex.width,
            tex.height,
            srcX,
            srcY,
            srcWidth,
            srcHeight,
            dstX,
            dstY,
            dstWidth,
            dstHeight
        )
    }

    public clear(): void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }

    private drawImage(
        tex: WebGLTexture,
        texWidth: number,
        texHeight: number,
        srcX: number,
        srcY: number,
        srcWidth: number,
        srcHeight: number,
        dstX: number,
        dstY: number,
        dstWidth: number,
        dstHeight: number
    ): void {
        if (this.gl) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex)
            this.gl.useProgram(this.program)

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
            this.gl.enableVertexAttribArray(this.positionLocation)
            this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0)

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer)
            this.gl.enableVertexAttribArray(this.texcoordLocation)
            this.gl.vertexAttribPointer(this.texcoordLocation, 2, this.gl.FLOAT, false, 0, 0)

            let matrix = utils.m4.orthographic(
                0,
                this.gl.canvas.width,
                this.gl.canvas.height,
                0,
                -1,
                1
            )
            matrix = utils.m4.translate(matrix, dstX, dstY, 0)
            matrix = utils.m4.scale(matrix, dstWidth, dstHeight, 1)
            this.gl.uniformMatrix4fv(this.matrixLocation, false, matrix)

            let texMatrix = utils.m4.translation(srcX / texWidth, srcY / texHeight, 0)
            texMatrix = utils.m4.scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1)
            this.gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix)

            this.gl.uniform1i(this.textureLocation, 0)
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
        }
    }

    // public drawPolygons(positions: number[], color: number): void {
    //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
    //     this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)
    //     this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
    //     this.gl.useProgram(this.program)
    //     this.gl.uniform2f(this.resolutionUniformLocation, window.innerWidth, window.innerHeight)
    //     this.gl.uniform4f(this.colorUniformLocation, 1, 0, color, 1)
    //     this.gl.enableVertexAttribArray(this.positionLocation)
    //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
    //     this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0)
    //     this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
    // }
}

export default Drawer
