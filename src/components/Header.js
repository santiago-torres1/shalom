import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import { Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import brandName from '../assets/images/Shalom_transparent.png'
import Cart from './Cart/Cart.js'

function Header() {
  const [openHeader, setOpenHeader] = useState()
  const [current, setCurrent] = useState('home')
  const location = useLocation()
  const [openCart, setOpenCart] = useState()

  useEffect(()=> {
    setCurrent(location.pathname)
  }, [location])

  const toggleCart = () => {
    setOpenCart(!openCart)
  }

  return (
    <>
    <header className="header_section sticky-top custom-header-bg">
      <Navbar expand="lg" className='custom_nav-container'>
        <Link to="/" className="navbar-brand px-auto mx-3 my-2" id='brand-img'>
          <img src={brandName} alt='logo' style={{ width: '120px', height: 'auto'}} />
        </Link>
        <Navbar.Toggle
          aria-controls="navbarSupportedContent"
          aria-expanded={openHeader}
          onClick={() => setOpenHeader(!openHeader)}
          className='custom-toggler mx-3' />
        <Navbar.Collapse in={openHeader} id="navbarSupportedContent">
          <Nav className="navbar-nav mr-auto">
            <Nav.Item className={(current==='/home' || current==='/') ? 'active' : undefined}>
              <Link to="/" className="nav-link px-3 ">Inicio</Link>
            </Nav.Item>
            <Nav.Item className={current==='/shop' ? 'active' : undefined}>
              <Link to="/shop" className="nav-link px-3 custom-navlink">Productos</Link>
            </Nav.Item>
            <Nav.Item className={current==='/about' ? 'active' : undefined}>
              <Link to="/about" className="nav-link px-3 custom-navlink">Sobre Nosotros</Link>
            </Nav.Item>
            <Nav.Item className={current==='/reviews' ? 'active' : undefined}>
              <Link to="/reviews" className="nav-link px-3 custom-navlink">Reseñas</Link>
            </Nav.Item>
            <Nav.Item className={current==='/contact' ? 'active' : undefined}>
              <Link to="/contact" className="nav-link px-3 custom-navlink">Contáctanos</Link>
            </Nav.Item>
            <Nav.Item className={current==='/login' ? ' active' : undefined}>
              <Link to="/login" className="nav-link px-3">
                <span>Inicia Sesión</span>
              </Link>
            </Nav.Item>
          </Nav>
          <div className="user_option">
            <Link className="nav-link">
              <FontAwesomeIcon icon="shopping-bag" style={{ fontSize: '1.5em' }} onClick={toggleCart}/>
            </Link>
            <form className="form-inline">
              <button className="btn nav_search-btn" type="submit">
                <FontAwesomeIcon icon="search"  style={{ fontSize: '1.4em' }}/>
              </button>
            </form>
          </div>
        </Navbar.Collapse>
        {openCart && <div className="overlay" onClick={toggleCart}></div>}
      </Navbar>
      <Cart open={openCart} setOpen={toggleCart} />
    </header>
    
    </>
  );
}

export default Header;
