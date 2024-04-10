import React, { useState, useEffect } from 'react';
import ProductCard from './Products/ProductCard';
import '../assets/css/style.css';
import { Container, Row, Spinner } from 'react-bootstrap'; 
import { useAuth } from '../AuthContext';
import axios from 'axios';

function Shop({reload, setReload}) {
  const [productArray, setProductArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const { url } = useAuth();

  const getProducts = async () => {
    try {
      const response = await axios.get(`${url}api/products`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch products');
      }
      
      const productsData = response.data;
      setProductArray(productsData);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setProductArray([]);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container fluid className='my-4' style={{ maxWidth: '800px' }}>
      <Row>
        {isLoading ? ( 
          <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Cargando...</span>
            </Spinner>
          </div>
        ) : (
          productArray.map(product => (
            <Container key={product.id} className='col-lg-3 col-md-4 col-6 mb-3 px-0'>
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                img={product.imgurl}
                reload={reload} setReload={setReload}
              />
            </Container>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Shop;
