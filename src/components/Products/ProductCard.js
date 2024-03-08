import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/style.css';
import '../../assets/css/responsive.css';
import './Products.css'

import { Container, Card, Button }  from 'react-bootstrap';



function ProductCard({id, img, name, price}) {
    return (
        <Container fluid>
            <Card className="mx-auto col-md-12 col-11 mt-5">
                <div className='custom-img-container'>
                    <Card.Img
                        className='mx-auto img-thumbnail custom-img'
                        src={img}
                        width="auto"
                        height="auto"
                    />
                </div>
                <Card.Body className="text-center mx-auto">
                    <div className='cvp'>
                        <Card.Title className="font-weight-bold">{name}</Card.Title>
                        <Card.Text>{price}</Card.Text>
                        <Button href="#" variant="primary" className="details">Ver Detalles</Button><br />
                        <Button href="#" variant="primary" className="cart">Anadir al carrito</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductCard