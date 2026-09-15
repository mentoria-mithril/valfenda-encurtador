import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link as LinkUi,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useState } from "react";
import { criaUsuario, Usuario } from "../services/user";
import { toast } from "react-toastify";

export function FormCadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [senhaConfirmacao, setSenhaConfirmacao] = useState<string>("");
  const [dadosCadastro, setDadosCadastro] = useState<Usuario>({
    nome: "",
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (senhaConfirmacao === dadosCadastro.senha) {
      criaUsuario(dadosCadastro)
        .then(() => {
          toast.success("Conta criada com sucesso");
          navigate("/login");
        })
        .catch((e: Error) => toast.error(e.message));
    } else {
      toast.error("As senhas não estão iguais");
    }
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
          <Typography sx={{ fontFamily: "monospace" }}>encurtador</Typography>
        </Stack>

        <Typography variant="h5" fontWeight={600}>
          Criar conta
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Leva menos de um minuto pra começar a encurtar seus links.
        </Typography>

        <Stack
          component="form"
          spacing={2.5}
          sx={{ mt: 4 }}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Nome completo"
            placeholder="Seu nome"
            onChange={(e) =>
              setDadosCadastro({ ...dadosCadastro, nome: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="E-mail"
            type="email"
            placeholder="voce@exemplo.com"
            onChange={(e) =>
              setDadosCadastro({ ...dadosCadastro, email: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Senha"
            type={mostrarSenha ? "text" : "password"}
            onChange={(e) =>
              setDadosCadastro({ ...dadosCadastro, senha: e.target.value })
            }
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

          <TextField
            fullWidth
            label="Confirmar senha"
            type={mostrarConfirmacao ? "text" : "password"}
            onChange={(e) => setSenhaConfirmacao(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        mostrarConfirmacao ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={() => setMostrarConfirmacao((v) => !v)}
                      edge="end"
                      size="small"
                    >
                      {mostrarConfirmacao ? (
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

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{ py: 1.3, textTransform: "none", fontWeight: 600 }}
          >
            Criar conta
          </Button>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          Já tem conta?{" "}
          <LinkUi
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            Entrar
          </LinkUi>
        </Typography>
      </Box>
    </Box>
  );
}
