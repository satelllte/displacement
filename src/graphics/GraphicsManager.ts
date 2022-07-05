import { U_RESOLUTION } from './uniforms'

const vertexShaderSource = `#version 300 es

in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShaderSource = `#version 300 es

precision highp float;

uniform vec2 u_resolution;

out vec4 fragColor;

void main() {
  vec2 point = gl_FragCoord.xy / u_resolution;
  fragColor = vec4(1.0 - point.x, 0.0, point.y * point.x, 1.0);
}
`

export class GraphicsManager {
  private ctx: WebGL2RenderingContext
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

  constructor(ctx: WebGL2RenderingContext, width: number, height: number) {
    this.ctx = ctx

    this.vertexShader = this.createShader(this.ctx.VERTEX_SHADER, vertexShaderSource)
    this.fragmentShader = this.createShader(this.ctx.FRAGMENT_SHADER, fragmentShaderSource)
    
    this.program = this.createProgram()
    this.ctx.useProgram(this.program)

    this.vertexDataBuffer = this.ctx.createBuffer() as WebGLBuffer
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.vertexDataBuffer)
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, this.vertexData, this.ctx.STATIC_DRAW)

    this.positionLocation = this.ctx.getAttribLocation(this.program, 'position')
    this.ctx.enableVertexAttribArray(this.positionLocation)
    this.ctx.vertexAttribPointer(this.positionLocation, 2, this.ctx.FLOAT, false, this.vertexData.length, 0)
    
    this.setUniform2f(U_RESOLUTION, width, height)
  }

  public async draw() {
    const timeStart = performance.now()

    const sync = this.ctx.fenceSync(this.ctx.SYNC_GPU_COMMANDS_COMPLETE, 0)

    if (!sync) {
      throw new Error('gl.fenceSync error')
    }

    this.ctx.drawArrays(this.ctx.TRIANGLE_STRIP, 0, this.vertexData.length / 2)

    this.ctx.flush()

    while (this.ctx.getSyncParameter(sync, this.ctx.SYNC_STATUS) === this.ctx.UNSIGNALED) {
      await new Promise(resolve => setTimeout(resolve, 1))
    }

    this.ctx.deleteSync(sync)

    const renderTime = performance.now() - timeStart
    console.info(`render time: ${renderTime}ms`)
  }

  private setUniform2f(name: string, x: number, y: number) {
    const location = this.ctx.getUniformLocation(this.program, name) as WebGLUniformLocation
    this.ctx.uniform2fv(location, [x, y])
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.ctx.createShader(type)

    if (!shader) {
      throw new Error(`Couldn't create shader with type "${type}"`)
    }

    this.ctx.shaderSource(shader, source)
    this.ctx.compileShader(shader)

    const compileSuccess = this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)

    if (compileSuccess) {
      return shader
    }

    console.error(this.ctx.getShaderInfoLog(shader))
    this.ctx.deleteShader(shader)

    throw new Error('Shader compilation error')
  }

  private createProgram() {
    const program = this.ctx.createProgram()

    if (!program) {
      throw new Error('Couldn\'t create program')
    }

    this.ctx.attachShader(program, this.vertexShader)
    this.ctx.attachShader(program, this.fragmentShader)
    this.ctx.linkProgram(program)

    const success = this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS)

    if (success) {
      return program
    }

    console.error(this.ctx.getProgramInfoLog(program))
    this.ctx.deleteProgram(program)

    throw new Error('Program linking error')
  }
}
