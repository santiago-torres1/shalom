import { Link } from 'react-router-dom';
import './css/style.css';
import './css/responsive.css';

function Header() {
  return (
    <header className="header_section">
      <nav className="navbar navbar-expand-lg custom_nav-container">
        <Link to="/App" className="navbar-brand">
          <span>
            Shalom
          </span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className=""></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/App" className="nav-link">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-link">Shop</Link>
            </li>
            <li className="nav-item">
              <Link to="/why" className="nav-link">Why Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/testimonial" className="nav-link">Testimonial</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </li>
          </ul>
          <div className="user_option">
            <Link to="/login">
              <i className="fa fa-user" aria-hidden="true"></i>
              <span>
                Login
              </span>
            </Link>
            <Link to="/shopping-cart">
              <i className="fa fa-shopping-bag" aria-hidden="true"></i>
            </Link>
            <form className="form-inline ">
              <button className="btn nav_search-btn" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
