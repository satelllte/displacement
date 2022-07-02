import type { RecoilState } from 'recoil'
import { useRecoilState } from 'recoil'
import { Range } from '@/components/ui/Range'

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
      <div className='flex justify-between'>
        <label htmlFor={id} className='text-sm text-neutral-300'>{label}</label>
        <span className='text-sm text-neutral-300'>{value}</span>
      </div>
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
