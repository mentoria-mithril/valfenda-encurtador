import { Link, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { ItemDoHistorico } from "../services/shortUrlHistory.js";

const formatoDeData = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

// A url original vem do usuário. Só vira link clicável se for http(s):
// `javascript:alert(1)` passa no z.string().url() e executaria no clique.
function LinkSeguro({ href }: { href: string }) {
  const seguro = /^https?:\/\//i.test(href);
  if (!seguro) return <>{href}</>;
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {href}
    </Link>
  );
}

function Campo({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>
      <Typography component="span" variant="body2" color="text.secondary">
        {rotulo}:{" "}
      </Typography>
      {children}
    </Typography>
  );
}

// Um card da lista "URLS ENCURTADAS" do desenho, com os quatro campos.
export function ShortUrlItem({ url }: { url: ItemDoHistorico }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={0.5}>
        <Campo rotulo="url original">
          <LinkSeguro href={url.url_original} />
        </Campo>
        <Campo rotulo="url encurtada">
          <LinkSeguro href={url.url_encurtada} />
        </Campo>
        <Campo rotulo="quantidade de acessos">{url.qtd_acessos}</Campo>
        <Campo rotulo="criado em">{formatoDeData.format(new Date(url.dt_criacao))}</Campo>
      </Stack>
    </Paper>
  );
}
