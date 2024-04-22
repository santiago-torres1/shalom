import { Container, Button, Spinner } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import './Products.css'
import formatPrice from "../formatPrice"
import { useProduct } from "../../ProductContext"

function ProductPage() {
    const { productId } = useParams();
    const id = productId;
    const [product, setProduct] = useState({});
    const [ formattedPrice, setFormattedPrice] = useState (0);
    const [quantity, setQuantity] = useState(1);
    const [ loading, setLoading ] = useState(true);
    const { handleAdd, fetchProduct } = useProduct();
    const add = () => {
        setQuantity(quantity+1)
    }
    const remove = () => {
        setQuantity(quantity===1 ? quantity : quantity-1)
    }

    const getProduct = async () => {
        const data = await fetchProduct(id);
        console.log(data);
        setProduct(data);
        setFormattedPrice(formatPrice(data.price));
        setLoading(false);
    }

    useEffect(() => {  
        getProduct();
      }, [id]);

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <Spinner animation="border" role="status">
            <span className="sr-only">Cargando...</span>
            </Spinner>
        </div>
        )
    }
    return(
        <Container className="my-3 custom-product-container d-flex justify-content-center">
            <div className="d-flex flex-column flex-lg-row">
                <div className="col-lg-6">
                    <img src={product.images.length > 0 ? product.images[0].url : product.imgurl} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <div className="col-lg-6 mt-3 mt-md-0 mx-lg-3">
                    <p>Numero de referencia: {id}</p>
                    <h1>{product.name}</h1>
                    <h3>{formattedPrice}</h3>
                    <p>{product.description}</p>
                    <div className="quantity-selector my-2 mx-0 px-0">
                        <button className="minus" onClick={remove} disabled={quantity === 1}>-</button>
                        <span className="quantity">{quantity}</span>
                        <button className="plus" onClick={add}>+</button>
                    </div>
                    <Container className="d-flex flex-column col-12 col-lg-6 px-0 mx-0 mt-lg-3">
                        <Button className="custom-add-to-cart my-2" onClick={()=>handleAdd(parseInt(id), quantity)}>Anadir al carrito</Button>
                        <Button className="custom-buy-now my-2">Comprar Ahora</Button>
                    </Container>
                </div>
            </div>
        </Container>
    )
}

export default ProductPage


