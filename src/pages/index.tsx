import type { NextPage } from 'next'
import { BottomBarSection } from '../components/BottomBarSection';
import { CanvasSection } from '../components/CanvasSection'
import { Layout } from '../components/Layout';
import { SectionsContainer } from '../components/SectionsContainer';
import { SettingsSection } from '../components/SettingsSection';

const Home: NextPage = () => {
  return (
    <Layout>
      <SectionsContainer
        primary={<CanvasSection/>}
        secondary={<SettingsSection/>}
        bottomBar={<BottomBarSection/>}
      />
    </Layout>
  )
}

export default Home
