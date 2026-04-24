import {Box, Typography, Button, Paper, IconButton, Snackbar, Alert, Skeleton, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material"
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

    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        vehicleId: null,
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

    const confirmDelete = async() => {
        try{
            await deleteVehicleRequest(deleteDialog.vehicleId)

            setVehicles((prev) => 
                prev.filter((v) => v.id !== deleteDialog.vehicleId)
            )

            setSnackbar({
                open: true,
                message: "Veículo removido com sucesso",
                severity: "success",
            })
        } catch {
            setSnackbar({
                open: true,
                message: "Erro ao deletar veículo",
                severity: "error",
            })
        } finally {
            setDeleteDialog({open: false, vehicleId: null})
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
                                onClick={() => 
                                    setDeleteDialog({open: true, vehicleId: vehicle.id})
                                }
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
            <Dialog
                open={deleteDialog.open}
                onClose={() =>
                    setDeleteDialog({open: false, vehicleId: null})
                }
                PaperProps={{
                    sx: {
                        backgroundColor: "#181818",
                        color: "#fff",
                        borderRadius: 2,
                    },
                }}
            >
                <DialogTitle sx={{color: "#000"}}>
                    Confirmar exclusão
                </DialogTitle>
                <DialogContent sx={{color: "#aaa"}}>
                    Tem certeza que deseja excluir este veículo?
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => 
                            setDeleteDialog({open: false, vehicleId: null})
                        }
                        sx={{color: "#888"}}
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={confirmDelete}
                        sx={{
                            color: "#fff",
                            backgroundColor: "#ff4d4d",
                            "&:hover": {
                                backgroundColor: "#e60000"
                            }
                        }}
                    >
                        Excluir
                    </Button>
                </DialogActions>
                </Dialog>
        </Box>

        
    )
}