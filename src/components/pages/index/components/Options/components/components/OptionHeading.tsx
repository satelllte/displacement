interface OptionHeadingProps {
  label: string
  displayValue: string | number
}

export const OptionHeading: React.FC<OptionHeadingProps> = ({
  label,
  displayValue,
}) => {
  return (
    <div className='flex justify-between'>
      <label className='text-sm text-neutral-300'>{label}</label>
      <span className='text-sm text-neutral-300'>{displayValue}</span>
    </div>
  )
}
