import React from 'react'
import { RendererContext } from '@/context/RendererContext'
import { Button } from '@/components/ui/Button'

export const RenderAction = () => {
  const rendererRef = React.useContext(RendererContext)

  const [renderInProgress, setRenderInProgress] = React.useState<boolean>(false)

  const disabled = renderInProgress

  const onRenderComplete = () => {
    setRenderInProgress(false)
  }

  const startRender = () => {
    if (!rendererRef.current) {
      throw new Error('Renderer wasn\'t initialized')
    }

    setRenderInProgress(true)

    rendererRef.current.startRender(1500, onRenderComplete)
  }

  return (
    <Button disabled={disabled} onClick={startRender}>
      Render
    </Button>
  )
}
