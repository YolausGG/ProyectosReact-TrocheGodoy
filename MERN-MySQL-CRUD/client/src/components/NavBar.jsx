import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import shoppinCart from '../utils/icons/shopping-cart.png'
import cerrar from '../utils/icons/cerrar.webp'
import bonsai from '../images/bonsai.png'
import { useCarrito } from '../contexts/carrito'

function NavBar() {

    const { productosCarrito } = useCarrito()

    const abrirCerrarCarrito = (e) => {

        const carrito = document.querySelector('.container-carrito')
        const icon = document.querySelector('.icon-shoppin-cart')
        carrito.classList.toggle('open');
        icon.classList.toggle('open')
        const isOpen = carrito.classList.contains('open');

        e.target.src = isOpen ? shoppinCart : cerrar;

    }

    return (
        <nav className='navBar'>

            <Link className='navItem' to="/">
                <div className='container-logo'>
                    <h1>Bonsai</h1>
                    <img className='icon-bonsai-logo' src={bonsai} alt="" />
                </div>
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
                <li>
                    <Link className='navItem' to="/ConfirmarCompra">Conf. Compra</Link>
                </li>
            </ul>
            <a className='container-abrir-carrito' >
                <img className='icon-shoppin-cart open' src={shoppinCart} onClick={(e) => { abrirCerrarCarrito(e) }} alt="Abrir Carrito" />
                <strong className='cantidad-productos-carrito'>{productosCarrito.length}</strong>
            </a>
        </nav>
    )
}

export default NavBar

NavBar.propTypes = {
    productosCarrito: PropTypes.array,
};