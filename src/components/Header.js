import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import { Navbar, Nav} from 'react-bootstrap';


function Header() {
  return (
    <header className="header_section">
      <Navbar expand="lg" sticky="top" className='custom_nav-container'>
          <Link to="/" className="navbar-brand">
            <span>Shalom</span>
          </Link>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="navbar-nav mr-auto">
              <Nav.Item className="nav-item">
                <Link to="/App" className="nav-link">Inicio <span className="sr-only">(current)</span></Link>
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
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>Inicia Sesion</span>
              </Link>
              <Link to="/shopping-cart" className="nav-link">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
              </Link>
              <form className="form-inline ">
                <button className="btn nav_search-btn" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </Navbar.Collapse> 
      </Navbar>
    </header>
  );
}

export default Header;
