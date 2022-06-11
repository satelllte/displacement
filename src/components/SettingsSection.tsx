import { useContext } from 'react'
import { SectionsContainerContext } from '../components/SectionsContainer'

export const SettingsSection = () => {
  const { closeSecondarySection } = useContext(SectionsContainerContext)
  return (
    <section id='settings-section' className='p-4'>
      <button className='md:hidden absolute right-4 top-4' onClick={closeSecondarySection}>Close</button>
      <h2>Settings</h2>
      <p>...</p>
    </section>
  )
}
