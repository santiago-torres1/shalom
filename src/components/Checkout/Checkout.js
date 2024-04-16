import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Spinner, Image, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import formatPrice from '../formatPrice';
import { useProduct } from '../../ProductContext';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { fetchCartItems, reload, handleAdd, handleRemove } = useProduct();
    
    const getCartItems = async () => {
        const items = await fetchCartItems()
        setCartItems(items);
    };

    useEffect(() => {
        getCartItems();
    }, [reload]);

    useEffect(() => {
        setSubtotal(calculateSubtotal());
    }, [cartItems]);    

    const getAdd = (id, quant) => {
        setLoading(true);
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + quant };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        handleAdd(id, quant).catch(error => {
            console.error('Error adding item to cart:', error);
            setCartItems(cartItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - quant };
                }
                return item;
            }));
        }).finally(()=>{
            setLoading(false);
        });
    };

    const getRemove = async (id, quant) => {
        setLoading(true);
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity - quant };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        handleRemove(id, quant).catch(error => {
            console.error('Error removing item from cart:', error);
            setCartItems(cartItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + quant };
                }
                return item;
            }));
        }).finally(()=>{
            setLoading(false);
        });
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
                                                <button className="minus" disabled={loading} onClick={() => getRemove(product.id, 1)}>-</button>
                                                <span className="quantity">{product.quantity}</span>
                                                <button className="plus" disabled={loading} onClick={() => getAdd(product.id, 1)}>+</button>
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
                            <button className='checkout-btn' onClick={()=>navigate('/payment')}>Pagar</button>
                        </div>
                    </Col>
                </>
                )}
            </Row>
        </Container>
    );
};

export default Checkout;
