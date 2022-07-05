const vertexShaderSource = `#version 300 es

in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShaderSource = `#version 300 es

precision highp float;

out vec4 fragColor;

void main() {
  fragColor = vec4(0, .2, 0, 1);
}
`

export class GLManager {
  private gl: WebGL2RenderingContext
  private vertexShader: WebGLShader
  private fragmentShader: WebGLShader
  private program: WebGLProgram

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl

    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource)
    console.info('this.vertexShader: ', this.vertexShader)
    
    this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource)
    console.info('this.fragmentShader: ', this.fragmentShader)
    
    this.program = this.createProgram()
    console.info('this.program: ', this.program)

    this.gl.useProgram(this.program)

    const vertexData = new Float32Array([
      -1.0,  1.0, // top left
      -1.0, -1.0, // bottom left
       1.0,  1.0, // top right
       1.0, -1.0, // bottom right
    ])

    const vertexDataBuffer = this.gl.createBuffer()

    if (!vertexDataBuffer) {
      throw new Error('vertexDataBuffer creation failed')
    }
    
    this.gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexData, this.gl.STATIC_DRAW)

    const positionLocation = this.gl.getAttribLocation(this.program, 'position')

    this.gl.enableVertexAttribArray(positionLocation)
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 2 * 4, 0)

    const sync = this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE, 0)

    if (!sync) {
      throw new Error('gl.fenceSync error')
    }

    console.info('this.gl.UNSIGNALED: ', this.gl.UNSIGNALED)

    console.info('this.gl | syncParameter: ', this.gl.getSyncParameter(sync, this.gl.SYNC_STATUS))

    const start = performance.now()

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
    this.gl.flush()

    console.info('this.gl | syncParameter: ', this.gl.getSyncParameter(sync, this.gl.SYNC_STATUS))

    const end = performance.now()
    const diff = end - start

    console.info(`render time: ${diff}ms`)
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type)

    if (!shader) {
      throw new Error(`Couldn't create shader with type "${type}"`)
    }

    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)

    const compileSuccess = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)

    if (compileSuccess) {
      return shader
    }

    console.error(this.gl.getShaderInfoLog(shader))
    this.gl.deleteShader(shader)

    throw new Error('Shader compilation error')
  }

  private createProgram() {
    const program = this.gl.createProgram()

    if (!program) {
      throw new Error('Couldn\'t create program')
    }

    this.gl.attachShader(program, this.vertexShader)
    this.gl.attachShader(program, this.fragmentShader)
    this.gl.linkProgram(program)

    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS)

    if (success) {
      return program
    }

    console.error(this.gl.getProgramInfoLog(program))
    this.gl.deleteProgram(program)

    throw new Error('Program linking error')
  }
}
