import logo from '../images/react.svg'
import '../styles/mainNavbar.css'

export function MainNavbar() {

    return (
        <>
            <nav className="main-nav">
                <a className='a-logo' href="#">
                    <img className='nav-logo' src={logo} alt="logo"/>
                </a>
                <ul className="nav-list">
                    <li className="nav-item"><a href="">Home</a></li>
                    <li className="nav-item"><a href="">About</a> </li>
                    <li className="nav-item"><a href="">Contactos</a> </li>
                    <li className="nav-item"><a href="">Tienda</a> </li>
                </ul>
            </nav>
        </>
    )
}