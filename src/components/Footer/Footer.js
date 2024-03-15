import '../../assets/css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row} from 'react-bootstrap';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
        <section className="info_section  layout_padding2-top">
        <div className="social_container">
          <div className="social_box">
              <FontAwesomeIcon icon={faFacebook}/><span></span>
              <FontAwesomeIcon icon={faTwitter}/><span></span>
              <FontAwesomeIcon icon={faInstagram}/><span></span>
              <FontAwesomeIcon icon={faYoutube}/><span></span>
          </div>
        </div>
        <div className="info_container ">
          <Container>
            <Row>
              <div className="col-md-6 col-lg-3">
                <h6>
                  ABOUT US
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet,
                </p>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="info_form ">
                  <h5>
                    Newsletter
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
                  NEED HELP
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet,
                </p>
              </div>
              <div className="col-md-6 col-lg-3">
                <h6>
                  CONTACT US
                </h6>
                <div className="info_link-box">
                  <ul>
                    <li><FontAwesomeIcon icon={'map-marker'} aria-aria-hidden={true}/>
                    <span> Gb road 123 london Uk </span></li>
                    <li><FontAwesomeIcon icon={'phone'} aria-aria-hidden={true}/>
                    <span>+01 12345678901</span></li>
                    <li><FontAwesomeIcon icon={'envelope'} aria-aria-hidden={true}/>
                    <span> demo@gmail.com</span></li>
                  </ul>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        <footer class=" footer_section">
          <Container class="container">
            <p>
              &copy; <span id="displayYear"></span> All Rights Reserved By Santiago Torres
              <a href="https://html.design/">Free Html Templates</a>
            </p>
          </Container>
        </footer>
    
      </section>
    
    )
}

export default Footer