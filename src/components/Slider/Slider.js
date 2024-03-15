import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
import { Carousel, Container, Row, Col}  from 'react-bootstrap';
import SliderInfo from './SliderInfo';



function Slider () {
    return (
      <div className='slider_container my-0 py-5'>
        <Carousel touch={true} controls={false} pause={false} indicators={false} interval={5000}>
          {SliderInfo.map(info => (
            <Carousel.Item>
              <Container fluid>
                <Row>
                  <Col md='6'>
                    <div className='detail-box'>
                      {info.title}
                      <p>
                        {info.text}
                      </p>
                      <Link to="/contact">
                        Contactanos
                      </Link>
                    </div>
                  </Col>
                  <Col md='6'>
                    <div className='img-box'>
                      <img src={info.img} alt="Nothing" />
                    </div>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  };
  

export default Slider