import { Alert, Paper, Stack, Typography } from "@mui/material";
import type { UrlEncurtada } from "../services/shortenedUrls.js";
import { ShortenedUrlCard } from "./ShortenedUrlCard.js";

type Props = {
  urls: UrlEncurtada[];
  carregando: boolean;
  erro: string | null;
  aoCompartilhar: (url: UrlEncurtada) => void;
  aoRemover: (url: UrlEncurtada) => void;
};


export function ShortenedUrlList({ urls, carregando, erro, aoCompartilhar, aoRemover }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="overline" color="text.secondary">
        urls encurtadas
      </Typography>

      <Stack spacing={2} sx={{ mt: 1 }}>
        {erro && <Alert severity="error">{erro}</Alert>}
        {!erro && carregando && <Alert severity="info">carregando…</Alert>}
        {!erro && !carregando && urls.length === 0 && (
          <Alert severity="info">nenhuma url encurtada ainda.</Alert>
        )}
        {urls.map((url) => (
          <ShortenedUrlCard
            key={url.codigo}
            url={url}
            aoCompartilhar={aoCompartilhar}
            aoRemover={aoRemover}
          />
        ))}
      </Stack>
    </Paper>
  );
}
