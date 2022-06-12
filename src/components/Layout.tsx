import { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode,
}

export const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  return (
    <div className='fixed inset-0 overflow-hidden flex flex-col'>
      <Header/>
      <main className='flex-1 relative'>
        {children}
      </main>
    </div>
  )
}
