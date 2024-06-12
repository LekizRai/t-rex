export var m3 = {
    multiply: function (a: number[], b: number[]): number[] {
        var a00 = a[0 * 3 + 0]
        var a01 = a[0 * 3 + 1]
        var a02 = a[0 * 3 + 2]
        var a10 = a[1 * 3 + 0]
        var a11 = a[1 * 3 + 1]
        var a12 = a[1 * 3 + 2]
        var a20 = a[2 * 3 + 0]
        var a21 = a[2 * 3 + 1]
        var a22 = a[2 * 3 + 2]
        var b00 = b[0 * 3 + 0]
        var b01 = b[0 * 3 + 1]
        var b02 = b[0 * 3 + 2]
        var b10 = b[1 * 3 + 0]
        var b11 = b[1 * 3 + 1]
        var b12 = b[1 * 3 + 2]
        var b20 = b[2 * 3 + 0]
        var b21 = b[2 * 3 + 1]
        var b22 = b[2 * 3 + 2]

        return [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ]
    },

    translation: function (tx: number, ty: number): number[] {
        return [1, 0, 0, 0, 1, 0, tx, ty, 1]
    },

    rotation: function (angleInRadians: number): number[] {
        var c = Math.cos(angleInRadians)
        var s = Math.sin(angleInRadians)
        return [c, -s, 0, s, c, 0, 0, 0, 1]
    },

    scaling: function (sx: number, sy: number): number[] {
        return [sx, 0, 0, 0, sy, 0, 0, 0, 1]
    },

    projection: function (width: number, height: number): number[] {
        return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1]
    },

    translate: function (m: number[], tx: number, ty: number): number[] {
        return m3.multiply(m, m3.translation(tx, ty))
    },

    rotate: function (m: number[], angleInRadians: number): number[] {
        return m3.multiply(m, m3.rotation(angleInRadians))
    },

    scale: function (m: number[], sx: number, sy: number): number[] {
        return m3.multiply(m, m3.scaling(sx, sy))
    },
}

export var m4 = {
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

export function createShader(gl: any, type: any, source: any) {
    var shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
        return shader
    }
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

export function createProgram(gl: any, vertexShader: any, fragmentShader: any) {
    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    var success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
        return program
    }
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
}