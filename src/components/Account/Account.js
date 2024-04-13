import { Container, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext';


function Account() {
    const { logout, userData } = useAuth();
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