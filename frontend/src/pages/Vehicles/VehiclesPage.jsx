import {Box, Typography, Button, Paper} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import { getVehiclesRequest } from "../../services/vehicleService"
import {jwtDecode} from "jwt-decode"

export default function VehiclesPage(){
    const navigate = useNavigate()

    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchVehicles = async() => {
        try{
            const token = localStorage.getItem("token")
            const decoded = jwtDecode(token)

            const userId = decoded.nameid

            const data = await getVehiclesRequest(userId)
            setVehicles(data)
        } catch{
            setError("Erro ao criar veículos")
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVehicles()
    }, [])

    return(
        <Box
            sx={{
                maxWidth: 400,
                margin: "0 auto",
                minHeight: "100vh",
                padding: 2,
                background: "linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)"
            }}
        >
            {/* Título */}
            <Typography
                variant="h5"
                sx={{
                    color: "#00a86b",
                    fontWeight: "bold",
                    marginBottom: 2,
                }}
            >
                Meus Veículos
            </Typography>

            {/* Lista (placeholder) */}
            {loading? (
                <Typography sx={{color: "#888"}}>
                    Carregando
                </Typography>
            ) : error ? (
                <Typography sx={{color: "#ff4d4d"}}>
                    {error}
                </Typography>
            ) : vehicles.length === 0 ? (
                <Paper
                    sx={{
                        padding: 2,
                        marginBottom: 2,
                        backgroundColor: "#181818",
                        border: "1px solid #2a2a2a",
                        color: "#fff"
                    }}
                >
                    Nenhum veículo cadastrado.
                </Paper>
            ) : (
                vehicles.map((vehicle) => (
                    <Paper
                        key={vehicle.id}
                        sx={{
                            padding: 2,
                            marginBottom: 2,
                            backgroundColor: "#181818",
                            border: "1px solid #2a2a2a",
                            color: "#fff"
                        }}
                    >
                        {/* Nome ou fallback */}
                        <Typography sx={{fontWeight: "bold"}}>
                            {vehicle.name || vehicle.plate}
                        </Typography>

                        {/* Modelo */}
                        <Typography sx={{color: "#aaa", fontSize: 14}}>
                            {vehicle.model}
                        </Typography>

                        {/* Placa */}
                        <Typography sx={{color: "#00a86b", fontSize: 14}}>
                            {vehicle.plate}
                        </Typography>
                    </Paper>
                ))
            )}
            

            {/* Botão adicionar */}
            <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/vehicles/add")}
                sx={{
                    backgroundColor: "#00a86b",
                    fontWeight: "bold",
                    boxShadow: "0 4px 12px rgba(0,168,107,0.3",
                    "&:hover": {
                        backgroundColor: "#009e63"
                    },
                }}
            >
                Adicionar veículo
            </Button>
        </Box>
    )
}