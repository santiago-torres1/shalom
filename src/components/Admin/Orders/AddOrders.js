import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import formatPrice from '../../formatPrice';
import './orders.css'

const AddOrders = ({ url, showAddModal, setShowAddModal }) => {
    const [shipData, setShipData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        idType: '',
        idNumber: '',
        address: '',
        addressSecondary: '',
        specialInstructions: '',
        city: '',
        department: '',
        postalCode: '',
        amount: 0,
        referenceCode: '',
        products: [],
        paymentType: '',
    });
    const [showProductsModal, setShowProductsModal] = useState(false);
    const departments = [
        "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas",
        "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía",
        "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander",
        "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre",
        "Tolima", "Valle del Cauca", "Vaupés", "Vichada",
    ];
    const [products, setProducts] = useState([]);
    const [sortDirections, setSortDirections] = useState({});
    const [productsAdded, setProductsAdded] = useState([]);

    useEffect(()=>{
        fetchProducts();
    }, [showProductsModal])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShipData({ ...shipData, [name]: value });
    };

    const handleSelectProducts = async () => {
        try {
            const res = await fetchProducts();
            setProducts(res);
        } catch (err) {
            console.error('Error fetching products: ', err)
        } finally {
            setShowProductsModal(true);
        }
    }

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

    const handleSubmit = async() => {
        try {
           const request = {...shipData, paymentType: 'Nequi/Daviplata'};
           const response = await axios.post(`${url}api/submitOrder`, request);
           return (response.data)
        } catch(err) {
           console.log(err);
           throw err;
        }
     };

     const fetchProducts = async () => {
        try {
            const response = await axios.get(`${url}api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAdd = (product) => {
        const existingProductIndex = shipData.products.findIndex((p) => p.id === product.id);
        if (existingProductIndex !== -1) {
            const updatedProductsArray = [...shipData.products];
            updatedProductsArray[existingProductIndex].quantity += 1;
            setShipData({ ...shipData, products: updatedProductsArray });
        } else {
            setShipData({ ...shipData, products: [...shipData.products, { id: product.id, quantity: 1 }] });
        }
    }

    const handleRemove = (product) => {
        const existingProductIndex = shipData.products.findIndex((p) => p.id === product.id);
    
        if (existingProductIndex !== -1) {
            const updatedProductsArray = [...shipData.products];
            const currentQuantity = updatedProductsArray[existingProductIndex].quantity;
    
            if (currentQuantity === 1) {
                // If the product quantity is 1, remove the product from the array
                updatedProductsArray.splice(existingProductIndex, 1);
            } else {
                // If the product quantity is greater than 1, decrease its quantity by 1
                updatedProductsArray[existingProductIndex].quantity -= 1;
            }
    
            setShipData({ ...shipData, products: updatedProductsArray });
        }
    }
    

    return (
        <>
            <Button variant="primary" className='custom-btn' onClick={() => setShowAddModal(true)}>Agregar Orden</Button>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Orden Manualmente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Button className='' onClick={handleSelectProducts}>Seleccionar Productos</Button>
                        <Button variant="primary" type="submit">Guardar Orden</Button>
                        <Form.Group controlId="formBasicFirstName" className="mb-3">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control required type="text" name="firstName" placeholder="Nombres" onChange={handleChange} value={shipData.firstName} />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName" className="mb-3">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control required type="text" name="lastName" placeholder="Apellidos" onChange={handleChange} value={shipData.lastName} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control required type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} value={shipData.email} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPhoneNumber" className="mb-3">
                            <Form.Label>Número de Teléfono</Form.Label>
                            <Form.Control required type="text" name="phoneNumber" placeholder="Número de Teléfono" onChange={handleChange} value={shipData.phoneNumber} />
                        </Form.Group>

                        <Form.Group controlId="formBasicIdType" className="mb-3">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Select required name="idType" onChange={handleChange} value={shipData.idType}>
                                <option value="">Seleccione</option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="CE">Cédula de Extranjería</option>
                                <option value="TI">Tarjeta de Identidad</option>
                                <option value="PA">Pasaporte</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formBasicIdNumber" className="mb-3">
                            <Form.Label>Número de Identificación</Form.Label>
                            <Form.Control required type="text" name="idNumber" placeholder="Número de Identificación" onChange={handleChange} value={shipData.idNumber} />
                        </Form.Group>

                        <Form.Group controlId="formBasicAddress" className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control required type="text" name="address" placeholder="Dirección" onChange={handleChange} value={shipData.address} />
                        </Form.Group>

                        <Form.Group controlId="formBasicAddressSecondary" className="mb-3">
                            <Form.Label>Dirección Secundaria</Form.Label>
                            <Form.Control type="text" name="addressSecondary" placeholder="Dirección Secundaria" onChange={handleChange} value={shipData.addressSecondary} />
                        </Form.Group>

                        <Form.Group controlId="formBasicSpecialInstructions" className="mb-3">
                            <Form.Label>Instrucciones Especiales</Form.Label>
                            <Form.Control type="text" name="specialInstructions" placeholder="Instrucciones Especiales" onChange={handleChange} value={shipData.specialInstructions} />
                        </Form.Group>

                        <Form.Group controlId="formBasicCity" className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control required type="text" name="city" placeholder="Ciudad" onChange={handleChange} value={shipData.city} />
                        </Form.Group>

                        <Form.Group controlId="formBasicDepartment" className="mb-3">
                            <Form.Label>Departamento</Form.Label>
                            <Form.Select required name="department" onChange={handleChange} value={shipData.department}>
                                <option value="">Seleccione</option>
                                {departments.map((department, index) => (
                                    <option key={index} value={department}>{department}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formBasicPostalCode" className="mb-3">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control type="text" name="postalCode" placeholder="Código Postal" onChange={handleChange} value={shipData.postalCode} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal onHide={()=>setShowProductsModal(false)} show={showProductsModal} dialogClassName='custom-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Productos a la orden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {shipData.products ? (
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                        {shipData.products.map((product, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>ID: {product.id} - Cantidad: {product.quantity}</span>
                                <Button variant="danger" onClick={() => handleRemove(product)}>Remover</Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Nada aún</div>
                )}
                    <Table striped bordered hover className='mt-3'>
                        <thead>
                            <tr>
                                <th onClick={()=>handleSort('id')}>ID</th>
                                <th onClick={()=> handleSort('name')}>Nombre</th>
                                <th>Imagenes</th>
                                <th onClick={()=> handleSort('quantity')}>Cantidad</th>
                                <th onClick={()=> handleSort('price')}>Precio</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products ? products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
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
                                        <Button variant="primary" onClick={() => handleAdd(product)}>Agregar</Button>
                                    </td>
                                </tr>
                            )) : <></>}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddOrders;
