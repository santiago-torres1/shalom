import './Cart.css';
import { useState, useEffect } from 'react';
import { Container, Button, Image, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import axios from 'axios'; 
import '../Products/Products.css'
import formatPrice from "../formatPrice"
import { useReload } from '../../ReloadContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Cart({ open, setOpen }) {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const { reload, setReload } = useReload();
    const { url } = useAuth();
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
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [open, reload]);

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
    
    const handleCheckout = () => {
        setOpen();
        navigate('/checkout');
    }

    return (
        <Container className={`cart-sidebar ${open ? 'open' : ''} d-flex flex-column`}>
                <div className='cart-top-content d-flex justify-content-between' style={{height: '8%'}}>
                    <h2 className='mt-3'>Carrito</h2>
                    <button className='custom-close-btn' onClick={setOpen}>X</button>
                </div>
                {cartItems.length === 0 ? (
                    <p>Tu carrito está vacío</p>
                ) : (
                    <>
                        <div className='overflow-auto' style={{height: '80%'}}>
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
                        </div>
                        <div className='d-flex flex-column text-align-center mt-2 border-top' style={{height: '12%'}}>
                            <h2 className='mt-1'>Subtotal: {formatPrice(subtotal)}</h2>
                            <button className='checkout-btn' onClick={handleCheckout}>Proceder al Pago</button>
                        </div>
                    </>
            )}
        </Container>
    );
}

export default Cart;
