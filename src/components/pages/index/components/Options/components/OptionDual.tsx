import type { RecoilState } from 'recoil'
import { useRecoilState } from 'recoil'
import { Range } from '@/components/ui/Range'

interface OptionDualProps {
  id: string
  label: string
  min: number
  max: number
  stateMin: RecoilState<number>
  stateMax: RecoilState<number>
}

export const OptionDual: React.FC<OptionDualProps> = ({
  id,
  label,
  min,
  max,
  stateMin,
  stateMax,
}) => {
  const [valueMin, setValueMin] = useRecoilState(stateMin)
  const [valueMax, setValueMax] = useRecoilState(stateMax)

  const onValueMinChange = (value: number) => {
    setValueMin(Math.min(value, valueMax))
  }
  
  const onValueMaxChange = (value: number) => {
    setValueMax(Math.max(value, valueMin))
  }

  return (
    <>
      <div className='flex justify-between'>
        <label className='text-sm text-neutral-300'>{label}</label>
        <span className='text-sm text-neutral-300'>{`${valueMin} - ${valueMax}`}</span>
      </div>
      <Range
        id={`${id}-min`}
        min={min}
        max={max}
        value={valueMin}
        onValueChange={onValueMinChange}
      />
      <Range
        id={`${id}-max`}
        min={min}
        max={max}
        value={valueMax}
        onValueChange={onValueMaxChange}
      />
    </>
  )
}
