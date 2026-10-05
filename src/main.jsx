import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import NewsIndex from './pages/NewsIndex'
import NewsPost from './pages/NewsPost'
import ProjectsIndex from './pages/ProjectsIndex'
import ProjectPage from './pages/ProjectPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<NewsIndex />} />
          <Route path="news/:slug" element={<NewsPost />} />
          <Route path="proyectos" element={<ProjectsIndex />} />
          <Route path="proyectos/:slug" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
