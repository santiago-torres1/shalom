/*
codigos de estado:
1 - pago aprobado
2 - pago pendiente
3 - pago rechazado
4 - enviado
5 - recibido (completado)
6 - cancelado
7 - pago siendo procesado por el cliente
8 - pago siendo procesado por PayU (efecty)
*/

import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form, Pagination } from 'react-bootstrap';
import axios from 'axios';
import formatPrice from '../../formatPrice';
import AddOrders from './AddOrders';

function AdminOrders({ url }) {
    const [orders, setOrders] = useState([]);
    const [orderBy, setOrderBy] = useState('orderDate');
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
    const [showActionsModal, setShowActionsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [trackingId, setTrackingId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');

    const ordersPerPage = 10;
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
 
    useEffect(() => {
        fetchOrders();
    }, [orderBy, search, statusFilter]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${url}api/orders`, {
                params: {
                    orderBy,
                    search,
                    statusFilter
                }
            });
            const formattedOrders = response.data.map(order => ({
                ...order,
                orderDate: formatOrderDate(order.orderDate)
            }));
            setOrders(formattedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const getStatusMessage = (status) => {
        if (status === '1') {
            return 'Pago aprobado'
        } else if (status === '2') {
            return 'Pago pendiente'
        } else if (status === '3') {
            return 'Pago rechazado'
        } else if (status === '4') {
            return 'Enviado'
        } else if (status === '5') {
            return 'Completado'
        } else if (status === '6') {
            return 'Pedido cancelado'
        } else if (status === '7') {
            return 'Pago pendiente (cliente)'
        } else if (status === '8') {
            return 'Pago pendiente (efecty)'
        }
    }

    const formatOrderDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return date.toLocaleDateString('en-GB', options);
    };

    const handleSort = (columnName) => {
        setOrderBy(orderBy === columnName ? `-${columnName}` : columnName);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleShowProductModal = (order) => {
        setSelectedOrder(order);
        setShowProductModal(true);
    };

    const handleShowOrderDetailsModal = (order) => {
        setSelectedOrder(order);
        console.log(order);
        setShowOrderDetailsModal(true);
    };

    const handleShowActionsModal = (order) => {
        setSelectedOrder(order);
        setShowActionsModal(true);
    };

    const handleCloseProductModal = () => {
        setSelectedOrder(null);
        setShowProductModal(false);
    };

    const handleCloseOrderDetailsModal = () => {
        setSelectedOrder(null);
        setShowOrderDetailsModal(false);
    };

    const handleCloseActionsModal = () => {
        setSelectedOrder(null);
        setShowActionsModal(false);
    };

    const handleMarkPaid = async () => {
        try {
            await axios.put(`${url}api/orders/${selectedOrder.referenceNumber}`, { orderStatus: '1' });
            fetchOrders(); // Refresh orders after status change
        } catch (error) {
            console.error('Error marking order as paid:', error);
        }
    };

    const handleMarkShipped = () => {
        setShowShippingModal(true);
    };

    const handleCloseShippingModal = () => {
        setShowShippingModal(false);
    };

    const handleMarkShippedAndClose = async () => {
        try {
            // Make API call to mark order as shipped and provide tracking ID
            await axios.put(`${url}api/orders/${selectedOrder.referenceNumber}`, { orderStatus: '4', trackingId });
            // Close the shipping modal
            handleCloseShippingModal();
            // Fetch orders again to update the list
            fetchOrders();
        } catch (error) {
            console.error('Error marking order as shipped:', error);
        }
    };

    const handleCompleteOrder = async () => {
        try {
            await axios.put(`${url}api/orders/${selectedOrder.referenceNumber}`, { orderStatus: '5' });
            fetchOrders(); // Refresh orders after status change
        } catch (error) {
            console.error('Error completing order:', error);
        } finally {
            setShowActionsModal(false);
        }
    };

    const handleCancelOrder = async () => {
        try {
            await axios.put(`${url}api/orders/${selectedOrder.referenceNumber}`, { orderStatus: '6' });
            fetchOrders(); // Refresh orders after status change
        } catch (error) {
            console.error('Error canceling order:', error);
        } finally {
            setShowActionsModal(false);
        }
    };

    return (
        <Container className="my-4">
            <h1 className="mb-3">Administracion de ordenes</h1>
            <Button className='' onClick={()=>setShowAddModal(true)}>Agregar orden</Button>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <Form.Control type="text" placeholder="Busca por email, numero de referencia o nombre" value={search} onChange={handleSearch} />
                </div>
                <div>
                    <Form.Select onChange={(e) => handleSort(e.target.value)}>
                        <option value="">Ordenar por...</option>
                        <option value="referenceNumber">Numero de Referencia</option>
                        <option value="orderDate">Fecha</option>
                        <option value="orderName">Nombre</option>
                        <option value="totalAmount">Total</option>
                    </Form.Select>
                </div>
                <div>
                    <Form.Select onChange={handleStatusFilterChange}>
                        <option value="">Filtrar por Estado</option>
                        <option value="1">Pago Aprobado</option>
                        <option value="2">Pago Pendiente</option>
                        <option value="3">Pago Rechazado</option>
                        <option value="4">Enviado</option>
                        <option value="5">Recibido (Completado)</option>
                        <option value="6">Cancelado</option>
                        <option value="7">Pago siendo procesado por el cliente</option>
                        <option value="8">Pago siendo procesado por PayU (efecty)</option>
                    </Form.Select>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Numero de Referencia</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Productos</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.referenceNumber}>
                            <td>{order.referenceNumber}</td>
                            <td>{order.orderName}</td>
                            <td>{order.email}</td>
                            <td><Button variant='primary' onClick={() => handleShowProductModal(order)}>Ver productos</Button></td>
                            <td>{order.orderDate}</td>
                            <td>{formatPrice(order.totalAmount)}</td>
                            <td>{getStatusMessage(order.orderStatus)}</td>
                            <td>
                                <Button variant="info" onClick={() => handleShowOrderDetailsModal(order)}>Ver detalles</Button>
                                <Button variant="secondary" className="ms-2" onClick={() => handleShowActionsModal(order)}>Acciones</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={() => setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage)} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(nextPage => nextPage < totalPages ? nextPage + 1 : nextPage)} />
            </Pagination>
            <Modal show={showProductModal} onHide={handleCloseProductModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Productos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Referencia</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder && selectedOrder.products.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
            <Modal show={showOrderDetailsModal} onHide={handleCloseOrderDetailsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Productos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder &&
                        <Container>
                            <p>Email: {selectedOrder.email}</p>
                            <p>Fecha: {selectedOrder.orderDate}</p>
                            <p>Referencia: {selectedOrder.referenceNumber}</p>
                            <p>Nombre: {selectedOrder.orderName}</p>
                            <p>Dirección: {selectedOrder.address}</p>
                            <p>Dirección Secundaria: {selectedOrder.addressSecondary}</p>
                            <p>Instrucciones Especiales: {selectedOrder.specialInstructions}</p>
                            <p>Ciudad: {selectedOrder.city}</p>
                            <p>Departamento: {selectedOrder.department}</p>
                            <p>Código Postal: {selectedOrder.postalCode}</p>
                            <p>Tipo de Identificación: {selectedOrder.idType}</p>
                            <p>Número de Identificación: {selectedOrder.idNumber}</p>
                        </Container>
                    }
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Referencia</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder && selectedOrder.products.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
            <Modal show={showActionsModal} onHide={handleCloseActionsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Acciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="success" onClick={handleMarkPaid} disabled={selectedOrder && selectedOrder.orderStatus !== '2'}>
                        Marcar como pagado
                    </Button>
                    <Button variant="primary" onClick={handleMarkShipped} disabled={selectedOrder && selectedOrder.orderStatus !== '1'}>
                        Enviar
                    </Button>
                    <Button variant="info" onClick={handleCompleteOrder} disabled={selectedOrder && selectedOrder.orderStatus !== '4'}>
                        Completar
                    </Button>
                    <Button variant="danger" onClick={handleCancelOrder} disabled={selectedOrder && (selectedOrder.orderStatus === '5' || selectedOrder.orderStatus === '6')}>
                        Cancelar
                    </Button>
                </Modal.Body>
            </Modal>
            <Modal show={showShippingModal} onHide={handleCloseShippingModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Envío</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <h3>Información de envio</h3>
                        {selectedOrder &&
                            <Container>
                                <p>Referencia: {selectedOrder.referenceNumber}</p>
                                <p>Nombre: {selectedOrder.orderName}</p>
                                <p>Dirección: {selectedOrder.address}</p>
                                <p>Dirección Secundaria: {selectedOrder.addressSecondary}</p>
                                <p>Instrucciones Especiales: {selectedOrder.specialInstructions}</p>
                                <p>Ciudad: {selectedOrder.city}</p>
                                <p>Departamento: {selectedOrder.department}</p>
                                <p>Código Postal: {selectedOrder.postalCode}</p>
                                <p>Tipo de Identificación: {selectedOrder.idType}</p>
                                <p>Número de Identificación: {selectedOrder.idNumber}</p>
                            </Container>
                        }
                        <Form.Group className="mb-3" controlId="trackingId">
                            <Form.Label>Ingrese el ID de seguimiento</Form.Label>
                            <Form.Control type="text" placeholder="ID de seguimiento" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseShippingModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleMarkShippedAndClose}>
                        Marcar como enviado
                    </Button>
                </Modal.Footer>
            </Modal>
            <AddOrders url={url} showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
        </Container>
    );
}

export default AdminOrders;
