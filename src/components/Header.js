import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import { Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
  const [open, setOpen] = useState()

  return (
    <header className="header_section">
      <Navbar expand="lg" sticky="top" className='custom_nav-container'>
          <Link to="/" className="navbar-brand">
            <span>Shalom</span>
          </Link>
          <Navbar.Toggle 
            aria-controls="navbarSupportedContent"
            aria-expanded={open}
            onClick={() => setOpen(!open)} 
            className='custom-toggler'/>
          <Navbar.Collapse in={open} id="navbarSupportedContent">
            <Nav className="navbar-nav mr-auto">
              <Nav.Item className="nav-item">
                <Link to="/App" className="nav-link">Inicio <span className="sr-only"></span></Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link to="/shop" className="nav-link">Productos</Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link to="/why" className="nav-link">Sobre Nosotros</Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link to="/testimonial" className="nav-link">Resenas</Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link to="/contact" className="nav-link">Contactanos</Link>
              </Nav.Item>
            </Nav>
            <div className="user_option">
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon="user" />
                <span>Inicia Sesion</span>
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
