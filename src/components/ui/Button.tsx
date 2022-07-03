import React from 'react'

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  ...rest
}, ref) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className='p-4 w-full bg-neutral-800/50 disabled:opacity-50 hover:bg-neutral-800/75 active:bg-neutral-800 transition-all outline outline-2 outline-transparent focus:outline-neutral-800 drop-shadow-xl'
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
