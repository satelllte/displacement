import React from 'react'
import { useRecoilCallback } from 'recoil'
import {
  iterationsState,
  backgroundBrightnessState,
  rectBrightnessMinState,
  rectBrightnessMaxState,
  rectAlphaMinState,
  rectAlphaMaxState,
} from '@/state'
import { RendererContext } from '@/context/RendererContext'
import { Button } from '@/components/ui/Button'

export const RenderAction = () => {
  const renderer = React.useContext(RendererContext)

  const [renderInProgress, setRenderInProgress] = React.useState<boolean>(false)

  const disabled = renderInProgress

  const onRenderComplete = React.useCallback(() => {
    setRenderInProgress(false)
  }, [])

  const startRender = useRecoilCallback(({ snapshot }) => async () => {
    if (!renderer) {
      throw new Error('Renderer wasn\'t initialized')
    }

    setRenderInProgress(true)

    const iterations = await snapshot.getPromise(iterationsState)
    const backgroundBrightness = await snapshot.getPromise(backgroundBrightnessState)
    const rectBrightnessMin = await snapshot.getPromise(rectBrightnessMinState)
    const rectBrightnessMax = await snapshot.getPromise(rectBrightnessMaxState)
    const rectAlphaMin = await snapshot.getPromise(rectAlphaMinState)
    const rectAlphaMax = await snapshot.getPromise(rectAlphaMaxState)

    renderer.startRender(
      iterations,
      backgroundBrightness,
      rectBrightnessMin,
      rectBrightnessMax,
      rectAlphaMin,
      rectAlphaMax,
      onRenderComplete,
    )
  }, [renderer, onRenderComplete])

  return (
    <Button disabled={disabled} onClick={startRender}>
      Render
    </Button>
  )
}
