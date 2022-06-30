import { useRecoilState } from 'recoil'
import { iterationsState } from '../state'
import { Range } from './Range'

export const IterationsOption = () => {
  const [iterations, setIterations] = useRecoilState(iterationsState)

  return (
    <>
      <div className='flex justify-between'>
        <label htmlFor='iterations' className='text-sm text-neutral-300'>Iterations</label>
        <span className='text-sm text-neutral-300'>{iterations}</span>
      </div>
      <Range
        id='iterations'
        min={10}
        max={2000}
        value={iterations}
        onValueChange={setIterations}
      />
    </>
  )
}
