import { Container, Button, Form } from 'react-bootstrap';
import './Login.css'
import { Link } from 'react-router-dom';

function Login () {
    return (
        <Container className='my-5'>
            <h1 className='my-5 mx-auto text-center'>Inicio de sesion</h1>
            <Container className='custom-input text-center'>
                <Form>
                    <Form.Group controlId='formBasicEmail' className='mb-3'>
                        <Form.Control type='email' placeholder='Ingresa tu correo'/>
                    </Form.Group>
                    <Form.Group controlId='formBasicPassword' className='mb-3'>
                        <Form.Control type='password' placeholder='Ingresa tu contrasena' />
                    </Form.Group>
                    <Link to="/forgot" className='custom-forgot-password'>Olvidaste tu contrasena?</Link><br/>
                    <Button type='submit' className='mx-auto my-3'>
                        Iniciar Sesion
                    </Button>
                </Form>
                <Button>Crear Cuenta</Button>
            </Container>
        </Container>
    )
}

export default Login