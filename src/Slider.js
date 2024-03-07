import React from 'react';
import { Link } from 'react-router-dom';
import './css/style.css';
import { Carousel, Container, Row, Col}  from 'react-bootstrap';
import sliderImg from  './images/slider-img.png'


const Slider = () => {
    return (
       <div className='slider_container'>
        <Carousel pause='hover'>
            <Carousel.Item>
                <Container fluid>
                    <Row> 
                        <Col md='7'>
                           <div className='detail-box'>
                            <h1>
                                Bienvenido a<br/>
                                Shalom!
                            </h1>
                            <p>
                                Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non necessitatibus error distinctio mollitia suscipit. Nostrum fugit doloribus consequatur distinctio esse, possimus maiores aliquid repellat beatae cum, perspiciatis enim, accusantium perferendis.
                            </p>
                            <Link to="/contact">
                                Contact Us
                            </Link>
                           </div>
                        </Col>
                        <Col md='5'>
                            <div className='img-box'>
                                <img src={sliderImg} alt="Nothing"></img>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Carousel.Item>
            <Carousel.Item>
                <Container fluid>
                    <Row> 
                        <Col md='7'>
                           <div className='detail-box'>
                            <h1>
                                This is the <br/>
                                Second slide
                            </h1>
                            <p>
                                Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non necessitatibus error distinctio mollitia suscipit. Nostrum fugit doloribus consequatur distinctio esse, possimus maiores aliquid repellat beatae cum, perspiciatis enim, accusantium perferendis.
                            </p>
                            <Link to="/contact">
                                Contact Us
                            </Link>
                           </div>
                        </Col>
                        <Col md='5'>
                            <div className='img-box'>
                                <img src={sliderImg} alt="Nothing"></img>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Carousel.Item>
        </Carousel>
       </div>
    )
}

export default Slider