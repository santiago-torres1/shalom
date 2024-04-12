import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Spinner, Image, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useReload } from '../../ReloadContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import formatPrice from '../formatPrice';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const { reload, setReload } = useReload();
    const { url } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${url}api/cart`);
            const itemsList = await Promise.all(response.data.items.map(async (product) => {
                const productData = await fetchProduct(product.itemId, product.quantity);
                return productData;
            }));
            setCartItems(itemsList);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false)
        }
    };
    
    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        fetchCartItems();
    }, [reload]);

    useEffect(() => {
        setSubtotal(calculateSubtotal());
    }, [cartItems]);    

    const fetchProduct = async (id, quant) => {
        try {
            const response = await axios.get(`${url}api/products/${id}`);
            return ({...response.data, quantity: quant})
        } catch (error) {
            console.error('Error fetching product:', error.message);
        }
    };
    const handleAdd = async (id) => {
        try {
            await axios.post(`${url}api/cart`, { itemId: id, quantity: 1 });
            await fetchCartItems();
            setSubtotal(calculateSubtotal());
            setReload(!reload);
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
        } 
    };

    const handleRemove = async (id, amount) => {
        try {
            await axios.patch(`${url}api/cart`, { itemId: id, quantity: amount });
            await fetchCartItems();
            setSubtotal(calculateSubtotal());
            setReload(!reload);
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
        } 
    };

    const calculateSubtotal = () => {
        const subtotalArray = cartItems.map(product => (product.price*product.quantity))
        return subtotalArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    if(loading) {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <Spinner animation="border" role="status">
            <span className="sr-only">Cargando...</span>
            </Spinner>
        </div>
        )
    } 
    return (
        <Container className="checkout-container mt-4">
            <Row>
            {cartItems.length === 0 ? ( 
                <>
                    <h2 className='mt-2'>Tu carrito esta vacio</h2>
                    <button className='checkout-btn' onClick={()=>navigate('/shop')}>Seguir comprando</button>
                </>
                ) : (
                <>
                    <Col md={8}>
                        <h2>Artículos en el Carrito</h2>
                        <ListGroup>
                            {cartItems.map((product) => (
                                <ListGroup.Item key={product.itemId} className='d-flex align-items-center border-0'>
                                    <Image src={product.imgurl} alt={product.name} style={{ marginRight: '10px', width: '130px', height: 'auto' }} />
                                    <Container>
                                        <p>{product.name}</p>
                                        <p>{formatPrice(product.price)} x {product.quantity}</p>
                                        <div className='d-flex justify-content-between align-items-center col-12'>
                                            <div className="quantity-selector my-2 mx-0 px-0">
                                                <button className="minus" onClick={() => handleRemove(product.id, 1)}>-</button>
                                                <span className="quantity">{product.quantity}</span>
                                                <button className="plus" onClick={() => handleAdd(product.id, product.quantity)}>+</button>
                                            </div>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleRemove(product.id, product.quantity)} />
                                        </div>
                                    </Container>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <h2>Subtotal</h2>
                        <div className='d-flex flex-column'>
                            <p>Subtotal: {formatPrice(subtotal)}</p>
                            <p>Envío: $0.00</p>
                            <p>Descuentos: $0.00</p>
                            <p>Total: {formatPrice(subtotal)}</p>
                            <button className='checkout-btn' onClick={()=>navigate('/pay')}>Pagar</button>

                        </div>
                    </Col>
                </>
                )}
            </Row>
        </Container>
    );
};

export default Checkout;
