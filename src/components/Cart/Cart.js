import './Cart.css';
import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import axios from 'axios'; 

function Cart({ open, setOpen }) {
    const [cartItems, setCartItems] = useState([]);
    const { url } = useAuth();
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${url}api/cart`);
                const itemsList = await Promise.all(response.data.items.map(async (product) => {
                    const productData = await fetchProduct(product.itemId, product.quantity);
                    return productData;
                }));
                setCartItems(itemsList);
                console.log('fresco');
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [open]);

    const fetchProduct = async (id, quant) => {
        try {
            const response = await axios.get(`${url}api/products/${id}`);
            return ({...response.data, quantity: quant})
        } catch (error) {
            console.error('Error fetching product:', error.message);
        }
    };
    return (
        <div>
            <Container className={`cart-sidebar ${open ? 'open' : ''}`}>
                <h2>Carrito</h2>
                {cartItems.length === 0 ? (
                    <p>Tu carrito está vacío</p>
                ) : (
                    <div>
                        {cartItems.map((product) => (
                            <div key={product.itemId}>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p>{product.quantity}</p>
                            </div>
                        ))}
                    </div>
                )}
                <Button className='close-btn' onClick={setOpen}>Cerrar</Button>
            </Container>
        </div>
    );
}

export default Cart;
