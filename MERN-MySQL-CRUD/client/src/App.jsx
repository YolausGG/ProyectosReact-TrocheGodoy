import './App.css'
import './styles/navBar.css'
import { Route, Routes } from 'react-router-dom'

import Categorias from './pages/Categorias.jsx'
import CreateCategoria from './pages/CreateCategoria.jsx'
import NotFounds from './pages/NotFounds.jsx'
import NavBar from './components/NavBar.jsx'
import { CategoriaProvider } from './contexts/categorias.jsx'
import Marcas from './pages/Marcas.jsx'
import CreateMarca from './pages/CreateMarca.jsx'
import { MarcaProvider } from './contexts/marcas.jsx'

import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import Usuarios from './pages/Usuarios.jsx'
import CreateUsuario from './pages/CreateUsuario.jsx'
import InicioSesion from './pages/InicioSesion.jsx'

function App() {
  registerLocale('es', es)
  setDefaultLocale('es');

  return (
    <CategoriaProvider>
      <MarcaProvider>
        <NavBar />
        <Routes >
          <Route path='/categorias' element={<Categorias />} />
          <Route path='/createCategoria' element={<CreateCategoria />} />
          <Route path='/updateCategoria/:id' element={<CreateCategoria />} />
          <Route path='/marcas' element={<Marcas />} />
          <Route path='/createMarca' element={<CreateMarca />} />
          <Route path='/updateMarca/:id' element={<CreateMarca />} />
          <Route path='/*' element={<NotFounds />} />

          <Route path='/usuarios' element={<Usuarios />} />
          <Route path='/createUsuario' element={<CreateUsuario />} />
          <Route path='/inicioSesion' element={<InicioSesion />} />
        </Routes>
      </MarcaProvider>
    </CategoriaProvider>
  )
}

export default App
