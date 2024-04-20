import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const PaymentConfirmationPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionState = searchParams.get('transactionState');
  const referenceCode = searchParams.get('referenceCode');
  const buyerEmail = searchParams.get('buyerEmail');

  let message = '';
  switch (transactionState) {
    case '4':
      message = `Gracias por tu compra! Recibirás una confirmación a tu correo (${buyerEmail}) tan pronto tu paquete sea enviado. El número de referencia de tu pedido es ${referenceCode}.`;
      break;
    case '7':
      message = `Tu pago se encuentra siendo procesado. Recibirás todas las actualizaciones a tu correo (${buyerEmail}). El número de referencia de tu pedido es ${referenceCode}.`;
      break;
    default:
      message = 'Tu pago no se ha podido procesar. Por favor, intenta nuevamente.';
  }

  return (
    <Container className='my-5'>
      <h1>Pago Procesado</h1>
      <h2>Confirmación de Pago</h2>
      <p>{message}</p>
    </Container>
  );
};

export default PaymentConfirmationPage;
