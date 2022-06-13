import { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode,
}

export const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
    </>
  )
}
