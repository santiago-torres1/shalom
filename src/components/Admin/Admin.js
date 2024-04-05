import { Navigate } from "react-router-dom"

function Admin ({isAuthenticated}) {
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    console.log(isAuthenticated)
    return (
        <div>
            <h1>Administracion</h1>
        </div>
    )
}

export default Admin