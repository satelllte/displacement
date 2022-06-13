interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  className = ''
}) => {
  return (
    <header className={`bg-black/75 drop-shadow-2xl px-4 flex items-center justify-center md:justify-start ${className}`}>
      <h1 className='md:text-left text-lg'>DISPLACEMENT</h1>
    </header>
  )
}
