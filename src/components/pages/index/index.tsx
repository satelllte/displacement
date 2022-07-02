import type { NextPage } from 'next'
import { LayoutDoubleSectioned } from '@/components/layout'
import { Canvas } from './components/Canvas'
import { Options } from './components/Options'

export const Index: NextPage = () => {
  return (
    <LayoutDoubleSectioned
      section1={<Canvas/>}  
      section2={<Options/>}  
    />
  )
}
