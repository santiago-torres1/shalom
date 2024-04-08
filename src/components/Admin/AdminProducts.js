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
    const [showAddModal, setShowAddModal] = useState(false);
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

    const handleAdd = () => {
        setShowAddModal(true);
    }

    const handleRemove = async (productId) => {
        if (window.confirm('Estas seguro de que deseas remover este producto?')) {
            try {
                await axios.delete(`${url}api/products/${productId}`);
                fetchProducts();
            } catch (error) {
                console.error('Error removing product:', error);
            }
        }
    };

    const handleAddSubmit = async () => {
        try {
            await axios.post(`${url}api/products/`, newProduct); 
            fetchProducts();
            setShowAddModal(false);
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
            <h1 className='my-5 mx-auto text-center'>Administracion de productos</h1>
            <Button variant="primary" onClick={() => fetchProducts()}>
                Recargar la tabla
            </Button>
            <Button variant="success" onClick={() => handleAdd()} className='ml-3'>
                Agregar producto
            </Button>
            <Table striped bordered hover className='mt-3' style={ {width: '95% !important'}}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Imagen</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Opciones</th>
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
                                <Button variant="primary" onClick={() => handleEdit(product)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleRemove(product.id)} className='ml-2'>Remover</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder='Nombre del producto' onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder='Descripcion del producto' onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control type="text" placeholder='Link de la imagen. Ejemplo: www.imgurl.com/aretes' onChange={(e) => setNewProduct({ ...newProduct, imgurl: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" placeholder='Cantidad en inventario' onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" placeholder='Precio del producto' onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cerrar</Button>
                    <Button variant="primary" onClick={() => handleAddSubmit()}>Guardar cambios</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control type="text" value={editProduct.imgurl} onChange={(e) => setEditProduct({ ...editProduct, imgurl: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" value={editProduct.quantity} onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cerrar</Button>
                    <Button variant="primary" onClick={() => handleEditSubmit()}>Guardar cambios</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AdminProducts;
