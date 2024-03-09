import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import { Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import brandName from '../assets/images/ShalomTop2.png'

function Header() {
  const [open, setOpen] = useState()

  return (
    <header className="header_section sticky-top custom-header-bg">
      <Navbar expand="lg" className='custom_nav-container'>
        <Link to="/" className="navbar-brand px-auto" id='brand-img'>
          <img src={brandName} alt='logo' />
        </Link>
        <Navbar.Toggle
          aria-controls="navbarSupportedContent"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className='custom-toggler' />
        <Navbar.Collapse in={open} id="navbarSupportedContent">
          <Nav className="navbar-nav mr-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">Inicio <span className="sr-only"></span></Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/shop" className="nav-link">Productos</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/why" className="nav-link">Sobre Nosotros</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/testimonial" className="nav-link">Reseñas</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/contact" className="nav-link">Contáctanos</Link>
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
