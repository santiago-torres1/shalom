import '../../assets/css/style.css';
import './Products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Container, Card, Button }  from 'react-bootstrap';



function ProductCard({id, img, name, price}) {
    const formattedPrice = price.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0 
      });
    return (
        <Container fluid>
            <Card className='custom-card'>
                <div className='custom-img-container'>
                    <Card.Img
                        className='mx-auto img-thumbnail custom-img'
                        src={img}
                    />
                </div>
                <Card.Body className="text-center col-12 px-0 pb-0">
                    <div className='cvp'>
                        <Card.Text className="font-weight-bold">{name}</Card.Text>
                        <Card.Text>{formattedPrice}</Card.Text>
                        <Button href={`/shop/${id}`} className="details col-12 rounded-0 custom-card-button">Ver Detalles</Button><br />
                        <Button href="#" className="cart col-12 rounded-0 custom-card-button">
                            <FontAwesomeIcon icon='shopping-bag'/>
                            &nbsp;Añadir al carrito
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}


export default ProductCard