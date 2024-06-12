import { m4, createShader, createProgram } from './utils'

export class Drawer {
    public gl: WebGLRenderingContext

    public program: WebGLProgram

    public vertexSource: string
    public fragmentSource: string

    public positionLocation: number
    public texcoordLocation: number

    public resolutionUniformLocation: WebGLUniformLocation | null
    public colorUniformLocation: WebGLUniformLocation | null
    public textureLocation: WebGLUniformLocation | null
    public matrixLocation: WebGLUniformLocation | null
    public textureMatrixLocation: WebGLUniformLocation | null

    public positionBuffer: WebGLBuffer | null
    public texcoordBuffer: WebGLBuffer | null

    constructor(canvas: any) {
        // Initialize webGL object for rendering
        this.gl = canvas.getContext('webgl')
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
        this.gl.enable(this.gl.BLEND)
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)

        // Declare sources for shaders
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
        // Create vertex and fragment shaders as well as program for WebGL
        var vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, this.vertexSource)
        var fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragmentSource)
        this.program = createProgram(this.gl, vertexShader, fragmentShader)

        // Look up where the vertex data needs to go
        this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position')
        this.texcoordLocation = this.gl.getAttribLocation(this.program, 'a_texcoord')

        // Lookup uniforms
        this.matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix')
        this.textureMatrixLocation = this.gl.getUniformLocation(this.program, 'u_textureMatrix')
        this.textureLocation = this.gl.getUniformLocation(this.program, 'u_texture')

        // Create position and texture coordination buffers
        this.positionBuffer = this.gl.createBuffer()
        this.texcoordBuffer = this.gl.createBuffer()
    }

    public loadImageAndCreateTextureInfo(url: string) {
        // Initialize texture
        var tex = this.gl.createTexture()
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

        // Do something for image loading
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR)

        var textureInfo = {
            width: 1,
            height: 1,
            texture: tex,
        }

        // Create new Image object
        var img = new Image()
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

    draw(
        tex: any,
        srcX: number,
        srcY: number,
        srcWidth: number,
        srcHeight: number,
        dstX: number,
        dstY: number,
        dstWidth: number,
        dstHeight: number
    ) {
        // Tell WebGL how to convert from clip space to pixels
        // Put a unit quad in the buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
        var positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)

        // Put texcoords in the buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer)
        var texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texcoords), this.gl.STATIC_DRAW)

        // creates a texture info { width: w, height: h, texture: tex }
        // The texture will start with 1x1 pixels and be updated
        // when the image has loaded
        var something = this
        var textureInfos = tex
        var drawInfo = {
            x: 110,
            y: 110,
            dx: 1,
            dy: 1,
            textureInfo: textureInfos,
        }

        if (something.gl) {
            // gl.canvas.width = canvas.width
            // gl.canvas.height = canvas.height

            // var dstX = drawInfo.x
            // var dstY = drawInfo.y
            // var dstWidth = 100
            // var dstHeight = 100
            // var srcX = 0
            // var srcY = 0
            // var srcWidth = 100
            // var srcHeight = 100
            something.drawImage(
                drawInfo.textureInfo.texture,
                drawInfo.textureInfo.width,
                drawInfo.textureInfo.height,
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
        var something = this
    }

    clear() {
        // this.gl.clearColor(1.0, 1.0, 1.0, 1.0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }

    drawImage(
        tex: WebGLTexture | null,
        texWidth: any,
        texHeight: any,
        srcX: any,
        srcY: any,
        srcWidth: any,
        srcHeight: any,
        dstX: any,
        dstY: any,
        dstWidth: any,
        dstHeight: any
    ) {
        if (this.gl) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex)

            // Tell WebGL to use our shader program pair
            this.gl.useProgram(this.program)

            // Setup the attributes to pull data from our buffers
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
            this.gl.enableVertexAttribArray(this.positionLocation)
            this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0)
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer)
            this.gl.enableVertexAttribArray(this.texcoordLocation)
            this.gl.vertexAttribPointer(this.texcoordLocation, 2, this.gl.FLOAT, false, 0, 0)

            // this matrix will convert from pixels to clip space
            var matrix = m4.orthographic(0, this.gl.canvas.width, this.gl.canvas.height, 0, -1, 1)

            // this matrix will translate our quad to dstX, dstY
            matrix = m4.translate(matrix, dstX, dstY, 0)

            // this matrix will scale our 1 unit quad
            // from 1 unit to texWidth, texHeight units
            matrix = m4.scale(matrix, dstWidth, dstHeight, 1)

            // Set the matrix.
            this.gl.uniformMatrix4fv(this.matrixLocation, false, matrix)

            var texMatrix = m4.translation(srcX / texWidth, srcY / texHeight, 0)
            texMatrix = m4.scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1)

            this.gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix)

            // Tell the shader to get the texture from texture unit 0
            this.gl.uniform1i(this.textureLocation, 0)

            // draw the quad (2 triangles, 6 vertices)
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
        }
    }

    drawPolygons(positions: any, color: any) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
        this.gl.useProgram(this.program)
        this.gl.uniform2f(this.resolutionUniformLocation, window.innerWidth, window.innerHeight)
        this.gl.uniform4f(this.colorUniformLocation, 1, 0, color, 1)
        this.gl.enableVertexAttribArray(this.positionLocation)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
        this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
    }
}
