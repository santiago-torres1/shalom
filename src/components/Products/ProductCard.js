import '../../assets/css/style.css';
import './Products.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, Button } from 'react-bootstrap';
import formatPrice from "../formatPrice"
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../../ProductContext';

function ProductCard({ id, img, name, price}) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const formattedPrice = formatPrice(price);
    const { handleAdd } = useProduct();

    const addToCart = async (id) => {
        setLoading(true);
        await handleAdd(id, 1);
        setLoading(false);
    };

    return (
        <Container fluid>
            <Card className='custom-card'>
                <div className='custom-img-container'>
                    <Card.Img
                        className='mx-auto img-thumbnail custom-img'
                        src={img}
                        onClick={()=>navigate(`/shop/${id}`)}
                    />
                </div>
                <Card.Body className="text-center col-12 px-0 pb-0">
                    <div className='cvp'>
                        <Card.Text className="font-weight-bold">{name}</Card.Text>
                        <Card.Text>{formattedPrice}</Card.Text>
                        <button onClick={()=>navigate(`/shop/${id}`)} className="details col-12 rounded-0 custom-card-button">Ver Detalles</button><br />
                        <button onClick={()=>(addToCart(id))} disabled={loading} className="cart col-12 rounded-0 custom-card-button">
                            { loading ? <>Cargando...</> : <>
                            <FontAwesomeIcon icon='shopping-bag'/>
                            &nbsp;Añadir al carrito
                            </>
                            }
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductCard;
