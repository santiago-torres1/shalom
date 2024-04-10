import '../../assets/css/style.css';
import './Products.css';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import formatPrice from "../formatPrice"

function ProductCard({ id, img, name, price, reload, setReload }) {
    const [loading, setLoading] = useState(false);
    const { url } = useAuth();
    const formattedPrice = formatPrice(price);
    const addToCart = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${url}api/cart`, { itemId: id, quantity: 1 });
            setReload(!reload);
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
        } finally {
            setLoading(false);
        }
    };

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
                        <Button onClick={addToCart} disabled={loading} className="cart col-12 rounded-0 custom-card-button">
                            <FontAwesomeIcon icon='shopping-bag'/>
                            &nbsp;Añadir al carrito
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductCard;
