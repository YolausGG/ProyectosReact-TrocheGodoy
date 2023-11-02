import '../styles/mainNavbar.css';
import img from  '../img/react-original.svg'
export function MainNavbar() {

    

    return (
        <>
            <nav className="main-nav">
                <a className='a-logo' href="#">
                    <img className='nav-logo' src={img}  alt="logo"/>
                </a>
                <ul className="nav-list">
                    <li className="nav-item"><a className='nav-link' href="">Home</a></li>
                    <li className="nav-item"><a className='nav-link' href="">About</a> </li>
                    <li className="nav-item"><a className='nav-link' href="">Contactos</a> </li>
                    <li className="nav-item"><a className='nav-link' href="">Tienda</a> </li>
                </ul>
            </nav>
        </>
    )
}