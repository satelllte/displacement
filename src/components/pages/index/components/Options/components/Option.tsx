import type { RecoilState } from 'recoil'
import { useRecoilState } from 'recoil'
import { Range } from '@/components/ui/Range'
import { OptionHeading } from './components/OptionHeading'

interface OptionProps {
  id: string
  label: string
  min: number
  max: number
  state: RecoilState<number>
}

export const Option: React.FC<OptionProps> = ({
  id,
  label,
  min,
  max,
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
        value={value}
        onValueChange={setValue}
      />
    </>
  )
}
