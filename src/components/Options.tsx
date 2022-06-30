import React from 'react'
import { IterationsOption } from './IterationsOption'
import { RenderAction } from './RenderAction'

export const Options = () => {
  return (
    <div className='absolute inset-4 flex flex-col justify-between'>
      <div className='flex flex-col'>
        <h2 className='mb-8 text-xl'>Options</h2>
        <IterationsOption/>
      </div>
      <RenderAction/>
    </div>
  )
}
