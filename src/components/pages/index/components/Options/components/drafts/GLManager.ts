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
  private vertexDataBuffer: WebGLBuffer
  private vertexData: Float32Array = new Float32Array([
    -1.0,  1.0, // top left
    -1.0, -1.0, // bottom left
     1.0,  1.0, // top right
     1.0, -1.0, // bottom right
  ])
  private positionLocation: GLint

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl

    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource)
    this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    this.program = this.createProgram()
    this.gl.useProgram(this.program)

    this.vertexDataBuffer = this.gl.createBuffer() as WebGLBuffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexDataBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexData, this.gl.STATIC_DRAW)

    this.positionLocation = this.gl.getAttribLocation(this.program, 'position')
    this.gl.enableVertexAttribArray(this.positionLocation)
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, this.vertexData.length, 0)
  }

  public async draw() {
    const sync = this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE, 0)

    if (!sync) {
      throw new Error('gl.fenceSync error')
    }

    const start = performance.now()

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.vertexData.length / 2)

    this.gl.flush()

    while (this.gl.getSyncParameter(sync, this.gl.SYNC_STATUS) === this.gl.UNSIGNALED) {
      await new Promise(resolve => setTimeout(resolve, 1))
    }

    this.gl.deleteSync(sync)

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
