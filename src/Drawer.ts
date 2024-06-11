var m4 = {
    translation: function (tx: any, ty: any, tz: any) {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1]
    },

    xRotation: function (angleInRadians: number) {
        var c = Math.cos(angleInRadians)
        var s = Math.sin(angleInRadians)

        return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]
    },

    yRotation: function (angleInRadians: number) {
        var c = Math.cos(angleInRadians)
        var s = Math.sin(angleInRadians)

        return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]
    },

    zRotation: function (angleInRadians: number) {
        var c = Math.cos(angleInRadians)
        var s = Math.sin(angleInRadians)

        return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    },

    scaling: function (sx: any, sy: any, sz: any) {
        return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]
    },

    translate: function (m: any, tx: any, ty: any, tz: any) {
        return m4.multiply(m, m4.translation(tx, ty, tz))
    },

    xRotate: function (m: any, angleInRadians: any) {
        return m4.multiply(m, m4.xRotation(angleInRadians))
    },

    yRotate: function (m: any, angleInRadians: any) {
        return m4.multiply(m, m4.yRotation(angleInRadians))
    },

    zRotate: function (m: any, angleInRadians: any) {
        return m4.multiply(m, m4.zRotation(angleInRadians))
    },

    scale: function (m: any, sx: any, sy: any, sz: any) {
        return m4.multiply(m, m4.scaling(sx, sy, sz))
    },

    multiply: function (a: any[], b: any[]) {
        var b00 = b[0 * 4 + 0]
        var b01 = b[0 * 4 + 1]
        var b02 = b[0 * 4 + 2]
        var b03 = b[0 * 4 + 3]
        var b10 = b[1 * 4 + 0]
        var b11 = b[1 * 4 + 1]
        var b12 = b[1 * 4 + 2]
        var b13 = b[1 * 4 + 3]
        var b20 = b[2 * 4 + 0]
        var b21 = b[2 * 4 + 1]
        var b22 = b[2 * 4 + 2]
        var b23 = b[2 * 4 + 3]
        var b30 = b[3 * 4 + 0]
        var b31 = b[3 * 4 + 1]
        var b32 = b[3 * 4 + 2]
        var b33 = b[3 * 4 + 3]
        var a00 = a[0 * 4 + 0]
        var a01 = a[0 * 4 + 1]
        var a02 = a[0 * 4 + 2]
        var a03 = a[0 * 4 + 3]
        var a10 = a[1 * 4 + 0]
        var a11 = a[1 * 4 + 1]
        var a12 = a[1 * 4 + 2]
        var a13 = a[1 * 4 + 3]
        var a20 = a[2 * 4 + 0]
        var a21 = a[2 * 4 + 1]
        var a22 = a[2 * 4 + 2]
        var a23 = a[2 * 4 + 3]
        var a30 = a[3 * 4 + 0]
        var a31 = a[3 * 4 + 1]
        var a32 = a[3 * 4 + 2]
        var a33 = a[3 * 4 + 3]

        return [
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ]
    },

    projection: function (width: number, height: number, depth: number) {
        // Note: This matrix flips the Y axis so 0 is at the top.
        return [2 / width, 0, 0, 0, 0, -2 / height, 0, 0, 0, 0, 2 / depth, 0, -1, 1, 0, 1]
    },

    orthographic: function (
        left: number,
        right: number,
        bottom: number,
        top: number,
        near: number,
        far: number
    ) {
        return [
            2 / (right - left),
            0,
            0,
            0,
            0,
            2 / (top - bottom),
            0,
            0,
            0,
            0,
            2 / (near - far),
            0,

            (left + right) / (left - right),
            (bottom + top) / (bottom - top),
            (near + far) / (near - far),
            1,
        ]
    },
}

export class Drawer {
    public program: any
    public gl: any
    public vertexSource: string
    public fragmentSource: string
    public positionAttributeLocation: any
    public resolutionUniformLocation: any
    public colorUniformLocation: any
    public positionBuffer: any
    public texcoordBuffer: any
    public texcoordLocation: any
    public textureLocation: any
    public matrixLocation: any

