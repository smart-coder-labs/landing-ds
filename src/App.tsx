import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import DocsLayout from './layouts/DocsLayout'

import HomePage from './pages/HomePage'
import IntroductionPage from './pages/docs/IntroductionPage'
import InstallationPage from './pages/docs/InstallationPage'
import ThemingPage from './pages/docs/ThemingPage'
import ArchitecturePage from './pages/docs/ArchitecturePage'
import VersioningPage from './pages/docs/VersioningPage'
import ComponentsPage from './pages/components/ComponentsPage'
import ComponentDetailPageV2 from './pages/components/ComponentDetailPageV2'

export default function App() {
  return (
    <BrowserRouter basename="/landing-ds">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<DocsLayout />}>
          <Route path="/docs" element={<IntroductionPage />} />
          <Route path="/docs/installation" element={<InstallationPage />} />
          <Route path="/docs/theming" element={<ThemingPage />} />
          <Route path="/docs/architecture" element={<ArchitecturePage />} />
          <Route path="/docs/versioning" element={<VersioningPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/components/:componentName" element={<ComponentDetailPageV2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
