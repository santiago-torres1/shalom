import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"
import { Container, Button } from "react-bootstrap"
import { useLocation } from 'react-router-dom';
import AdminProducts from "./AdminProducts"

function Admin ({adminData, url}) {
    const location = useLocation();
    const [current, setCurrent] = useState('admin');
    useEffect(() => {
        setCurrent(location.pathname)
      }, [location]) 
    if (!adminData.isAdmin) {
        return <Navigate to="/login" />
    }   
    return (
        <Container className="my-4">
            <h1>Administracion</h1>
            <p>Usuario actual: {adminData.name}</p>
            <Button>Ver productos</Button>
            <Button>Ver ordenes</Button>
            <Button>Ver clientes</Button>
            {current === '/admin/products' && <AdminProducts url={url}/>}
        </Container>
    )
}

export default Admin