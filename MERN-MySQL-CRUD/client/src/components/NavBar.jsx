import React from 'react'
import { Link } from 'react-router-dom'
function NavBar() {
    return (
        <nav className='navBar'>
            <Link className='navItem' to="/">
                <h1>Ecommerce</h1>
            </Link>
            <ul className='navList'>
                <li>
                    <Link className='navItem' to="/categorias">Categorias</Link>
                </li>
                <li>
                    <Link className='navItem' to="/createCategoria">Crear Categoria</Link>
                </li>
                <li>
                    <Link className='navItem' to="/marcas">Marcas</Link>
                </li>
                <li>
                    <Link className='navItem' to="/createMarca">Crear Marca</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar