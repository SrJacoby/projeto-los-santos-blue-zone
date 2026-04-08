import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerRequest } from "../../services/authService"
import { Box, TextField, Button, Typography, Paper, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Link } from "react-router-dom"

export default function RegisterPage(){
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [errors, setErrors] = useState({})

    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$/

    const handleRegister = async () => {
        const newErrors = {}
        setApiError("")

        // Email
        if(!email){
            newErrors.email = "Email é obrigatório"
        } else if(!email.includes("@")){
            newErrors.email = "Email inválido"
        }

        // Username
        if(!username){
            newErrors.username = "Nome de usuário é obrigatório"
        }

        // Senha
        if(!password){
            newErrors.password = "Senha é obrigatória"
        } else if(!passwordRegex.test(password)){
            newErrors.password = "Mínimo 8 caracteres, com letra, número e símbolo"
        }

        // Confirmar senha
        if(!confirmPassword){
            newErrors.confirmPassword = "Confirme a senha"
        } else if(password !== confirmPassword){
            newErrors.confirmPassword = "As senhas não conferem"
        }

        setErrors(newErrors)

        // Tudo ok:

        if(Object.keys(newErrors).length > 0) return

        try{
            setLoading(true)

            await registerRequest({
                email,
                username,
                password,
                confirmPassword,
            })

            alert("Conta criada com sucesso!")
            navigate("/")
        } catch (error){
            if(error.response){
                setApiError(error.response.data || "Erro ao registrar")
            } else{
                setApiError("Erro de conexão com o servidor")
            }
        } finally {
            setLoading(false)
        } 
    }

    return(
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
                elevation={0}
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
                    Criar Conta
                </Typography>

                {/* Erro da Api */}

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

                {/* Email */}
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                    sx={{
                        input: {color: "#fff"},
                        label: {color: "#888"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "#333"},
                            "&:hover fieldset": {borderColor: "#00a86b"},
                            "&.Mui-focused fieldset": {borderColor: "#00a86b"},
                        },
                    }}
                />

                {/* Username */}
                <TextField
                    label="Nome de Usuário"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{
                        input: {color: "#fff"},
                        label: {color: "#888"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "#333"},
                            "&:hover fieldset": {borderColor: "#00a86b"},
                            "&.Mui-focused fieldset": {borderColor: "#00a86b"},
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

                {/* Confirmar Senha */}
                <TextField
                    label="Confirmar Senha"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? (
                                            <VisibilityOff sx={{color: "#888"}}/>
                                        ) : (
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
                    onClick={handleRegister}
                    disabled={loading}
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
                    {loading ? "Criando..." : "Criar Conta"}
                </Button>   

                {/* Link login */}
                <Typography
                    sx={{
                        marginTop: 2,
                        textAlign: "center",
                        color: "#888",
                        fontSize: 14,
                    }}  
                >
                    Já tem conta?{" "}
                    <Link
                        to="/"
                        style={{
                            color: "#00a86b",
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Entrar
                    </Link>
                </Typography>
            </Paper>
        </Box>
    )
}