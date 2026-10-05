import { Alert, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ShortUrlItem } from "../components/ShortUrlItem.js";
import { obterToken } from "../services/session.js";
import { listarHistorico, type ItemDoHistorico } from "../services/shortUrlHistory.js";

// Fatia D — histórico das URLs de quem está logado.
export function HistoryPage() {
  const [token] = useState(obterToken);
  const [urls, setUrls] = useState<ItemDoHistorico[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    listarHistorico(token)
      .then(setUrls)
      .catch((e: Error) => setErro(e.message));
  }, [token]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={600}>
        URLs encurtadas
      </Typography>

      {!token && <Alert severity="info">Entre na sua conta para ver o seu histórico.</Alert>}
      {erro && <Alert severity="error">Não foi possível carregar o histórico: {erro}</Alert>}
      {token && !erro && !urls && <Alert severity="info">carregando o histórico…</Alert>}
      {urls?.length === 0 && (
        <Alert severity="info">Você ainda não encurtou nenhuma URL.</Alert>
      )}

      {urls?.map((url) => <ShortUrlItem key={url.codigo} url={url} />)}
    </Stack>
  );
}
