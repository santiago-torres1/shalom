import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import { Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import brandName from '../assets/images/Shalom_transparent.png'

function Header() {
  const [open, setOpen] = useState()
  const [current, setCurrent] = useState('home')
  const location = useLocation()

  useEffect(()=> {
    setCurrent(location.pathname)
  }, [location])

  return (
    <header className="header_section sticky-top custom-header-bg">
      <Navbar expand="lg" className='custom_nav-container'>
        <Link to="/" className="navbar-brand px-auto mx-3 my-2" id='brand-img'>
          <img src={brandName} alt='logo' style={{ width: '120px', height: 'auto'}} />
        </Link>
        <Navbar.Toggle
          aria-controls="navbarSupportedContent"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className='custom-toggler mx-3' />
        <Navbar.Collapse in={open} id="navbarSupportedContent">
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
            <Link to="/shopping-cart" className="nav-link">
              <FontAwesomeIcon icon="shopping-bag" style={{ fontSize: '1.5em' }} />
            </Link>
            <form className="form-inline">
              <button className="btn nav_search-btn" type="submit">
                <FontAwesomeIcon icon="search"  style={{ fontSize: '1.4em' }}/>
              </button>
            </form>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
