import {Box, Typography, Button, Paper, IconButton, Snackbar, Alert, Skeleton} from "@mui/material"
import {Delete, Edit} from "@mui/icons-material"
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import { getVehiclesRequest, deleteVehicleRequest } from "../../services/vehicleService"

export default function VehiclesPage(){
    const navigate = useNavigate()

    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })

    const fetchVehicles = async() => {
        try{
            const data = await getVehiclesRequest()
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

    const handleDelete = async(id) => {
        const confirmDelete = window.confirm("Deseja excluir esse veículo?")

        if(!confirmDelete) return
        
        try{
            await deleteVehicleRequest(id)

            setSnackbar({
                open: true,
                message: "Veículo removido com sucesso",
                severity: "success",
            })

            setVehicles((prev) => prev.filter((v) => v.id !== id))
        } catch{
            setSnackbar({
            open: true,
            message: "Erro ao deletar veículo",
            severity: "error",
            })
        }
    }

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
                <>
                    {[1, 2, 3].map((item) => (
                        <Paper
                            key={item}
                            sx={{
                                padding: 2,
                                marginBottom: 2,
                                backgroundColor: "#181818",
                                border: "1px solid #2a2a2a",
                                borderRadius: 2,
                            }}
                        >
                            <Skeleton
                                variant="text"
                                width="60%"
                                height={28}
                                sx={{ bgcolor: "#2a2a2a"}}
                            />

                            <Skeleton
                                variant="text"
                                width="40%"
                                height={22}
                                sx={{ bgcolor: "#2a2a2a"}}
                            />

                            <Skeleton
                                variant="text"
                                width="30%"
                                height={22}
                                sx={{ bgcolor: "#2a2a2a"}}
                            />
                        </Paper>
                    ))}
                </>
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
                            borderRadius: 2,
                            color: "#fff",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
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
                        </Box>

                        {/* Ações */}
                        <Box>
                            <IconButton 
                                sx={{color: "#00a86b"}}
                                onClick={() => navigate(`/vehicles/edit/${vehicle.id}`)}
                            >
                                <Edit/>
                            </IconButton>
                            <IconButton 
                                sx={{color: "#ff4d4d"}}
                                onClick={() => handleDelete(vehicle.id)}
                            >
                                <Delete/>
                            </IconButton>
                        </Box>
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
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar((prev) => ({...prev, open: false}))
                }
                anchorOrigin={{vertical:"bottom", horizontal: "center"}}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => 
                        setSnackbar((prev) => ({...prev, open: false}))
                    }
                    sx={{width: "100%"}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}