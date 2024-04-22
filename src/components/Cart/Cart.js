import './Cart.css';
import { useState, useEffect } from 'react';
import { Container, Image, ListGroup } from 'react-bootstrap';
import '../Products/Products.css'
import formatPrice from "../formatPrice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../ProductContext';

function Cart({ open, setOpen }) {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { fetchCartItems, handleAdd, handleRemove, reload } = useProduct();

    const getCartItems = async () => {
        const items = await fetchCartItems();
        setCartItems(items);
    };

    useEffect(() => {
        getCartItems();
    }, [open, reload]);

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
        const subtotalArray = cartItems.map(product => (product.price * product.quantity));
        return subtotalArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    };

    const handleCheckout = () => {
        setOpen();
        navigate('/checkout');
    };

    return (
        <Container className={`cart-sidebar ${open ? 'open' : ''} d-flex flex-column`}>
            <div className='cart-top-content d-flex justify-content-between' style={{ height: '8%' }}>
                <h2 className='mt-3'>Carrito</h2>
                <button className='custom-close-btn' onClick={setOpen}>X</button>
            </div>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <div className='overflow-auto' style={{ height: '80%' }}>
                        <ListGroup>
                            {cartItems.map((product) => (
                                <ListGroup.Item key={product.itemId} className='d-flex align-items-center border-0'>
                                    <Image src={product.images.length > 0 ? product.images[0].url : product.imgurl} alt={product.name} style={{ marginRight: '10px', width: '130px', height: 'auto' }} />
                                    <Container>
                                        <p>{product.name}</p>
                                        <p>{formatPrice(product.price)} x {product.quantity}</p>
                                        <div className='d-flex justify-content-between align-items-center col-12'>
                                            <div className="quantity-selector my-2 mx-0 px-0">
                                                <button className="minus" disabled={loading} onClick={() => getRemove(product.id, 1)}>-</button>
                                                <span className="quantity">{product.quantity}</span>
                                                <button className="plus" disabled={loading} onClick={() => getAdd(product.id, 1)}>+</button>
                                            </div>
                                            <FontAwesomeIcon icon={faTrash} disabled={loading} onClick={() => getRemove(product.id, product.quantity)} />
                                        </div>
                                    </Container>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div className='d-flex flex-column text-align-center mt-2 border-top' style={{ height: '12%' }}>
                        <h2 className='mt-1'>{loading ? <>Cargando...</> : (<>Subtotal: {formatPrice(subtotal)}</>)}</h2>
                        <button className='checkout-btn' onClick={handleCheckout}>Proceder al Pago</button>
                    </div>
                </>
            )}
        </Container>
    );
}


export default Cart;
