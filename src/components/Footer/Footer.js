import '../../assets/css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row} from 'react-bootstrap';

function Footer() {
    return (
        <section class="info_section  layout_padding2-top">
        <div class="social_container">
          <div class="social_box">
            <a href="">
              <FontAwesomeIcon icon={'facebook'} aria-aria-hidden={true}/>
            </a>
            <a href="">
              <FontAwesomeIcon icon={'twitter'} aria-aria-hidden={true}/>
            </a>
            <a href="">
              <FontAwesomeIcon icon={'instagram'} aria-aria-hidden={true}/>
            </a>
            <a href="">
              <FontAwesomeIcon icon={'youtube'} aria-aria-hidden={true}/>
            </a>
          </div>
        </div>
        <div class="info_container ">
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
                  <a href="">
                    <FontAwesomeIcon icon={'map-marker'} aria-aria-hidden={true}/>
                    <span> Gb road 123 london Uk </span>
                  </a>
                  <a href="">
                    <FontAwesomeIcon icon={'phone'} aria-aria-hidden={true}/>
                    <span>+01 12345678901</span>
                  </a>
                  <a href="">
                    <FontAwesomeIcon icon={'envelope'} aria-aria-hidden={true}/>
                    <span> demo@gmail.com</span>
                  </a>
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