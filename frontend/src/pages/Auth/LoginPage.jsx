import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import {Box, TextField, Button, Typography, Paper, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { loginRequest } from "../../services/authService"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = async() => {
        const newErrors = {}
    
        if(!email){
            newErrors.email = "Email é obrigatório"
        } else if(!email.includes("@")){
            newErrors.email = "Email é inválido"
        }

        if(!password){
            newErrors.password = "Senha é obrigatória"
        }

        setErrors(newErrors)

        if(Object.keys(newErrors).length > 0) return

        try{
            setLoading(true)

            const data = await loginRequest({
                email,
                password
            })

            //salva token
            login(data.token)
            navigate("/vehicles")
        } catch(error){
            if(error.response){
                setApiError(error.response.data || "Erro ao fazer login")
            } else{
                setApiError("Erro de conexão com o servidor")
            }
        } finally{
            setLoading(false)
        }
    }

  return (
    <Box
        sx={{
            maxWidth: 400,
            margin: "0 auto",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)"
        }}
    >
        <Paper
            elevation={4}
            sx={{
                width: "100%",
                padding: 3,
                borderRadius: 3,
                backgroundColor: "#181818",
                border: "1px solid #2a2a2a"
            }}
        >
            {/* Título */}
            <Typography
                variant="h5"
                sx={{
                    color: "#00a86b",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 1,
                    letterSpacing: 1.2,
                }}
            >
                LS Blue Zone
            </Typography>

            {/* Subtítulo */}
            <Typography
                variant="body2"
                sx={{
                    color: "#888",
                    textAlign: "center",
                }}
            >
                Login
            </Typography>

            {/* Erro da Api */}

            {apiError && (
                <Typography
                    variant="body2"
                    sx={{
                        color: "#888",
                        textAlign: "center",
                    }}
                >
                    {apiError}
                </Typography>
            )}

            {/* Email */}
            <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                variant="outlined"
                sx={{
                    input: {color: "#fff"},
                    label: {color: "#888"},
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {borderColor: "#333"},
                        "&:hover fieldset": {borderColor: "#00a86b"}
                    },
                }}
            />

            {/* Senha */}
            <TextField
                label="Senha"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <VisibilityOff sx={{color: "#888"}}/>
                                    ): (
                                        <Visibility sx={{color: "#888"}}/>
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    input: {color: "#fff"},
                    label: {color: "#888"},
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {borderColor: "#333"},
                        "&:hover fieldset": {borderColor: "#00a86b"},
                        "&.Mui-focused fieldset": {borderColor: "#00a86b"}
                    },
                }}
            />

            {/* Botão */}
            <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{
                    marginTop: 2,
                    backgroundColor: "#00a86b",
                    fontWeight: "bold",
                    boxShadow: "0 4px 12px rgba(0,168,107,0.3)",
                    "&:hover": {
                        backgroundColor: "#009e63"
                    },
                }}
            >
                {loading ? "Entrando..." : "Entrar"}
            </Button>   

            {/* Criar conta */}
            <Typography
                sx={{
                    marginTop: 2,
                    textAlign: "center",
                    color: "#888",
                    fontSize: 14,
                }}
            >
                Não tem conta?{" "}
                <Link
                    to="/register"
                    style={{
                        color: "#00a86b",
                        textDecoration: "none",
                        fontWeight: "bold",
                    }}
                >
                    Criar conta
                </Link>
            </Typography>
        </Paper>
    </Box>
  )
}