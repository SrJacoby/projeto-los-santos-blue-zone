import {Box, Typography, Paper, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert} from "@mui/material"
import {useEffect, useState} from "react"
import { getVehiclesRequest } from "../../services/vehicleService"
import { getZonesRequest } from "../../services/zoneService"
import { createParkingRequest, getActiveParkingRequest } from "../../services/parkingService"

export default function ParkingPage(){
    const [selectedVehicle, setSelectedVehicle] = useState("")
    const [selectedZone, setSelectedZone] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [vehicles, setVehicles] = useState([])
    const [zones, setZones] = useState([])
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    })
    const [activeParking, setActiveParking] = useState(null)
    const [remainingTime, setRemainingTime] = useState("")

    useEffect(() => {
        const fetchData = async() => {
            try{
                const vehiclesData = await getVehiclesRequest()
                const zonesData = await getZonesRequest()

                setVehicles(vehiclesData)
                setZones(zonesData)
            } catch(error){
                console.error(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        if(!activeParking) return

        const interval = setInterval(() => {
            const now = new Date()
            const end = new Date(activeParking.endTime)

            const diff = end - now

            if(diff <= 0){
                setRemainingTime("Expirado")
                clearInterval(interval)
                return
            }

            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff / (1000 * 60)) % 60)
            const seconds = Math.floor((diff / 1000) % 60)

            setRemainingTime(
                `${hours}h ${minutes}m ${seconds}s`
            )
        }, 1000)

        return () => clearInterval(interval)
    }, [activeParking])

    useEffect(() => {
        if(!selectedVehicle) return

        const fetchActiveParking = async() => {
            try{
                const parking = await getActiveParkingRequest(selectedVehicle)

                setActiveParking(parking)
                setSelectedTime("")
            } catch(error){
                if(error.response?.status !== 404){
                    console.error(error)
                }
                setActiveParking(null)
            }
        }

        fetchActiveParking()
    }, [selectedVehicle])

    const parkingTimes =[
        {label: "5 minutos", value: 5},
        {label: "15 minutos", value: 15},
        {label: "30 minutos", value: 30},
        {label: "45 minutos", value: 45},
        {label: "1 hora", value: 60},
        {label: "2 horas", value: 120},
        {label: "3 horas", value: 180},
    ]

    const selectedZoneData = zones.find(
        (zone) => zone.id === selectedZone
    )

    const totalPrice = selectedZoneData && selectedTime ? (
        (selectedZoneData.pricePerHour/60) *
        selectedTime
    ).toFixed(2)
    : null

    const handleStartParking = async() => {
        if(!selectedVehicle || !selectedZone || !selectedTime){
            setSnackbar({
                open: true,
                message: "Preencha todos os campos",
                severity: "error"
            })

            return
        }

        try{
            const parking = await createParkingRequest({
                carId: selectedVehicle,
                zoneId: selectedZone,
                durationMinutes: selectedTime
            })

            setActiveParking(parking)

            console.log(parking)
            console.log(parking.endTime)

            setSnackbar({
                open: true,
                message: "Estacionamento iniciado com sucesso",
                severity: "success"
            })
        } catch{
            setSnackbar({
                open: true,
                message: "Erro ao iniciar estacionamento",
                severity: "error"
            })
        }
    }

    const hasActiveParking = !!activeParking

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
            <Typography
                variant="h5"
                sx={{
                    color: "#00a86b",
                    fontWeight: "bold",
                    marginBottom: 2,
                }}
            >
                Iniciar Estacionamento
            </Typography>

            <Paper
                sx={{
                    padding: 2,
                    backgroundColor: "#181818",
                    border: "1px solid #2a2a2a",
                    marginBottom: 2,
                    color: "#aaa"
                }}
            >
                Selecione as opções abaixo
            </Paper>

            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: "#888" }}>
                    Veículo
                </InputLabel>

                {hasActiveParking && (
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: 2,
                            backgroundColor: "#102418",
                            border: "1px solid #00a86b",
                            color: "#00a86b"
                        }}
                    
                    >
                        Já existe um estacionamento ativo para este veículo.
                        
                        O tempo seleiconado será adicionado ao estacionamento atual.
                    </Paper>
                )}
                <Select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(Number(e.target.value))}
                    sx={{
                        color: "#fff",
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "#333",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00A86B",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00A86B",
                        },
                    }}
                >
                    {vehicles.map((vehicle) => (
                        <MenuItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.name || vehicle.plate} - {vehicle.model}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: "#888" }}>
                    Zona
                </InputLabel>

                <Select
                    disabled={hasActiveParking}
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(Number(e.target.value))}
                    sx={{
                        color: "#fff",
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "#333",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00A86B",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00A86B",
                        },
                    }}
                >
                    {zones.map((zone) => (
                        <MenuItem key={zone.id} value={zone.id}>
                            {zone.name} - ${zone.pricePerHour}/h
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: "#888" }}>
                    Tempo
                </InputLabel>

                <Select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(Number(e.target.value))}
                    sx={{
                        color: "#fff",
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "#333",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00A86B",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00A86B",
                        },
                    }}
                >
                    {parkingTimes.map((time) => (
                        <MenuItem key={time.value} value={time.value}>
                            {time.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {totalPrice && (
                <Paper
                    sx={{
                        marginTop: 2,
                        padding: 2,
                        backgroundColor: "#181818",
                        border: "1px solid #00a86b",
                        borderRadius: 2
                    }}
                >
                    <Typography
                        sx={{
                            color: "#aaa",
                            fontSize: 14
                        }}
                    >
                        Zona Selecionada
                    </Typography>

                    <Typography
                        sx={{
                            color: "#fff",
                            fontWeight: "bold",
                            marginBottom: 1,
                        }}
                    >
                        {selectedZoneData.name}
                    </Typography>

                    <Typography
                        sx={{
                            color: "#aaa",
                            fontSize: 14
                        }}
                    >
                        Tempo Selecionado
                    </Typography>

                    <Typography
                        sx={{
                            color: "#fff",
                            marginBottom: 2,
                        }}
                    >
                        {
                            parkingTimes.find(
                                (t) => t.value === selectedTime)?.label

                        }
                    </Typography>

                    <Typography
                        sx={{
                            color: "#00a86b",
                            fontSize: 24,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >
                        ${totalPrice}
                    </Typography>
                </Paper>
            )}

            <Button
                variant="contained"
                fullWidth
                onClick={handleStartParking}
                sx={{
                    backgroundColor: "#00a86b",
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "#009e63"
                    }
                }}
            >
               {hasActiveParking ? "Adicionar tempo" : "Iniciar Estacionamento"}
            </Button>

            {activeParking && (
                <Paper
                    sx={{
                        marginTop: 3,
                        padding: 2,
                        backgroundColor: "#181818",
                        border: "1px solid #00a86b",
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        sx={{
                            color: "#00a86b",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 2,
                        }}
                    >
                        Estacionamento Ativo
                    </Typography>

                    {/* Veículo */}
                    <Typography
                        sx={{
                            color: "#888",
                            fontSize: 14,
                        }}
                    >
                        Veículo
                    </Typography>
                    <Typography
                        sx={{
                            color: "#fff",
                            marginBottom: 2,
                        }}
                    >
                        {activeParking.car?.plate}
                    </Typography>

                    {/* Zona */}
                    <Typography
                        sx={{
                            color: "#888",
                            fontSize: 14,
                        }}
                    >
                        Zona
                    </Typography>
                    <Typography
                        sx={{
                            color: "#fff",
                            marginBottom: 2,
                        }}
                    >
                        {activeParking.zone?.name}
                    </Typography>

                    {/* Valor */}
                    <Typography
                        sx={{
                            color: "#888",
                            fontSize: 14,
                        }}
                    >
                        Valor Pago
                    </Typography>
                    <Typography
                        sx={{
                            color: "#00a86b",
                            fontWeight: "bold",
                            fontSize: 24,
                            textAlign: "center",
                            marginBottom: 2,
                        }}
                    >
                        R$ {Number(activeParking.totalPrice).toFixed(2)}
                    </Typography>

                    {/* Contador */}
                    <Typography
                        sx={{
                            color: "#888",
                            fontSize: 14,
                        }}
                    >
                        Tempo Restante
                    </Typography>
                    <Typography
                        sx={{
                            color: 
                                remainingTime === "Expirado"
                                    ? "#ff4d4d"
                                    : "#00a86b",
                            fontWeight: "bold",
                            fontSize: 24,
                            textAlign: "center",
                            marginBottom: 2,
                        }}
                    >
                        {remainingTime}
                    </Typography>

                    {/* Final */}
                    <Typography
                        sx={{
                            color: "#888",
                            fontSize: 14,
                        }}
                    >
                        Finaliza em
                    </Typography>
                    <Typography
                        sx={{
                            color: "#fff",
                        }}
                    >
                        {new Date(activeParking.endTime).toLocaleString()}
                    </Typography>
                </Paper>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({...prev, open: false}))}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    sx={{width: "100%"}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}