import ProductCard from './Products/ProductCard';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import products from './Products/Products';
import { Container, Row, Col } from 'react-bootstrap';

function Shop() {
    return(
        <Container fluid>
            {products.map(product => (
                <Row>
                    <Col md='4'>
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            img={product.img}
                        />
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default Shop