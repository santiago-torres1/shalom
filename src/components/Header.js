import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import { Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import brandName from '../assets/images/Shalom_transparent.png'

function Header() {
  const [open, setOpen] = useState()

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
            <Nav.Item>
              <Link to="/" className="nav-link px-0">Inicio <span className="sr-only"></span></Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/shop" className="nav-link px-3">Productos</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/why" className="nav-link px-3">Sobre Nosotros</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/testimonial" className="nav-link px-3">Reseñas</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/contact" className="nav-link px-3">Contáctanos</Link>
            </Nav.Item>
          </Nav>
          <div className="user_option">
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon="user" />
              <span>Inicia Sesión</span>
            </Link>
            <Link to="/shopping-cart" className="nav-link">
              <FontAwesomeIcon icon="shopping-bag" />
            </Link>
            <form className="form-inline">
              <button className="btn nav_search-btn" type="submit">
                <FontAwesomeIcon icon="search" />
              </button>
            </form>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
