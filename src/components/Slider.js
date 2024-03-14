import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import { Carousel, Container, Row, Col}  from 'react-bootstrap';
let sliderImg1 = 'https://cdn.shopify.com/s/files/1/0791/7482/8347/files/Imagen4.jpg?v=1697657601'
let sliderImg2 = 'https://cdn.shopify.com/s/files/1/0791/7482/8347/files/f4.jpg?v=1697657601'


const Slider = () => {
    return (
      <div className='slider_container my-0 py-5'>
        <Carousel touch={true} controls={false} pause={false} indicators={false} interval={5000}>
          <Carousel.Item>
            <Container fluid>
              <Row>
                <Col md='6'>
                  <div className='detail-box'>
                    <h1>
                      Bienvenido a<br />
                      Shalom!
                    </h1>
                    <p>
                      Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non necessitatibus error distinctio mollitia suscipit. Nostrum fugit doloribus consequatur distinctio esse, possimus maiores aliquid repellat beatae cum, perspiciatis enim, accusantium perferendis.
                    </p>
                    <Link to="/contact">
                      Contactanos
                    </Link>
                  </div>
                </Col>
                <Col md='6'>
                  <div className='img-box'>
                    <img src={sliderImg1} alt="Nothing" />
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <Container fluid>
              <Row>
                <Col md='6'>
                  <div className='detail-box'>
                    <h1>
                      Lo mejor en <br />
                      Joyeria
                    </h1>
                    <p>
                      Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non necessitatibus error distinctio mollitia suscipit. Nostrum fugit doloribus consequatur distinctio esse, possimus maiores aliquid repellat beatae cum, perspiciatis enim, accusantium perferendis.
                    </p>
                    <Link to="/contact">
                      Contactanos
                    </Link>
                  </div>
                </Col>
                <Col md='6'>
                  <div className='img-box'>
                    <img src={sliderImg2} alt="Nothing" />
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  };
  

export default Slider