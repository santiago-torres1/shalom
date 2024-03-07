import React from 'react';
import { Link } from 'react-router-dom';
import './css/style.css';
import './css/responsive.css';
import { Navbar, Nav} from 'react-bootstrap';


function Header() {
  return (
    <div className='hero_area'>
      <header className="header_section">
        <Navbar expand="lg" className="custom_nav-container">
            <Link to="/" className="navbar-brand">
              <span>Shalom</span>
            </Link>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
              <Nav className="navbar-nav mr-auto">
                <Nav.Item className="nav-item">
                  <Link to="/App" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Link to="/shop" className="nav-link">Shop</Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Link to="/why" className="nav-link">Why Us</Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Link to="/testimonial" className="nav-link">Testimonial</Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Link to="/contact" className="nav-link">Contact Us</Link>
                </Nav.Item>
              </Nav>
              <div className="user_option">
                <Link to="/login" className="nav-link">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span>Login</span>
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
    </div>
  );
}

export default Header;
