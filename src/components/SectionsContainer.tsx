import { createContext, ReactNode, useState } from 'react'

interface SectionsContainerProps {
  primary: ReactNode,
  secondary: ReactNode,
  bottomBar: ReactNode,
}

interface SectionsContainerContextProps {
  secondarySectionOpened: boolean,
  openSecondarySection: () => void,
  closeSecondarySection: () => void,
}

export const SectionsContainerContext = createContext<SectionsContainerContextProps>({} as SectionsContainerContextProps)

export const SectionsContainer: React.FC<SectionsContainerProps> = ({
  primary,
  secondary,
  bottomBar,
}) => {
  const [secondarySectionOpened, setSecondarySectionOpened] = useState(false)

  const openSecondarySection = () => setSecondarySectionOpened(true)

  const closeSecondarySection = () => setSecondarySectionOpened(false)

  return (
    <SectionsContainerContext.Provider value={{
      secondarySectionOpened,
      openSecondarySection,
      closeSecondarySection,
    }}>
      <div className='absolute inset-0 flex justify-between flex-col md:flex-row'>
        <div className='flex-1 relative'>
          {primary}
        </div>
        <div className={`fixed z-[1] md:z-auto bg-black/75 inset-x-0 h-4/5 drop-shadow-xl md:drop-shadow-none transition-transform ease-out-quad duration-500 ${secondarySectionOpened ? '-translate-y-full' : ''} md:-translate-y-full top-full md:h-auto md:flex-1 md:relative box-border border-t md:border-l md:border-t-0 border-Xborder`}>
          {secondary}
        </div>
        <div className='relative md:hidden border-t border-Xborder'>
          {bottomBar}
        </div>
      </div>
    </SectionsContainerContext.Provider>
  )
}
