import { randomInt } from "@/utils/random"

export class Renderer {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) {
    this.ctx = ctx
    this.width = width
    this.height = height
  }

  public startRender(
    iterations: number,
    backgroundBrightness: number,
    rectBrightnessMin: number,
    rectBrightnessMax: number,
    onComplete: () => void,
  ) {
    this.ctx.fillStyle = `rgb(${backgroundBrightness}, ${backgroundBrightness}, ${backgroundBrightness})`
    this.ctx.fillRect(0, 0, this.width, this.height)

    let iteration = 0
    const frameIterations = 50

    const draw = () => {
      const last = Math.min(iteration + frameIterations, iterations)
      
      while (iteration < last) {
        const brightness = randomInt(rectBrightnessMin, rectBrightnessMax)
        this.ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, 0.5)`
        this.ctx.fillRect(
          randomInt(0, this.width - 1),
          randomInt(0, this.height - 1),
          randomInt(-1024, 1024),
          randomInt(-1024, 1024),
        )
        iteration++
      }
      
      if (iteration < iterations) {
        requestAnimationFrame(draw)
        return
      }

      onComplete()
    }

    requestAnimationFrame(draw)
  }
}
