import { Feature } from './Feature'

// https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas#browser_compatibility
export class OffscreenCanvasFeature extends Feature {
  public static override isSupported() {
    return 'OffscreenCanvas' in window
  }
}
