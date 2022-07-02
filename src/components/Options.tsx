import React from 'react'
import { backgroundBrightnessState, iterationsState } from '../state'
import { Option } from './Option'
import { RenderAction } from './RenderAction'

export const Options = () => {
  return (
    <div className='absolute inset-4 flex flex-col justify-between'>
      <div className='flex flex-col'>
        <h2 className='mb-8 text-xl'>Options</h2>
        <Option
          id='iterations'
          label='Iterations'
          min={10}
          max={2000}
          state={iterationsState}
        />
        <Option
          id='backgroundBrightness'
          label='Background Brightness'
          min={0x00}
          max={0xFF}
          state={backgroundBrightnessState}
        />
      </div>
      <RenderAction/>
    </div>
  )
}
