import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [ reload, setReload ] = useState(false);
    const { url } = useAuth();

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${url}api/cart`);
            const itemsList = await Promise.all(response.data.items.map(async (product) => {
                const productData = await fetchProduct(product.itemId, product.quantity);
                return productData;
            }));
            return itemsList
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } 
    };

    const fetchProduct = async (id, quant) => {
        try {
            const response = await axios.get(`${url}api/products/${id}`);
            return (quant ? {...response.data, quantity: quant} : response.data);
        } catch (error) {
            console.error('Error fetching product:', error.message);
        }
    };

    const handleAdd = async (id, quant) => {
        try {
            await axios.post(`${url}api/cart`, { itemId: id, quantity: quant });
            await fetchCartItems();
            setReload(!reload);
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
        } 
    };

    const handleRemove = async (id, quant) => {
        try {
            await axios.patch(`${url}api/cart`, { itemId: id, quantity: quant });
            await fetchCartItems();
            setReload(!reload);
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
        } 
    };

    
    return (
        <ProductContext.Provider value = {{fetchCartItems, fetchProduct, handleAdd, handleRemove, reload}}>
            { children }
        </ProductContext.Provider>
    )
};


export const useProduct = () => useContext(ProductContext);