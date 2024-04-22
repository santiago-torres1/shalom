import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import formatPrice from '../formatPrice';

function AdminProducts({url}) {
    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState({images: []});
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        images: [],
        quantity: 0,
        price: 0
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [sortDirections, setSortDirections] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${url}api/products`);
            setProducts(response.data);
            console.log(products);
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

    const handleSort = (columnName) => {
        const sortedProducts = [...products].sort((a, b) => {
            let comparison = 0;
            if (columnName === 'name' || columnName === 'description') {
                comparison = a[columnName].localeCompare(b[columnName]);
            } else {
                comparison = a[columnName] - b[columnName];
            }
            
            return sortDirections[columnName] === 'asc' ? comparison : -comparison;
        });
    
        setProducts(sortedProducts);
        setSortDirections({
            ...sortDirections,
            [columnName]: sortDirections[columnName] === 'asc' ? 'desc' : 'asc'
        });
    };
    

    const handleFileChange = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }
    
        try {
            const response = await axios.post(`${url}api/images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const imageUrls = response.data.map((url, index) => ({
                url: url,
                isMain: index === 0 ? 'Y' : 'N'
            }));
            setNewProduct({...newProduct, images: imageUrls})
            console.log(newProduct);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleMainImageUpdateNew = (index) => {
        setSelectedImageIndex(index);
        const updatedImages = newProduct.images.map((img, i) => ({
            ...img,
            isMain: i === index ? 'Y' : 'N'
        }));
        setNewProduct({ ...newProduct, images: updatedImages });
    };

    const handleImageDeleteNew = (index) => {
        const updatedImages = [...newProduct.images]
        updatedImages.splice(index, 1);
        setNewProduct({ ...newProduct, images: updatedImages});
    }

    const handleMainImageUpdateEdit = (index) => {
        setSelectedImageIndex(index);
        const updatedImages = editProduct.images.map((img, i) => ({
            ...img,
            isMain: i === index ? 'Y' : 'N'
        }));
        setEditProduct({ ...editProduct, images: updatedImages });
    };

    const handleImageDeleteEdit = (index) => {
        const updatedImages = [...editProduct.images]
        updatedImages.splice(index, 1);
        setEditProduct({ ...editProduct, images: updatedImages});
    }

    return (
        <>
        <Container className='my-1'>
            <h1 className='my-3 mx-auto text-center'>Administracion de productos</h1>
            <Button variant="primary" onClick={() => fetchProducts()}>
                Recargar la tabla
            </Button>
            <Button variant="success" onClick={() => handleAdd()} className='ml-3'>
                Agregar producto
            </Button>
        </Container>
            <div className='px-5'>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th onClick={()=>handleSort('id')}>ID</th>
                            <th onClick={()=> handleSort('name')}>Nombre</th>
                            <th>Descripcion</th>
                            <th>Imagenes</th>
                            <th onClick={()=> handleSort('quantity')}>Cantidad</th>
                            <th onClick={()=> handleSort('price')}>Precio</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>
                                    <div>
                                        {product.images && product.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img.url}
                                                alt={`Product ${product.id} Image ${index}`}
                                                style={{ width: '50px' }}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td>{product.quantity}</td>
                                <td>{formatPrice(product.price)}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleEdit(product)}>Editar</Button>
                                    <Button variant="danger" onClick={() => handleRemove(product.id)} className='ml-2'>Remover</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName" className='mb-3'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder='Nombre del producto' onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formDescription" className='mb-3'>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder='Descripcion del producto' onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formImage" className='mb-3'>
                            <Form.Label>Imagenes</Form.Label>
                            <Form.Control type="file" multiple onChange={(e) => handleFileChange(e)} />
                            <div style={{ display: 'flex' }}>
                            {(newProduct.images.map((img, index) => (
                                    <div key={index} className='me-2 mt-2' style={{ cursor: 'pointer', border: index === selectedImageIndex ? '2px solid black' : 'none', height: '104px' }}>
                                        <img
                                            src={img.url}
                                            alt={`Product ${index} Image`}
                                            style={{ width: '100px', height: '100px' }}
                                            onClick={() => handleMainImageUpdateNew(index)}
                                        />
                                        {index === selectedImageIndex && ( // Check if the current image is selected
                                            <div style={{ position: 'relative', top: '-100px', left: '80px', backgroundColor: 'black', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => handleImageDeleteNew(index)}>
                                                X
                                            </div>
                                        )}
                                    </div>
                                )))}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formQuantity" className='mb-3'>
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" placeholder='Cantidad en inventario' onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formPrice" className='mb-3'>
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
                        <Form.Group controlId="formDescription" className='mb-3'>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formImage" className='mb-3'>
                            <Form.Label>Imagenes</Form.Label>
                            <Form.Control type="file" multiple onChange={(e) => setEditProduct({ ...editProduct, imgurl: e.target.value })} />
                            <div style={{ display: 'flex' }}>
                            {(editProduct.images.map((img, index) => (
                                    <div key={index} className='me-2 mt-2' style={{ cursor: 'pointer', border: index === selectedImageIndex ? '2px solid black' : 'none', height: '104px' }}>
                                        <img
                                            src={img.url}
                                            alt={`Product ${index} Image`}
                                            style={{ width: '100px', height: '100px' }}
                                            onClick={() => handleMainImageUpdateEdit(index)}
                                        />
                                        {index === selectedImageIndex && ( 
                                            <div style={{ position: 'relative', top: '-100px', left: '80px', backgroundColor: 'black', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => handleImageDeleteEdit(index)}>
                                                X
                                            </div>
                                        )}
                                    </div>
                                )))}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formQuantity" className='mb-3'>
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" value={editProduct.quantity} onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formPrice" className='mb-3'>
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
        </>
    );
}

export default AdminProducts;

