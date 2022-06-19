interface ButtonProps {
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
}) => {
  return (
    <button className='p-2 bg-green-600'>
      {children}
    </button>
  )
}
