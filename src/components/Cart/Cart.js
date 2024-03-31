import './Cart.css'
import { Button } from 'react-bootstrap'

function Cart ({open, setOpen}) {
    return (
        <div>
            <div className={`cart-sidebar ${open ? 'open' : ''}`}>
                <h2>Carrito</h2>
                <p>Tu carrito esta vacio</p>
                <Button className='close-btn' onClick = {setOpen}>Cerrar</Button>
            </div>
        </div>
    )
}

export default Cart