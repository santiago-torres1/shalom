import './Cart.css'

function Cart ({open, setOpen}) {
    return (
        <div>
            <div className={`cart-sidebar ${open ? 'open' : ''}`}>
                <h2>Carrito</h2>
                <p>Tu carrito esta vacio</p>
                <button className='close-btn' onClick = {setOpen}>Cerrar</button>
            </div>
        </div>
    )
}

export default Cart