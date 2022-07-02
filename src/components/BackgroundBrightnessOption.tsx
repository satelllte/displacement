import { useRecoilState } from 'recoil'
import { backgroundBrightnessState } from '../state'
import { Range } from './Range'

export const BackgroundBrightnessOption = () => {
  const [backgroundBrightness, setBackgroundBrightness] = useRecoilState(backgroundBrightnessState)

  return (
    <>
      <div className='flex justify-between'>
        <label htmlFor='backgroundBrightness' className='text-sm text-neutral-300'>Background Brightness</label>
        <span className='text-sm text-neutral-300'>{backgroundBrightness}</span>
      </div>
      <Range
        id='backgroundBrightness'
        min={0x00}
        max={0xFF}
        value={backgroundBrightness}
        onValueChange={setBackgroundBrightness}
      />
    </>
  )
}
