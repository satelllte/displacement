import React from 'react'
import { Layout } from './Layout'

interface LayoutDoubleSectionedProps {
  section1: React.ReactNode
  section2: React.ReactNode
}

export const LayoutDoubleSectioned: React.FC<LayoutDoubleSectionedProps> = ({
  section1,
  section2,
}) => {
  return (
    <Layout>
      <div className='md:flex'>
        <div className='mt-16 h-[calc(100vh-theme(spacing.16))] relative md:flex-1'>
          {section1}
        </div>
        <div className='mt-16 h-[calc(100vh-theme(spacing.16))] relative md:flex-1'>
          {section2}
        </div>
      </div>
    </Layout>
  )
}
