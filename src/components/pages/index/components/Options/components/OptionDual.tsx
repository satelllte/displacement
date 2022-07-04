import type { RecoilState } from 'recoil'
import { useRecoilState } from 'recoil'
import { Range } from '@/components/ui/Range'
import { OptionHeading } from './components/OptionHeading'

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
    setValueMin(value)
    if (value > valueMax) {
      setValueMax(value)
    }
  }
  
  const onValueMaxChange = (value: number) => {
    setValueMax(value)
    if (value < valueMin) {
      setValueMin(value)
    }
  }

  return (
    <>
      <OptionHeading label={label} displayValue={`${valueMin} - ${valueMax}`} />
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
