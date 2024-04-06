import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import brandName from '../assets/images/Shalom_transparent.png'
import Cart from './Cart/Cart.js'
import { useNavigate } from 'react-router-dom'

function Header({ userData }) {
  const navigate = useNavigate();
  const [openHeader, setOpenHeader] = useState()
  const [current, setCurrent] = useState('home')
  const location = useLocation()
  const [openCart, setOpenCart] = useState()
  const [width, setWidth] = useState(window.innerWidth);

  function Quit() {
    setOpenHeader(false);
  }

  useEffect(() => {
    setCurrent(location.pathname)
  }, [location])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCart = () => {
    setOpenCart(!openCart)
  }

  return (
    <>
      <header className="header_section sticky-top custom-header-bg">
        <Navbar expand="lg" className='custom_nav-container'>
          <Link to="/" className="navbar-brand px-auto mx-3 my-2" id='brand-img'>
            <img src={brandName} alt='logo' style={{ width: '120px', height: 'auto' }} />
          </Link>
          <div className='d-flex'>
            {width < 992 && <Link className="nav-link">
              <div style={userData.isAdmin ? {display: 'none'} : null}>
              <FontAwesomeIcon icon="shopping-bag" style={{ fontSize: '1.9em', position: 'relative', top: '5px', right: '2px' }} onClick={toggleCart} />
              </div>
            </Link>}
            <Navbar.Toggle
              aria-controls="navbarSupportedContent"
              aria-expanded={openHeader}
              onClick={() => setOpenHeader(!openHeader)}
              className='custom-toggler mx-3' />
          </div>
          <Navbar.Collapse in={openHeader} id="navbarSupportedContent">
            <Nav className="navbar-nav mr-auto">
              {userData.isAdmin ? (
                <>
                  <Nav.Item className={current === '/admin' ? 'active' : undefined}>
                    <Link to="/admin" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>Administrar</Link>
                  </Nav.Item>
                  <Nav.Item className={current === '/admin/products' ? 'active' : undefined}>
                    <Link to="/admin/products" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>Productos</Link>
                  </Nav.Item>
                  <Nav.Item className={current === '/admin/orders' ? 'active' : undefined}>
                    <Link to="/admin/orders" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>Ordenes</Link>
                  </Nav.Item>
                  <Nav.Item className={current === '/admin/customers' ? 'active' : undefined}>
                    <Link to="/admin/customers" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>Clientes</Link>
                  </Nav.Item>
                  <Nav.Item className={current === '/login' ? ' active' : undefined}>
                    <Link to="/admin/quit" className="nav-link px-3" onClick={Quit}>
                      <span>Salir de Administrador</span>
                    </Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item className={(current === '/home' || current === '/') ? 'active' : undefined}>
                    <Link to="/" className="nav-link px-3" onClick={() => setOpenHeader(false)}>Inicio</Link>
                  </Nav.Item>
                  <Nav.Item className={current === '/shop' ? 'active' : undefined}>
                    <Link to="/shop" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>Productos</Link>
                  </Nav.Item>
                  <Nav.Item className={current === '/about' ? 'active' : undefined}>
                    <Link to="/about" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>Sobre Nosotros</Link>
                  </Nav.Item>
                  <Nav.Item className={current === '/reviews' ? 'active' : undefined}>
                    <Link to="/reviews" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>Reseñas</Link>
                  </Nav.Item>
                  <Nav.Item className={current === '/contact' ? 'active' : undefined}>
                    <Link to="/contact" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>Contáctanos</Link>
                  </Nav.Item>
                  {userData.isAuthenticated ? (
                    <Nav.Item className={current === '/myaccount' ? ' active' : undefined}>
                      <Link to="/myaccount" className="nav-link px-3" onClick={() => setOpenHeader(false)}>
                        <span>Mi cuenta</span>
                      </Link>
                    </Nav.Item>
                  ) : (
                    <Nav.Item className={(current === '/login' || current === '/signin') ? ' active' : undefined}>
                      <Link to="/login" className="nav-link px-3" onClick={() => setOpenHeader(false)}>
                        <span>Inicia Sesión</span>
                      </Link>
                    </Nav.Item>
                  )}
                  <div className="user_option">
                    {width >= 992 && <Link className="nav-link">
                      <FontAwesomeIcon icon="shopping-bag" style={{ fontSize: '1.5em' }} onClick={toggleCart} />
                    </Link>}
                    <form className="form-inline">
                      <button className="btn nav_search-btn" type="submit">
                        <FontAwesomeIcon icon="search" style={{ fontSize: '1.4em' }} />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {openCart && <div className="overlay" onClick={toggleCart}></div>}
        </Navbar>
        <Cart open={openCart} setOpen={toggleCart} />
      </header>

    </>
  );
}

export default Header;
