import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Account({userData}) {
    const navigate = useNavigate();
    const logOut = async() => {
        try {
            const response = await axios.post('/api/logout');
            console.log(response.data); 
            navigate('/')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    return (
        <Container>
            <h1>Bienvenido/a, {userData.name}!</h1>
            <Button onClick={logOut}>Cerrar Sesion</Button>
        </Container>
    )
}

export default Account;