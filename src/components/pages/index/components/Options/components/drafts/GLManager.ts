const vertexShaderSource = `
attribute vec4 position;

void main() {
  gl_Position = position;
}
`

const fragmentShaderSource = `
precision mediump float;

void main() {
  gl_FragColor = vec4(1, 0, 0.5, 1);
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
