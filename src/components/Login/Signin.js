import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Signin({url}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${url}api/signup`, formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            setError('');
            navigate('/login');
        } catch (error) {
            setError('No se ha podido crear tu cuenta. Intenta mas tarde');
        }
    };
    
    return (
    <Container className='my-5'>
        <h1 className='my-5 mx-auto text-center'>Crear Cuenta</h1>
        <Container className='custom-input text-center'>
            <Form onSubmit={handleSubmit} noValidate>
                <div className='d-flex justify-content-between'>
                    <Form.Group controlId='formBasicFirstName' className='mb-3 pe-1'>
                        <Form.Control 
                            type='text' 
                            name='firstName'
                            placeholder='Ingresa tu nombre' 
                            className='rounded-0'
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='formBasicLastName' className='mb-3 ps-1'>
                        <Form.Control 
                            type='text' 
                            name='lastName'
                            placeholder='Ingresa tu apellido' 
                            className='rounded-0'
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>
                <Form.Group controlId='formBasicEmail' className='mb-3'>
                    <Form.Control 
                        type='email' 
                        name='email'
                        placeholder='Ingresa tu correo electrónico' 
                        className='rounded-0'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId='formBasicEmail' className='mb-3'>
                    <Form.Control 
                        type='text' 
                        name='phoneNumber'
                        placeholder='Ingresa tu numero de telefono' 
                        className='rounded-0'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' className='mb-3'>
                    <Form.Control 
                        type='password' 
                        name='password'
                        placeholder='Ingresa tu contraseña' 
                        className='rounded-0'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId='formBasicConfirmPassword' className='mb-3'>
                    <Form.Control 
                        type='password' 
                        name='confirmPassword'
                        placeholder='Confirma tu contraseña' 
                        className='rounded-0'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <p className='text-danger mb-0'>{error}</p>
                <Button type='submit' className='mx-auto my-3 custom-login-button'>
                    Crear Cuenta
                </Button>
            </Form>
            <Link to="/login" className='custom-forgot-password'>¿Ya tienes una cuenta? Inicia sesión aquí</Link><br/>
        </Container>
    </Container>
);
}

export default Signin;
