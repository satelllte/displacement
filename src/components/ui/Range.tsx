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
  step = 1,
  value,
  onValueChange,
  onChange,
  ...rest
}, ref) => {

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target

    if (onValueChange) {
      onValueChange(Number(value))
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

Range.displayName = 'Range'
