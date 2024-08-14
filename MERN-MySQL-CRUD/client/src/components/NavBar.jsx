
import { Link } from 'react-router-dom'
function NavBar() {
    return (
        <nav className='navBar'>
            <Link className='navItem' to="/">
                <h1>Ecommerce</h1>
            </Link>
            <ul className='navList'>
                <li>
                    <Link className='navItem' to="/productos">Productos</Link>
                </li>
                <li>
                    <Link className='navItem' to="/ABMproducto">ABM Producto</Link>
                </li>
                <li>
                    <Link className='navItem' to="/usuarios">Usuarios</Link>
                </li>
                <li>
                    <Link className='navItem' to="/categorias">Categorias</Link>
                </li>
                <li>
                    <Link className='navItem' to="/marcas">Marcas</Link>
                </li>
                <li>
                    <Link className='navItem' to="/createCategoria">Crear Categoria</Link>
                </li>
                <li>
                    <Link className='navItem' to="/createMarca">Crear Marca</Link>
                </li>
                <li>
                    <Link className='navItem' to="/createUsuario">Crear Usuario</Link>
                </li>                
                <li>
                    <Link className='navItem' to="/inicioSesion">Iniciar Sesion</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar