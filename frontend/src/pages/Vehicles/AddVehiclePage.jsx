import {Box, Typography, TextField, Button, Paper } from "@mui/material"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import { createVehicleRequest } from "../../services/vehicleService"

export default function AddVehiclePage(){
    const [name, setName] = useState("")
    const [plate, setPlate] = useState("")
    const [model, setModel] = useState("")
    const [color, setColor] = useState("")

    const [errors, setErrors] = useState("")

    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const plateRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/

    const handleSubmit = async () => {
        const newErrors = {}

        // Placa
        if(!plate){
            newErrors.plate = "Placa é obrigatória"
         } else if(!plateRegex.test(plate.toUpperCase())){
            newErrors.plate = "Formato inválido (ABC1234 ou ABC1D23)"
         }

        //  Modelo
        if(!model){
            newErrors.model = "Modelo é obrigatório"
        }

        // Cor
        if(!color){
            newErrors.color = "Cor é obrigatória"
        }

        setErrors(newErrors)

        if(Object.keys(newErrors).length > 0) return

        try{
            setLoading(true)

            await createVehicleRequest({
                plate: plate.toUpperCase(),
                model,
                color,
                name: name.trim() || null,
            })

            alert("Veículo cadastrado com sucesso!")
            navigate("/vehicles")
        } catch(error){
            if(error.response){
                setApiError(error.response.data || "Erro ao cadastrar veículo")
            } else{
                setApiError("Erro de conexão com o servidor")
            }
        } finally{
            setLoading(false)
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
            <Paper
                sx={{
                    padding: 2,
                    backgroundColor: "#181818",
                    border: "1px solid #2a2a2a"
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
                    Adicionar Veículo
                </Typography>

                {apiError && (
                    <Typography
                        sx={{
                            color: "#ff4d4d",
                            marginBottom: 2,
                            textAlign: "center",
                        }}
                    >
                        {apiError}
                    </Typography>

                )}

                {/* Nome */}
                <TextField
                    label= "Nome do Veículo (opcional)"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    helperText={"Ex: Carro da firma, Meu golzinho..."}
                    sx={{
                        input: {color: "#fff"},
                        label: {color: "#888"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "#333"},
                            "&:hover fieldset": {borderColor: "#00a86b"},
                            "&:Mui-focused fieldset": {
                                borderColor: "#00a86b",
                            }
                        }
                    }}
                />

                {/* Placa */}
                <TextField
                    label= "Placa"
                    fullWidth
                    margin="normal"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    error={!!errors.plate}
                    helperText={errors.plate}
                    sx={{
                        input: {color: "#fff"},
                        label: {color: "#888"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "#333"},
                            "&:hover fieldset": {borderColor: "#00a86b"},
                            "&:Mui-focused fieldset": {
                                borderColor: "#00a86b",
                            }
                        }
                    }}
                />      
                
                {/* Modelo */}
                <TextField
                    label= "Modelo"
                    fullWidth
                    margin="normal"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    error={!!errors.model}
                    helperText={errors.model}
                    sx={{
                        input: {color: "#fff"},
                        label: {color: "#888"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "#333"},
                            "&:hover fieldset": {borderColor: "#00a86b"},
                            "&:Mui-focused fieldset": {
                                borderColor: "#00a86b",
                            }
                        }
                    }}
                />

                {/* Cor */}
                <TextField
                    label= "Cor"
                    fullWidth
                    margin="normal"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    error={!!errors.color}
                    helperText={errors.model}
                    sx={{
                        input: {color: "#fff"},
                        label: {color: "#888"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "#333"},
                            "&:hover fieldset": {borderColor: "#00a86b"},
                            "&:Mui-focused fieldset": {
                                borderColor: "#00a86b",
                            }
                        }
                    }}
                />

                {/* Botão */}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                        marginTop: 2,
                        backgroundColor: "#00a86b",
                        fontWeight: "bold",
                        boxShadow: "0 4ox 12px rgba(0,168,107,0.3)",
                        "&:hover":{
                            backgroundColor: "#009e63"
                        },
                    }}
                >
                    {loading ? "Salvando..." : "Salvar Veículo"}
                </Button>

                {/* Voltar */}
                <Button
                    fullWidth
                    onClick={() => navigate("/vehicles")}
                    sx={{
                        marginTop: 1,
                        color: "#888",
                    }}
                >
                    Voltar
                </Button>
            </Paper>
        </Box>
    )
}