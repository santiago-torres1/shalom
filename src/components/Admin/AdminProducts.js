import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function AdminProducts({url}) {
    console.log(url)
    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        imgurl: '',
        quantity: 0,
        price: 0
    });
    const [confirmation, setConfirmation] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${url}api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setShowEditModal(true);
    };

    const handleRemove = async (productId) => {
        if (window.confirm('Are you sure you want to remove this product?')) {
            try {
                await axios.delete(`${url}api/products/${productId}`);
                fetchProducts();
            } catch (error) {
                console.error('Error removing product:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            await axios.post(`${url}api/products/`, newProduct); 
            fetchProducts();
            setNewProduct({
                name: '',
                description: '',
                imgurl: '',
                quantity: 0,
                price: 0
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`${url}api/products/${editProduct.id}`, editProduct); 
            fetchProducts();
            setShowEditModal(false);
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    return (
        <Container className='my-5'>
            <h1 className='my-5 mx-auto text-center'>Admin Products</h1>
            <Button variant="primary" onClick={() => fetchProducts()}>
                Refresh Products
            </Button>
            <Button variant="success" onClick={() => handleAdd()} className='ml-3'>
                Add Product
            </Button>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.imgurl}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(product)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleRemove(product.id)} className='ml-2'>Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" value={editProduct.imgurl} onChange={(e) => setEditProduct({ ...editProduct, imgurl: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" value={editProduct.quantity} onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={() => handleEditSubmit()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AdminProducts;
