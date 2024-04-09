import './Cart.css';
import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import axios from 'axios'; 
import '../Products/Products.css'
import formatPrice from "../formatPrice"

function Cart({ open, setOpen }) {
    const [cartItems, setCartItems] = useState([]);
    const [reload, setReload] = useState (false)
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
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

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
    const handleAdd = async (id, quant) => {
        try {
            const response = await axios.post(`${url}api/cart`, { itemId: id, quantity: quant });
            setReload(!reload);
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
        } 
    };

    const handleRemove = async (id, quant) => {
        try {
            const response = await axios.patch(`${url}api/cart`, { itemId: id, quantity: quant });
            setReload(!reload);
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
        } 
    };

    return (
        <div>
            <Container className={`cart-sidebar ${open ? 'open' : ''} overflow-auto`}>
                <h2>Carrito</h2>
                {cartItems.length === 0 ? (
                    <p>Tu carrito está vacío</p>
                ) : (
                    <div>
                        {cartItems.map((product) => (
                            <div key={product.itemId}>
                                <p>{product.name}</p>
                                <p>{formatPrice(product.price*product.quantity)}</p>
                                <div className="quantity-selector my-2 mx-0 px-0">
                                    <button className="minus" onClick={() => handleRemove(product.id, product.quantity)} >-</button>
                                    <span className="quantity">{product.quantity}</span>
                                    <button className="plus" onClick={()=>handleAdd(product.id, product.quantity)}>+</button>
                        
                                </div>
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
