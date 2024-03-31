import { Container, Button } from "react-bootstrap"
import { useState } from "react"
import './Products.css'

function ProductPage({id, name, img, price}) {
    const [quantity, setQuantity] = useState(1)
    const add = () => {
        setQuantity(quantity+1)
    }
    const remove = () => {
        setQuantity(quantity===1 ? quantity : quantity-1)
    }
    return(
        <Container className="my-3 custom-product-container d-flex justify-content-center">
            <div className="d-flex flex-column flex-lg-row">
                <div className="col-lg-6">
                    <img src={img} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <div className="col-lg-6 mt-3 mt-md-0 mx-lg-3">
                    <p>Numero de referencia: {id}</p>
                    <h1>{name}</h1>
                    <h3>{price}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent quis sapien vel ex suscipit faucibus. 
                        Duis ac turpis quis purus vehicula varius.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent quis sapien vel ex suscipit faucibus. 
                        Duis ac turpis quis purus vehicula varius
                    </p>
                    <div className="quantity-selector my-2 mx-0 px-0">
                        <button className="minus" onClick={remove} disabled={quantity === 1}>-</button>
                        <span className="quantity">{quantity}</span>
                        <button className="plus" onClick={add}>+</button>
                    </div>
                    <Container className="d-flex flex-column col-12 col-lg-6 px-0 mx-0 mt-lg-3">
                        <Button className="custom-add-to-cart my-2">Anadir al carrito</Button>
                        <Button className="custom-buy-now my-2">Comprar Ahora</Button>
                    </Container>
                </div>
            </div>
        </Container>
    )
}

export default ProductPage


