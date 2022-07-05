import React from 'react'
import {
  backgroundBrightnessState,
  iterationsState,
  rectBrightnessMinState,
  rectBrightnessMaxState,
  rectAlphaMinState,
  rectAlphaMaxState,
} from '@/state'
import { Option } from './components/Option'
import { OptionDual } from './components/OptionDual'
import { RenderAction } from './components/RenderAction'

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
        <OptionDual
          id='rectBrightness'
          label='Rect:Background'
          min={0x00}
          max={0xFF}
          stateMin={rectBrightnessMinState}
          stateMax={rectBrightnessMaxState}
        />
        <OptionDual
          id='rectAlpha'
          label='Rect:Alpha'
          min={0x00}
          max={0xFF}
          stateMin={rectAlphaMinState}
          stateMax={rectAlphaMaxState}
        />
      </div>
      <RenderAction/>
    </div>
  )
}
