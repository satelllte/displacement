import { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode,
}

const bgAnimation = 'bg-[length:200%_200%] bg-repeat animate-gradient bg-gradient-to-tl from-black to-sky-900/20'

export const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  return (
    <div className={`fixed inset-0 overflow-hidden flex flex-col ${bgAnimation}`}>
      <Header/>
      <main className='flex-1 relative'>
        {children}
      </main>
    </div>
  )
}
