import '../../assets/css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row} from 'react-bootstrap';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
        <section className="info_section">
        <div className="social_container">
          <div className="social_box">
              <a href='https://facebook.com'><FontAwesomeIcon icon={faFacebook} id='facebook-icon'/><span></span></a>
              <a href='https://x.com'><FontAwesomeIcon icon={faTwitter} id='twitter-icon'/><span></span></a>
              <a href='https://instagram.com'><FontAwesomeIcon icon={faInstagram} id='instagram-icon'/><span></span></a>
              <a href='https://youtube.com'><FontAwesomeIcon icon={faYoutube} id='youtube-icon'/><span></span></a>
          </div>
        </div>
        <div className="info_container ">
          <Container>
            <Row>
              <div className="col-md-6 col-lg-3">
                <h6>
                  Sobre Nosotros
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet,
                </p>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="info_form ">
                  <h5>
                    Suscribete!
                  </h5>
                  <form action="#">
                    <input type="email" placeholder="Enter your email"/>
                    <button>
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <h6>
                  Necesitas Ayuda?
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet,
                </p>
              </div>
              <div className="col-md-6 col-lg-3">
                <h6>
                  Contactanos
                </h6>
                <div className="info_link-box">
                  <ul className='list-unstyled'>
                    <li><FontAwesomeIcon icon={'map-marker'} aria-hidden={true}/>
                    <span>&nbsp;Carrera 67 #169a82 </span></li>
                    <li><FontAwesomeIcon icon={'phone'} aria-hidden={true}/>
                    <span>&nbsp;312 5802253</span></li>
                    <li><FontAwesomeIcon icon={'envelope'} aria-hidden={true}/>
                    <span>&nbsp;shalom_tienda@gmail.com</span></li>
                  </ul>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        <footer className=" footer_section">
          <Container className="container">
            <p>
              &copy; <span id="displayYear"></span> All Rights Reserved By Santiago Torres
            </p>
          </Container>
        </footer>
    
      </section>
    
    )
}

export default Footer