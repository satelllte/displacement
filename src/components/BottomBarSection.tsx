import { useContext } from "react"
import { SectionsContainerContext } from "./SectionsContainer"

export const BottomBarSection = () => {
  const { openSecondarySection } = useContext(SectionsContainerContext)
  return (
    <button className='p-4 text-center w-full' onClick={openSecondarySection}>Open Settings</button>
  )
}
