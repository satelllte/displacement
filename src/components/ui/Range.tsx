import React from 'react'

interface RangeProps extends Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  | 'type'
  | 'children'
> {
  min: number
  max: number
  step?: number
  value: number
  onValueChange?: (value: number) => void
}

export const Range = React.forwardRef<HTMLInputElement, RangeProps>(({
  min,
  max,
  step,
  value,
  onValueChange,
  onChange,
  ...rest
}, ref) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value: targetValue } = e.target

    if (onValueChange) {
      onValueChange(Number(targetValue))
    }

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <input
      type='range'
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      ref={ref}
      {...rest}
    />
  )
})

Range.defaultProps = {
  step: 1,
  onValueChange: undefined,
}

Range.displayName = 'Range'
