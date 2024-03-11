import ProductCard from './Products/ProductCard';
import '../assets/css/style.css';
import products from './Products/Products';
import { Container, Row, Col } from 'react-bootstrap';

function Shop() {
    return (
      <Container fluid className='my-4' style={{maxWidth: '800px'}}>
        <Row>
          {products.map(product => (
            <Container key={product.id} className='col-lg-3 col-md-4 col-sm-6 mb-3 px-0'>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                img={product.img}
              />
            </Container>
          ))}
        </Row>
      </Container>
    );
  }
export default Shop