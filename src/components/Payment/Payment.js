/* 
https://react-bootstrap.netlify.app/docs/forms/validation/
https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-colombia.html
https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html
https://docs.envia.com/
https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/
*/


import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Row, Col, Accordion, ListGroup, Image, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { useProduct } from "../../ProductContext";
import formatPrice from "../formatPrice";
import LoadingIcons from 'react-loading-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Payment.css'
import brandName from "../../assets/images/Shalom_transparent.png";
import axios from "axios";

const Payment = () => {
   const formRef = useRef();
   const departments = [
      "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas", 
      "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", 
      "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", 
      "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", 
      "Tolima", "Valle del Cauca", "Vaupés", "Vichada",
    ];
   const [manualPaymentDisabled, setManualPaymentDisabled] = useState(false);
   const [reloadPayu, setReloadPayu] = useState(false);
   const [paymentStep, setPaymentStep] = useState(0);
   const [ openHeader, setOpenHeader ] = useState();
   const [total, setTotal] = useState(0);
   const [cartItems, setCartItems] = useState([]);
   const navigate = useNavigate();
   const { userData, logout, url } = useAuth();
   const [width, setWidth] = useState(window.innerWidth);
   const { fetchCartItems, handleAdd, handleRemove, reload } = useProduct();
   const [ redirectLogin, setRedirectLogin ] = useState(false);
   const [ validationErrors, setValidationErrors ] = useState({
      errorFirstName: '',
      errorLastName: '',
      errorPhoneNumber: '',
      errorIdType: '',
      errorIdNumber: '',
      errorEmail: '',
      errorAddress: '',
      errorCity: '',
      errorDepartment: '',
   })

   const [ shippingCost, setShippingCost ] = useState(0);
   const [ shipData, setShipData ] = useState({
      firstName: '',
      lastName: '',
      email: userData.email,
      phoneNumber: '',
      idType: '',
      idNumber: '',
      address: '',
      addressSecondary: '',
      specialInstructions: '',
      city: '',
      department: '',
      postalCode: '',
      amount: 0,
      referenceCode: '',
      products: [],
      paymentType: '',
   });
   
   const handleChange = (e) => {
      const { name, value } = e.target;
      setShipData(prevState => ({
          ...prevState,
          [name]: value
      }))
   };

   const getCartItems = async () => {
      const items = await fetchCartItems();
      setCartItems(items);
    };
   useEffect(() => {
      getCartItems()
   }, []);

   useEffect(() => {
      const calcResult = calculateTotal(cartItems);
      setTotal(calcResult.total);
      setShippingCost(calcResult.shippingCost);
      setShipData({...shipData, amount: calcResult.total, products: cartItems, email: userData.email});
  }, [cartItems]);

  useEffect(() => {
   const handleResize = () => {
     setWidth(window.innerWidth);
   };

   window.addEventListener("resize", handleResize);

   return () => {
     window.removeEventListener("resize", handleResize);
   };
 }, []);

   const handleEmailSubmit = async(e) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      e.preventDefault();
      if (!emailRegex.test(shipData.email)) {
         setValidationErrors({...validationErrors, errorEmail: 'Por favor ingresa un correo valido'});
         setRedirectLogin(false);
         return
      } else {
         const response = await axios.get(`${url}api/check-email`, {params: {email: shipData.email}});
         console.log(response.data.exists);
         if (response.data.exists) {
            setValidationErrors({...validationErrors, errorEmail: 'Este correo se encuentra asociado a una cuenta. Por favor, '});
            setRedirectLogin(true);
         } else {
            setValidationErrors({...validationErrors, errorEmail: ''});
            setPaymentStep(1);
         }
   }   
   };

   const validateUserInfoSubmit = (e) => {
      console.log(shipData);
      e.preventDefault();
      const phoneRegex = /^3[\d]{9}$/;
      const errors = { ...validationErrors }; 
    
      if (!shipData.firstName.trim()) {
        errors.errorFirstName = 'Por favor ingresa tu nombre';
      } else {
        errors.errorFirstName = ''; 
      }
    
      if (!shipData.lastName.trim()) {
        errors.errorLastName = 'Por favor ingresa tu apellido';
      } else {
        errors.errorLastName = ''; 
      }

      if (!phoneRegex.test(shipData.phoneNumber)) {
        errors.errorPhoneNumber = 'Por favor ingresa un numero de celular colombiano';
      } else {
        errors.errorPhoneNumber = ''; 
      }
    
      if (!shipData.idType.trim()) {
        errors.errorIdType = 'Por favor elige un tipo de documento';
      } else {
        errors.errorIdType = ''; 
      }
    
      if (!shipData.idNumber.trim() || isNaN(shipData.idNumber)) {
        errors.errorIdNumber = 'Por favor ingresa tu numero de documento';
      } else {
        errors.errorIdNumber = ''; 
      }
    
      if (!shipData.address.trim()) {
        errors.errorAddress = 'Por favor ingresa tu direccion';
      } else {
        errors.errorAddress = ''; 
      }
    
      if (!shipData.city.trim()) {
        errors.errorCity = 'Por favor ingresa tu ciudad';
      } else {
        errors.errorCity = ''; 
      }
    
      if (!shipData.department.trim()) {
        errors.errorDepartment = 'Por favor elige tu departamento';
      } else {
        errors.errorDepartment = ''; 
      }
    
      setValidationErrors({
        ...errors,
        errorEmail: validationErrors.errorEmail 
      });
    
      if (Object.values(errors).every((error) => !error)) {
        setPaymentStep(2);
      }
    };

   const calculateTotal = (items) => {
      const subtotalArray = items.map(product => (product.price*product.quantity))
      const subtotal = subtotalArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const shipCost = (subtotal > 80000 ? 0 : 15000);
      return ({total: subtotal + shipCost, shippingCost: shipCost });
  }

   const handleUserInfoSubmit = async(paymentType) => {
      console.log(paymentType);
      try {
         const request = {...shipData, paymentType: paymentType};
         console.log(request);
         const response = await axios.post(`${url}api/submitOrder`, request);
         return (response.data)
      } catch(err) {
         console.log(err);
         throw err;
      }
   };

   const handleLogout = async() => {
      await logout();
      navigate('/payment')
   }

   const handleManualPayment = async()=> {
      try {
         setManualPaymentDisabled(true);
         const newData = await handleUserInfoSubmit('Nequi/Daviplata');
         setShipData(newData);
      } catch (err) {
         console.log('error: ', err)
      }
   }

   useEffect(()=>{
      userData.email ? setPaymentStep(1) : setPaymentStep(0);
   }, [])

   const handlePayUPayment = async() => {
      try {
         const newData = await handleUserInfoSubmit('PayU');
         setShipData(newData);
         setReloadPayu(!reloadPayu);
     } catch (error) {
         console.error('Error:', error);
     } 
   } 

   useEffect(() => {
      if (reloadPayu) {
          formRef.current.submit(); 
      }
  }, [reloadPayu]);
   

   return (    
      <>
      <header className="header_section sticky-top custom-header-bg">
        <Navbar expand="lg" className="custom_nav-container">
          <Link to="/" className="navbar-brand px-auto mx-3 my-2" id="brand-img">
            <img src={brandName} alt="logo" style={{ width: "120px", height: "auto" }} />
          </Link>
          <div className="d-flex" style={width < 992 ? { height: "42px" } : {}}>
            <Navbar.Toggle aria-controls="navbarSupportedContent" aria-expanded={openHeader} onClick={() => setOpenHeader(!openHeader)} className="custom-toggler mx-3"/>
          </div>
          <Navbar.Collapse in={openHeader} id="navbarSupportedContent">
            <Nav className="navbar-nav mr-auto">
               <Nav.Item>
                  <Link to="/" className="nav-link px-3" onClick={() => setOpenHeader(false)}>
                     Volver a la pagina principal
                  </Link>
               </Nav.Item>
               <Nav.Item>
                  <Link to="/contact" className="nav-link px-3 custom-navlink" onClick={() => setOpenHeader(false)}>
                     Contáctanos
                  </Link>
               </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
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
                                 <Form.Control required type="email" name="email" placeholder="Ingresa tu correo" value={shipData.email} onChange={(e)=>setShipData({...shipData, email:e.target.value})} isInvalid={!!validationErrors.errorEmail}/>
                                 <Form.Control.Feedback type="invalid">
                                    {
                                    <>
                                       {validationErrors.errorEmail}{redirectLogin && <Link to={'/login'} className='custom-login'>inicia sesion aqui.</Link>}
                                    </>
                                    }
                                 </Form.Control.Feedback>
                                 <div className="col-12 d-flex justify-content-center mt-2">
                                    <button type='button' onClick={handleEmailSubmit} className="continue-btn">Continuar</button>
                                 </div>
                              </Form.Group>
                           </Form>
                           </>
                        ) : (
                           <div>
                              <p>Tu correo: {userData.email}</p>
                              <p>Si deseas usar otro correo o otra cuenta,  <Link onClick={()=>handleLogout()} className='custom-forgot-password'>cierra sesion.</Link></p>
                              <button type='button' onClick={()=>{setPaymentStep(1)}} className="continue-btn">Continuar</button>
                           </div>
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
                        <Form noValidate onSubmit={validateUserInfoSubmit}>
                           <div className="d-flex mb-3">
                              <Form.Group controlId="formBasicFirstName" className="col-6 pe-2">
                                 <Form.Control required type="text" name="firstName" placeholder="Nombres" onChange={handleChange} value={shipData.firstName} isInvalid={!!validationErrors.errorFirstName} />
                                 <Form.Control.Feedback type="invalid">
                                 {validationErrors.errorFirstName}
                                 </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="formBasicLastName" className="col-6 ps-2">
                                 <Form.Control required type="text" name="lastName" placeholder="Apellidos" onChange={handleChange} value={shipData.lastName} isInvalid={!!validationErrors.errorLastName} />
                                 <Form.Control.Feedback type="invalid">
                                 {validationErrors.errorLastName}
                                 </Form.Control.Feedback>
                              </Form.Group>
                           </div>
                           <Form.Group controlId="formBasicphoneNumber" className="col-12 mb-3">
                              <Form.Control required type="text" name="phoneNumber" placeholder="Numero de telefono" onChange={handleChange} value={shipData.phoneNumber} isInvalid={!!validationErrors.errorPhoneNumber} />
                              <Form.Control.Feedback type="invalid">
                                 {validationErrors.errorPhoneNumber}
                              </Form.Control.Feedback>
                           </Form.Group>
                           <div className="d-flex mb-3">
                              <Form.Select name='idType' aria-label="Tipodedocumento" required onChange={handleChange} value={shipData.idType} isInvalid={!!validationErrors.errorIdType} style={{height: '36px'}}>
                                 <option value=''>Tipo de documento</option>
                                 <option disabled> --------- ----------</option>
                                 <option value='CC'>Cedula de Ciudadania</option>
                                 <option value='CE'>Cedula de extranjeria</option>
                                 <option value='TI'>Tarjeta de identidad</option>
                                 <option value='PA'>Pasaporte</option>
                              </Form.Select>
                              <Form.Group controlId="formBasicID" className="col-7 ps-2">
                                 <Form.Control required type="text" name="idNumber" placeholder="Numero de identificacion" onChange={handleChange} value={shipData.idNumber} isInvalid={!!validationErrors.errorIdNumber} />
                                 <Form.Control.Feedback type="invalid">
                                 {validationErrors.errorIdNumber}
                                 </Form.Control.Feedback>
                              </Form.Group>
                           </div>
                           <Form.Group controlId="formBasicAddress">
                              <Form.Control required type="text" name="address" placeholder="Direccion" onChange={handleChange} value={shipData.address} isInvalid={!!validationErrors.errorAddress} />
                              <Form.Control.Feedback type="invalid">
                                 {validationErrors.errorAddress}
                              </Form.Control.Feedback>
                           </Form.Group>
                           <Form.Group controlId="formBasicAddressAdditional" className="mt-3">
                              <Form.Control type="text" name="addressSecondary" placeholder="Numero de casa, torre o apto (opcional)" onChange={handleChange} value={shipData.addressSecondary} />
                           </Form.Group>
                           <Form.Group controlId="formBasicSpecialInstructions" className="mt-3">
                              <Form.Control type="text" name="specialInstructions" placeholder="Instrucciones adicionales (ej. dejar en porteria)." onChange={handleChange} value={shipData.specialInstructions} />
                           </Form.Group>
                           <div className="d-flex my-3">
                              <Form.Group controlId="formBasicCity" className="col-4 pe-2">
                                 <Form.Control required type="text" name="city" placeholder="Ciudad" onChange={handleChange} value={shipData.city} isInvalid={!!validationErrors.errorCity} />
                                 <Form.Control.Feedback type="invalid">
                                 {validationErrors.errorCity}
                                 </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Select name="department" aria-label="Departamento" onChange={handleChange} value={shipData.department} isInvalid={!!validationErrors.errorDepartment} style={{height: '36px'}}>
                                 <option value=''>Departamento</option>
                                 <option disabled>------------</option>
                                 {departments.map((department, index)=> (
                                 <option key={index} value={department}>{department}</option>
                                 ))}
                              </Form.Select>
                              <Form.Group controlId="formBasicID" className="col-4 ps-2" onChange={handleChange} value={shipData.postalCode}>
                                 <Form.Control type="text" name="postalCode" placeholder="Cod. postal (opcional)" />
                              </Form.Group>
                           </div>
                           <div className="col-12 d-flex justify-content-center mt-2">
                              <button type="button" className="back-btn me-3" onClick={() => setPaymentStep(0)}>Volver</button>
                              <button className="continue-btn">Continuar</button>
                           </div>
                        </Form>
                     </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey={2}>
                     <Accordion.Header>3. Información de pago</Accordion.Header>
                     <Accordion.Body>
                        <p>Elige tu método de pago de una de las siguientes opciones:</p>
                        <div className="row">
                           <div className="col-md-6">
                              <p>Paga de forma segura con tarjeta de crédito, débito o PSE utilizando PayU:</p>
                              <form ref={formRef} id="payuForm" method="POST" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                                 <input type="hidden" name="merchantId" value={shipData.merchantId} />
                                 <input type="hidden" name="accountId" value={shipData.accountId} />
                                 <input type="hidden" name="description" value="Test PAYU" />
                                 <input type="hidden" name="referenceCode" value={shipData.referenceCode} />
                                 <input type="hidden" name="amount" value={total} />
                                 <input type="hidden" name="tax" value={parseFloat((total * 0.15966).toFixed(2))} />
                                 <input type="hidden" name="taxReturnBase" value={parseFloat((total * 0.84034).toFixed(2))} />
                                 <input type="hidden" name="currency" value={shipData.currency} />
                                 <input type="hidden" name="signature" value={shipData.signature} />
                                 <input type="hidden" name="test" value="1" />
                                 <input type="hidden" name="buyerEmail" value={shipData.email} />
                                 <input type="hidden" name="buyerFullName" value={`${shipData.firstName} ${shipData.lastName}`} />
                                 <input type="hidden" name="telephone" value={shipData.phoneNumber} />
                                 <input type="hidden" name="responseUrl" value={`${url}api/paymentPayU`} />
                                 <input type="hidden" name="confirmationUrl" value={`${url}api/paymentPayU`} />
                                 <input type="hidden" name="shippingAddress" value={shipData.address} />
                                 <input type="hidden" name="shippingCity" value={shipData.city} />
                                 <input type="hidden" name="shippingCountry" value="CO" />
                                 <input type="hidden" name="algorithmSignature" value="SHA256" /> 
                              </form>
                              <button type="button" className="continue-btn" onClick={handlePayUPayment}>Pagar con PayU</button>
                           </div>
                           <div className="col-md-6">
                              <p>Paga manualmente con Nequi o Daviplata:</p>
                              <p>Para pagar con Nequi o Daviplata, pulsa el botón para enviar tu orden y generar un código de referencia. Luego, puedes transferir al número 3125802253. Recuerda incluir tu correo o el número de referencia en los detalles de la transferencia.</p>
                              <button className="continue-btn" type="button" onClick={handleManualPayment} disabled={manualPaymentDisabled}>Pagar con Nequi o Daviplata</button>
                              {(shipData.referenceCode&&manualPaymentDisabled) && <p>Tu numero de referencia: {shipData.referenceCode}</p>}
                           </div>
                        </div>
                        
                        <button type="button" className="back-btn" onClick={()=>setPaymentStep(1)}>Volver</button>
                     </Accordion.Body>
                  </Accordion.Item>
               </Accordion>
            </Col>
            <Col md={4}>
               <h2>Resumen de tu compra</h2>
               <div className='d-flex flex-column'>
                  {cartItems.map((product)=>(
                     <ListGroup.Item key={product.itemId} className='d-flex align-items-center border-0'>
                        <Image src={product.images.length > 0 ? product.images[0].url : product.imgurl} alt={product.name} style={{ marginRight: '10px', width: '70px', height: 'auto' }} />
                        <Container>
                           <p>{product.name}</p>
                           <p>{formatPrice(product.price)} x {product.quantity}</p>
                           <div className='d-flex justify-content-between align-items-center col-12'>
                           </div>
                        </Container>
                     </ListGroup.Item>
                  ))}
                  <br></br>
                  <p>Envío: {formatPrice(shippingCost)}</p>
                  <p>Total: {formatPrice(total)}</p>
               </div>
            </Col>
         </Row>
      </Container>
      </>
   );
}

export default Payment;
