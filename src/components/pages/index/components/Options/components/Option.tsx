import type { RecoilState } from 'recoil'
import { useRecoilState } from 'recoil'
import { Range } from '@/components/ui/Range'
import { OptionHeading } from './components/OptionHeading'

interface OptionProps {
  id: string
  label: string
  min: number
  max: number
  step?: number
  state: RecoilState<number>
}

export const Option: React.FC<OptionProps> = ({
  id,
  label,
  min,
  max,
  step = 1,
  state,
}) => {
  const [value, setValue] = useRecoilState(state)

  return (
    <>
      <OptionHeading label={label} displayValue={value} />
      <Range
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={setValue}
      />
    </>
  )
}
