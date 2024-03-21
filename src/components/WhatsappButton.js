import React from "react";
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

function WhatsappButton() {
    return (
        <div className="whatsapp-button" style={{ zIndex: 99999, position: "fixed" }}>
            <WhatsAppWidget
                phoneNumber="+12268996712"
                replyTimeText="Respondemos en menos de 24 horas"
                companyName="Shalom Colombia"
                sendButtonText="Enviar"
                inputPlaceHolder="Escribe tu mensaje"
                message="Hola! Tienes alguna duda? No dudes en escribirnos!"
            />
        </div>
    )
} 

export default WhatsappButton