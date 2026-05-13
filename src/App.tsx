import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import DocsLayout from './layouts/DocsLayout'

import HomePage from './pages/HomePage'
import IntroductionPage from './pages/docs/IntroductionPage'
import InstallationPage from './pages/docs/InstallationPage'
import ThemingPage from './pages/docs/ThemingPage'
import ComponentsPage from './pages/components/ComponentsPage'
import ComponentDetailPage from './pages/components/ComponentDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<DocsLayout />}>
          <Route path="/docs" element={<IntroductionPage />} />
          <Route path="/docs/installation" element={<InstallationPage />} />
          <Route path="/docs/theming" element={<ThemingPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/components/:name" element={<ComponentDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
