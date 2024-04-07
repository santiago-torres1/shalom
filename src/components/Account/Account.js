import { Container, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext';
import { useEffect } from 'react';

function Account({userData}) {
    const { logout } = useAuth();
    const handleLogOut = async() => {
        try {
            await logout('/api/logout');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    if (!userData.isAuthenticated){
        return <Navigate to='/login' />
    } 

    return (
        <Container>
            <h1>Bienvenido/a, {userData.name}!</h1>
            <Button onClick={handleLogOut}>Cerrar Sesion</Button>
        </Container>
    )
}

export default Account;