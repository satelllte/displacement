import React from 'react'
import {
  backgroundBrightnessState,
  iterationsState,
  rectBrightnessMinState,
  rectBrightnessMaxState,
  rectAlphaMinState,
  rectAlphaMaxState,
  matrixBrightnessMinState,
  matrixBrightnessMaxState,
  matrixAlphaMinState,
  matrixAlphaMaxState,
  matrixColsMinState,
  matrixColsMaxState,
  matrixRowsMinState,
  matrixRowsMaxState,
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
          label='Rect:Brightness'
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
        <OptionDual
          id='matrixBrightness'
          label='Matrix:Brightness'
          min={0x00}
          max={0xFF}
          stateMin={matrixBrightnessMinState}
          stateMax={matrixBrightnessMaxState}
        />
        <OptionDual
          id='matrixAlpha'
          label='Matrix:Alpha'
          min={0x00}
          max={0xFF}
          stateMin={matrixAlphaMinState}
          stateMax={matrixAlphaMaxState}
        />
        <OptionDual
          id='matrixCols'
          label='Matrix:Cols'
          min={2}
          max={10}
          stateMin={matrixColsMinState}
          stateMax={matrixColsMaxState}
        />
        <OptionDual
          id='matrixRows'
          label='Matrix:Rows'
          min={2}
          max={10}
          stateMin={matrixRowsMinState}
          stateMax={matrixRowsMaxState}
        />
      </div>
      <RenderAction/>
    </div>
  )
}
