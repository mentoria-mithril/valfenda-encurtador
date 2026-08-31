import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { consultarSaude, type Saude } from "./services/saude.js";

// Tela de exemplo: consome uma rota de verdade, sem dado mockado.
// É esse o caminho que cada fatia vai repetir — serviço -> estado -> componente.
export function App() {
  const [saude, setSaude] = useState<Saude | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    consultarSaude()
      .then(setSaude)
      .catch((e: Error) => setErro(e.message));
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Encurtador
          </Typography>
          <Typography color="text.secondary">
            Esqueleto do projeto — turma Valfenda
          </Typography>
        </Box>

        {erro && <Alert severity="error">API fora do ar: {erro}</Alert>}
        {!erro && !saude && <Alert severity="info">consultando a API…</Alert>}
        {saude && (
          <Alert severity="success">
            API {saude.api} · banco {saude.banco}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary">
          Esta tela existe só para provar que front, API e banco se enxergam.
          A primeira fatia entregue substitui ela.
        </Typography>
      </Stack>
    </Container>
  );
}
