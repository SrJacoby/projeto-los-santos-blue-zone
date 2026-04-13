import {Box, Typography, Button, Paper} from "@mui/material"
import {useNavigate} from "react-router-dom"

export default function VehiclesPage(){
    const navigate = useNavigate()

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