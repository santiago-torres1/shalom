import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import './Login.css'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, userData } = useAuth();

    if (userData.isAdmin) {
        return <Navigate to='/admin' />;
    } else if (userData.isAuthenticated) {
        return <Navigate to='/' />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            if (error.response.status === 401) {
                setError('Tu contraseña es incorrecta');
            } else if (error.response.status === 404) {
                setError('No se encontró ninguna cuenta asociada con ese correo electrónico.');
            } else {
                setError('Error de servidor');
            }
        }
    }



    return (
        <Container className='my-5'>
            <h1 className='my-5 mx-auto text-center'>Inicio de sesión</h1>
            <Container className='custom-input text-center'>
                <Form onSubmit={handleLogin} noValidate>
                    <Form.Group controlId='formBasicEmail' className='mb-3'>
                        <Form.Control 
                            type='email' 
                            placeholder='Ingresa tu correo' 
                            className='rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='formBasicPassword' className='mb-5'>
                        <Form.Control 
                            type='password' 
                            placeholder='Ingresa tu contraseña' 
                            className='rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <p className='text-danger'>{error}</p>
                    <Link to="/forgot" className='custom-forgot-password'>¿Olvidaste tu contraseña?</Link><br/>
                    <Button type='submit' className='mx-auto my-3 custom-login-button'>
                        Iniciar sesión
                    </Button>
                </Form>
                <Button className='custom-create-account' onClick={()=>navigate('/signin')}>Crear cuenta</Button>
            </Container>
        </Container>
    );
};

export default Login;
