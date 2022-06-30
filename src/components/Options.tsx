import React from 'react'
import { Range } from './Range'
import { RenderAction } from './RenderAction'

export const Options = () => {
  const [iterations, setIterations] = React.useState<number>(50)

  return (
    <div className='absolute inset-4 flex flex-col justify-between'>
      <div className='flex flex-col'>
        <h2 className='mb-8 text-xl'>Options</h2>
        <div className='flex justify-between'>
          <label htmlFor='iterations' className='text-sm text-neutral-300'>Iterations</label>
          <span className='text-sm text-neutral-300'>{iterations}</span>
        </div>
        <Range
          id='iterations'
          min={10}
          max={1000}
          value={iterations}
          onValueChange={setIterations}
        />
      </div>
      <RenderAction/>
    </div>
  )
}
