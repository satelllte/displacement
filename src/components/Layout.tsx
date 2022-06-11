import { ReactNode } from 'react'
import { Header } from './Header'

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
      <Header/>
      <main className={`flex-1 relative ${containerClassName}`}>
        {children}
      </main>
    </div>
  )
}
