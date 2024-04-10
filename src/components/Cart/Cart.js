import './Cart.css';
import { useState, useEffect } from 'react';
import { Container, Button, Image, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import axios from 'axios'; 
import '../Products/Products.css'
import formatPrice from "../formatPrice"

function Cart({ open, setOpen, reload, setReload }) {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [formattedPrice, setFormattedPrice] = useState (0);
    const { url } = useAuth();
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${url}api/cart`);
            const itemsList = await Promise.all(response.data.items.map(async (product) => {
                const productData = await fetchProduct(product.itemId, product.quantity);
                return productData;
            }));
            setCartItems(itemsList);
            setSubtotal(calculateSubtotal());
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [open, reload]);

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

    const handleRemove = async (id) => {
        try {
            await axios.patch(`${url}api/cart`, { itemId: id, quantity: 1 });
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

    return (
        <Container className={`cart-sidebar ${open ? 'open' : ''} overflow-auto`}>
            <Button className='close-btn' onClick={setOpen} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</Button>
            <h2 className='mt-3'>Carrito</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <ListGroup>
                        {cartItems.map((product) => (
                            <ListGroup.Item key={product.itemId} style={{ display: 'flex', alignItems: 'center' }}>
                                <Image src={product.imgurl} alt={product.name} style={{ marginRight: '10px', width: '110px', height: 'auto' }} />
                                <div>
                                    <p>{product.name}</p>
                                    <p>{formatPrice(product.price)} x {product.quantity}</p>
                                    <div className="quantity-selector my-2 mx-0 px-0">
                                        <button className="minus" onClick={() => handleRemove(product.id, product.quantity)}>-</button>
                                        <span className="quantity">{product.quantity}</span>
                                        <button className="plus" onClick={() => handleAdd(product.id, product.quantity)}>+</button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h2>Subtotal: {formatPrice(subtotal)}</h2>
                        <Button>Proceder al Pago</Button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Cart;
