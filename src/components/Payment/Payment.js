/* 
https://react-bootstrap.netlify.app/docs/forms/validation/
https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-colombia.html
https://docs.envia.com/
*/


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { useProduct } from "../../ProductContext";
import formatPrice from "../formatPrice";
import LoadingIcons from 'react-loading-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Payment.css'

const Payment = () => {
   const departments = [
      "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas", 
      "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", 
      "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", 
      "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", 
      "Tolima", "Valle del Cauca", "Vaupés", "Vichada",
    ];
   const [paymentStep, setPaymentStep] = useState(0);
   const [subtotal, setSubtotal] = useState(0);
   const navigate = useNavigate();
   const { userData } = useAuth();
   const { fetchCartItems, handleAdd, handleRemove, reload } = useProduct();

   const handleEmailSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const email = formData.get('email');
      // Handle email submission
      setPaymentStep(1);
   };

   const handleUserInfoSubmit = (e) => {
      e.preventDefault();
      // Handle user information submission
      setPaymentStep(2);
   };

   const handlePaymentInfoSubmit = (e) => {
      e.preventDefault();
      // Handle payment information submission
      // Redirect to payment gateway or process payment
      navigate('/payment-success'); // Redirect to payment success page
   };

  console.log('hola')
   return (    
      <Container className="mt-3">
         <Row>
            <Col md={8}>
               <h1>Completar el pago</h1>
               <Accordion activeKey={paymentStep}>
                  <Accordion.Item eventKey={0}>
                     <Accordion.Header>
                        1. Tu cuenta
                        <div className="status-icon">
                           {paymentStep===0 && <LoadingIcons.TailSpin stroke="#000000"/>}
                           {paymentStep>0 && <FontAwesomeIcon icon='check' color="green" size="2x"/>}
                        </div>
                     </Accordion.Header>
                     <Accordion.Body>
                        {!userData.email ? (
                           <>
                           <p> Ingresa tu correo para recibir notificaciones sobre el estado de tu orden, o <Link to="/signin" className='custom-forgot-password'>crea tu cuenta aqui.</Link></p>
                           <Form noValidate onSubmit={handleEmailSubmit}>
                              <Form.Group controlId="formBasicEmail">
                                 <Form.Control required type="email" name="email" placeholder="Ingresa tu correo" />
                                 <div className="col-12 d-flex justify-content-center mt-2">
                                    <button className="">Continuar</button>
                                 </div>
                              </Form.Group>
                           </Form>
                           </>
                        ) : (
                           <div>Tu correo: {userData.email}</div>
                        )}
                     </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey={1}>
                     <Accordion.Header>2. Tu información
                        <div className={paymentStep<1 ? "hidden" : "status-icon"}>
                           {paymentStep===1 && <LoadingIcons.TailSpin stroke="#000000"/>}
                           {paymentStep>1 && <FontAwesomeIcon icon='check' color="green" size="2x"/>}
                        </div>
                     </Accordion.Header>
                     <Accordion.Body>
                        <Form noValidate onSubmit={handleUserInfoSubmit}>
                           <div className="d-flex mb-3">
                              <Form.Group controlId="formBasicFirstName" className="col-6 pe-2">
                                 <Form.Control required type="text" name="firstName" placeholder="Nombres"/>
                              </Form.Group>
                              <Form.Group controlId="formBasicLastName" className="col-6 ps-2">
                                 <Form.Control required type="text" name="lastName" placeholder="Apellidos"/>
                              </Form.Group>
                           </div>
                           <div className="d-flex mb-3">
                              <Form.Select className="pe-2" aria-label="Tipo de identificacion">
                                 <option>Tipo de ID</option>
                                 <option> --------- ----------</option>
                                 <option value='CC'>Cedula de Ciudadania</option>
                                 <option value='CE'>Cedula de extranjeria</option>
                                 <option value='TI'>Tarjeta de identidad</option>
                                 <option value='PA'>Pasaporte</option>
                              </Form.Select>
                              <Form.Group controlId="formBasicID" className="col-7 ps-2">
                                 <Form.Control required type="text" name="idNumber" placeholder="Numero de identificacion"/>
                              </Form.Group>
                           </div>
                           <Form.Group controlId="formBasicAddress">
                              <Form.Control required type="text" name="address" placeholder="Direccion" />
                           </Form.Group>
                           <Form.Group controlId="formBasicAddressAdditional" className="mt-3">
                              <Form.Control type="text" name="address" placeholder="Numero de casa, torre o apto (opcional)" />
                           </Form.Group>
                           <div className="d-flex mb-3">
                              <Form.Group controlId="formBasicID" className="col-4 pe-2">
                                 <Form.Control required type="text" name="city" placeholder="Ciudad"/>
                              </Form.Group>
                              <Form.Select aria-label="Tipo de identificacion">
                                 <option>Departamento</option>
                                 <option>------------</option>
                                 {departments.map((department, index)=> (
                                    <option key={index} value={department}>{department}</option>
                                 ))}
                              </Form.Select>
                              <Form.Group controlId="formBasicID" className="col-4 pe-2">
                                 <Form.Control type="text" name="city" placeholder="Cod. postal (opcional)"/>
                              </Form.Group>
                           </div>
                           <div className="col-12 d-flex justify-content-center mt-2">
                              <button type="button" className="" onClick={()=>setPaymentStep(0)}>Volver</button>
                              <button className="">Continuar</button>
                           </div>
                        </Form>
                     </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey={2}>
                     <Accordion.Header>3. Información de pago</Accordion.Header>
                     <Accordion.Body>
                        <Form onSubmit={handlePaymentInfoSubmit}>
                           <Button variant="primary" type="submit">
                              Pagar
                           </Button>
                        </Form>
                     </Accordion.Body>
                  </Accordion.Item>
               </Accordion>
            </Col>
            <Col md={4}>
               <h2>Subtotal</h2>
               <div className='d-flex flex-column'>
                  <p>Subtotal: {formatPrice(subtotal)}</p>
                  <p>Envío: $0.00</p>
                  <p>Descuentos: $0.00</p>
                  <p>Total: {formatPrice(subtotal)}</p>
               </div>
            </Col>
         </Row>
      </Container>
   );
}

export default Payment;
