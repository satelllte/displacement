interface ButtonProps {
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
}) => {
  return (
    <button className='px-6 py-2 transition-colors text-white rounded-xl bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>
      {children}
    </button>
  )
}
