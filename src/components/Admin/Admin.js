import { Navigate } from "react-router-dom"
import { Container, Button } from "react-bootstrap"

function Admin ({adminData}) {
    if (!adminData.isAdmin) {
        return <Navigate to="/login" />
    }
    return (
        <Container className="my-4">
            <h1>Administracion</h1>
            <p>Usuario actual: {adminData.name}</p>
            <Button>Ver productos</Button>
            <Button>Ver ordenes</Button>
            <Button>Ver clientes</Button>
        </Container>
    )
}

export default Admin