    constructor(canvas: any) {
        this.gl = canvas.getContext('webgl')
        this.gl.viewport(0, 0, canvas.width, canvas.height)
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        this.vertexSource = `
attribute vec4 a_position;
attribute vec2 a_texcoord;

// uniform vec2 u_resolution;
uniform mat4 u_matrix;

varying vec2 v_texcoord;

void main() {
    // vec2 zero2one = a_position / u_resolution;
    // vec2 zero2two = zero2one * 2.0;
    // vec2 clipSpace = zero2two - 1.0;
    // gl_Position = vec4(clipSpace, 0, 1);
    // gl_Position = u_matrix * vec4(clipSpace, 0, 1);
    gl_Position = u_matrix * a_position;
    v_texcoord = a_texcoord;
}
`
        this.fragmentSource = `
precision mediump float;
// uniform vec4 u_color;

varying vec2 v_texcoord;
uniform sampler2D u_texture;

void main() {
    // gl_FragColor = u_color;
    gl_FragColor = texture2D(u_texture, v_texcoord);
}
`
        var vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexSource)
        var fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentSource)
        this.createProgram(vertexShader, fragmentShader)

        this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position')
        this.texcoordLocation = this.gl.getAttribLocation(this.program, 'a_texcoord')
        // this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, 'u_resolution')
        // this.colorUniformLocation = this.gl.getUniformLocation(this.program, 'u_color')
        this.textureLocation = this.gl.getUniformLocation(this.program, 'u_texture')
        this.matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix')
        this.positionBuffer = this.gl.createBuffer()
        this.texcoordBuffer = this.gl.createBuffer()
    }

    private createShader(type: string, source: string) {
        var shader = this.gl.createShader(type)
        this.gl.shaderSource(shader, source)
        this.gl.compileShader(shader)
        var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)
        if (success) {
            return shader
        }
        console.log(this.gl.getShaderInfoLog(shader))
        this.gl.deleteShader(shader)
    }

    private createProgram(vertexShader: any, fragmentShader: any) {
        this.program = this.gl.createProgram()
        this.gl.attachShader(this.program, vertexShader)
        this.gl.attachShader(this.program, fragmentShader)
        this.gl.linkProgram(this.program)
    }

    bindBuffers() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)

        // Put a unit quad in the buffer
        var positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)

        // Create a buffer for texture coords
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer)

        // Put texcoords in the buffer
        var texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texcoords), this.gl.STATIC_DRAW)
    }

    drawPolygons(positions: any, color: any) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
        this.gl.useProgram(this.program)
        this.gl.uniform2f(this.resolutionUniformLocation, window.innerWidth, window.innerHeight)
        this.gl.uniform4f(this.colorUniformLocation, 1, 0, color, 1)
        this.gl.enableVertexAttribArray(this.positionAttributeLocation)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
        this.gl.vertexAttribPointer(this.positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
    }

    drawImage(tex: any, texWidth: any, texHeight: any, dstX: any, dstY: any) {
        // this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex)

        this.gl.useProgram(this.program)

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
        this.gl.enableVertexAttribArray(this.positionAttributeLocation)
        this.gl.vertexAttribPointer(this.positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0)

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer)
        this.gl.enableVertexAttribArray(this.texcoordLocation)
        this.gl.vertexAttribPointer(this.texcoordLocation, 2, this.gl.FLOAT, false, 0, 0)

        var matrix = m4.orthographic(0, this.gl.canvas.width, this.gl.canvas.height, 0, -1, 1)

        // this matrix will translate our quad to dstX, dstY
        matrix = m4.translate(matrix, dstX, dstY, 0)

        // this matrix will scale our 1 unit quad
        // from 1 unit to texWidth, texHeight units
        matrix = m4.scale(matrix, texWidth, texHeight, 1)

        // Set the matrix.
        this.gl.uniformMatrix4fv(this.matrixLocation, false, matrix)

        this.gl.uniform1i(this.textureLocation, 0)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
    }

    loadImageAndCreateTextureInfo(url: string) {
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
            new Uint8Array([0, 0, 255, 255])
        )

        // let's assume all images are not a power of 2
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR)

        var textureInfo = {
            width: 1, // we don't know the size until it loads
            height: 1,
            texture: tex,
        }
        var img = new Image()
        img.addEventListener('load', (e) => {
            textureInfo.width = img.width
            textureInfo.height = img.height

            this.gl.bindTexture(this.gl.TEXTURE_2D, textureInfo.texture)
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                img
            )
        })
        img.src = url
        return textureInfo
    }

    draw() {
        this.bindBuffers()
        var textureInfos = [this.loadImageAndCreateTextureInfo('./Pop_cat_pixel.png')]

        var drawInfos = []
        var numToDraw = 1
        for (var ii = 0; ii < numToDraw; ++ii) {
            var drawInfo = {
                x: Math.random() * this.gl.canvas.width,
                y: Math.random() * this.gl.canvas.height,
                dx: Math.random() > 0.5 ? -1 : 1,
                dy: Math.random() > 0.5 ? -1 : 1,
                textureInfo: textureInfos[(Math.random() * textureInfos.length) | 0],
            }
            drawInfos.push(drawInfo)
        }
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)

        this.gl.clear(this.gl.COLOR_BUFFER_BIT)

        drawInfos.forEach((drawInfo) => {
            this.drawImage(
                drawInfo.textureInfo.texture,
                drawInfo.textureInfo.width,
                drawInfo.textureInfo.height,
                drawInfo.x,
                drawInfo.y
            )
        })
    }
}
