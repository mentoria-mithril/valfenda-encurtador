import { Alert, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ShortUrlItem } from "../components/ShortUrlItem.js";
import { listarHistorico, type ItemDoHistorico } from "../services/shortUrlHistory.js";

// Fatia D — histórico das URLs de quem está logado.
export function HistoryPage() {
  const [urls, setUrls] = useState<ItemDoHistorico[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    listarHistorico()
      .then(setUrls)
      .catch((e: Error) => setErro(e.message));
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={600}>
        URLs encurtadas
      </Typography>

      {erro && <Alert severity="error">Não foi possível carregar o histórico: {erro}</Alert>}
      {!erro && !urls && <Alert severity="info">carregando o histórico…</Alert>}
      {urls?.length === 0 && (
        <Alert severity="info">Você ainda não encurtou nenhuma URL.</Alert>
      )}

      {urls?.map((url) => <ShortUrlItem key={url.codigo} url={url} />)}
    </Stack>
  );
}
