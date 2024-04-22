import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { Container, Button } from "react-bootstrap"
import { useLocation } from 'react-router-dom';
import AdminProducts from "./AdminProducts"
import AdminOrders from "./Orders/AdminOrders";
import { useAuth } from "../../AuthContext";

function Admin () {
    const location = useLocation();
    const navigate = useNavigate();
    const [current, setCurrent] = useState('admin');
    const { userData, url } = useAuth()
    const adminData = userData
    useEffect(() => {
        setCurrent(location.pathname)
      }, [location]) 
    if (!adminData.isAdmin) {
        return <Navigate to="/login" />
    }   
    return (
        <div className="my-4 d-flex flex-column">
            <Container>
                <h1>Administracion</h1>
                <p>Usuario actual: {adminData.name}</p>
            </Container>
            {current === '/admin'&& (
                <>
                    <Button onClick={()=>{navigate('/admin/products')}}>Ver productos</Button>
                    <Button onClick={()=>{navigate('/admin/orders')}}>Ver ordenes</Button>
                    <Button onClick={()=>{navigate('/admin/customers')}}>Ver clientes</Button>
                </>
            )}
            {current === '/admin/products' && <AdminProducts url={url}/>}
            {current === '/admin/orders' && <AdminOrders url={url}/>}
        </div>
    )
}

export default Admin