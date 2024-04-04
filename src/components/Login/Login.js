import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';

function Login () {
    console.log(localStorage.getItem('isAdmin'))
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'admin@shalom.com' && password === 'admin') {
            localStorage.setItem('isAdmin', JSON.stringify(true));
            navigate('/admin');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <Container className='my-5'>
            <h1 className='my-5 mx-auto text-center'>Inicio de sesion</h1>
            <Container className='custom-input text-center'>
                <Form onSubmit={handleLogin}>
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
                            placeholder='Ingresa tu contrasena' 
                            className='rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <p className='text-danger'>{error}</p>
                    <Link to="/forgot" className='custom-forgot-password'>Olvidaste tu contrasena?</Link><br/>
                    <Button type='submit' className='mx-auto my-3 custom-login-button'>
                        Iniciar Sesion
                    </Button>
                </Form>
                <Button className='custom-create-account'>Crear Cuenta</Button>
            </Container>
        </Container>
    );
};

export default Login