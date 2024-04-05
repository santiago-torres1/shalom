import { Navigate } from "react-router-dom"
import { Container, Button } from "react-bootstrap"

function Admin ({isAuthenticated}) {
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    console.log(isAuthenticated)
    return (
        <Container className="my-4">
            <h1>Administracion</h1>
            <Button>Ver productos</Button>
            <Button>Ver ordenes</Button>
            <Button>Ver clientes</Button>
        </Container>
    )
}

export default Admin