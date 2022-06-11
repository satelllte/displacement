import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode,
  containerClassName?: string
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName = ''
}) => {
  return (
    <div className='absolute inset-0 overflow-hidden flex flex-col'>
      <header className='p-4 box-border border-b border-neutral-900'>
        <h1 className='text-lg'>DISPLACEMENT</h1>
      </header>
      <main className={`flex-1 relative ${containerClassName}`}>
        {children}
      </main>
    </div>
  )
}
