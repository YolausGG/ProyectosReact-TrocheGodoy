import './App.css'
import './styles/navBar.css'
import { Route, Routes } from 'react-router-dom'

import Categorias from './pages/Categorias.jsx'
import CreateCategoria from './pages/CreateCategoria.jsx'
import NotFounds from './pages/NotFounds.jsx'
import NavBar from './components/NavBar.jsx'
import { CategoriaProvider } from './contexts/categorias.jsx'

function App() {

  return (
    <CategoriaProvider>
      <NavBar />
      <Routes >
        <Route path='/categorias' element={<Categorias />} />
        <Route path='/createCategoria' element={<CreateCategoria />} />
        <Route path='/updateCategoria/:id' element={<CreateCategoria />} />
        <Route path='/*' element={<NotFounds />} />
      </Routes>
    </CategoriaProvider>
  )
}

export default App
