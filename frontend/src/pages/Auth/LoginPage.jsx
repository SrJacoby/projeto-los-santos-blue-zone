import {Box, TextField, Button, Typography, Paper } from "@mui/material"

const LoginPage = () => {
  return (
    <Box
        sx={{
            maxWidth: 400,
            margin: "0 auto",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#121212"
        }}
    >
        <Paper
            elevation={4}
            sx={{
                width: "100%",
                padding: 3,
                borderRadius: 3,
                backgroundColor: "#1e1e1e"
            }}
        >
            {/* Título */}
            <Typography
                variant="h5"
                sx={{
                    color: "1DB954",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 2,
                }}
            >
                LS Blue Zone
            </Typography>

            {/* Subtítulo */}
            <Typography
                variant="body2"
                sx={{
                    color: "#aaa",
                    textAlign: "center",
                    marginBottom: 3,
                }}
            >
                Login
            </Typography>

            {/* Email */}
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{style: {color: "#aaa"}}}
                InputProps={{style: {color: "#fff"}}}
            />

            {/* Senha */}
            <TextField
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{style: {color: "#aaa"}}}
                InputProps={{style: {color: "#fff"}}}
            />

            {/* Botão */}
            <Button
                variant="contained"
                fullWidth
                sx={{
                    marginTop: 2,
                    backgroundColor: "#1db954",
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "#17a44c"
                    },
                }}
            >
                Entrar
            </Button>   
        </Paper>
    </Box>
  )
}

export default LoginPage