import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';

function Login ({isAdmin, onAuthChange}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(isAdmin);
    const [name, setName] = useState('');

    useEffect(() => {
        onAuthChange(admin)
        if (admin === true) {
            navigate('/admin');
        }
    }, [admin, onAuthChange, navigate])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://shalom-backend-86344e50bd95.herokuapp.com/api/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            if(!response.ok) {
                throw new Error('Error con el servidor')
            }
            const data = await response.json();
            if (data.isAuthenticated) {
                if (data.isAdmin) {
                    setAdmin(true);
                } else {
                    navigate('/');
                }
                setName(data.name)
            } else {
                setError('Usuario o contraseña incorrectos')
            }
        } catch (error) {
            setError('Error al iniciar sesion')
        }
    }

    return (
        <Container className='my-5'>
            <h1 className='my-5 mx-auto text-center'>Inicio de sesion</h1>
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
                <Button className='custom-create-account' onClick={()=>navigate('/signin')}>Crear Cuenta</Button>
            </Container>
        </Container>
    );
};

export default Login