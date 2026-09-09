import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as LinkUi,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useState } from "react";
import { EnviaLogin, Login } from "../services/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function FormLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dados, setDados] = useState<Login>({
    email: "",
    senha: "",
  });

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EnviaLogin(dados)
      .then((usuario)=> {
        console.log(usuario)
        toast.success("Login realizado com sucesso")
        navigate('/home')
      })
      .catch((e: Error) => toast.error(`${e}`)) 
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 8,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 360 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ display: { xs: "flex", lg: "none" }, mb: 4 }}
        >
          <LinkRoundedIcon sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography sx={{ fontFamily: "monospace" }}>encurta</Typography>
        </Stack>

        <Typography variant="h5" fontWeight={600}>
          Entrar na conta
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Gerencie seus links encurtados e veja as estatísticas de acesso.
        </Typography>

        <Stack
          component="form"
          spacing={2.5}
          sx={{ mt: 4 }}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            placeholder="voce@exemplo.com"
            onChange={(e) => setDados({ ...dados, email: e.target.value })}
          />

          <TextField
            fullWidth
            label="Senha"
            type={mostrarSenha ? "text" : "password"}
            onChange={(e) => setDados({ ...dados, senha: e.target.value })}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={() => setMostrarSenha((v) => !v)}
                      edge="end"
                      size="small"
                    >
                      {mostrarSenha ? (
                        <VisibilityOffRoundedIcon fontSize="small" />
                      ) : (
                        <VisibilityRoundedIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography variant="body2" color="text.secondary">
                  Lembrar de mim
                </Typography>
              }
            />
            <LinkUi
              component={RouterLink}
              to="/cadastro"
              underline="hover"
              variant="body2"
            >
              Esqueceu a senha?
            </LinkUi>
          </Stack>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{ py: 1.3, textTransform: "none", fontWeight: 600 }}
          >
            Entrar
          </Button>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          Ainda não tem conta?{" "}
          <LinkUi
            component={RouterLink}
            to="/cadastro"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            Criar conta
          </LinkUi>
        </Typography>
      </Box>
    </Box>
  );
}
