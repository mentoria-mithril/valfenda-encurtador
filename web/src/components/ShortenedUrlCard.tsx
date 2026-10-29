import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import type { UrlEncurtada } from "../services/shortenedUrls.js";

type Props = {
  url: UrlEncurtada;
  aoCompartilhar: (url: UrlEncurtada) => void;
  aoRemover: (url: UrlEncurtada) => void;
};

const formatoData = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export function ShortenedUrlCard({ url, aoCompartilhar, aoRemover }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Campo rotulo="url original" valor={url.urlOriginal} />
          <Campo rotulo="url encurtada" valor={url.urlEncurtada} />
          <Campo rotulo="quantidade de acessos" valor={String(url.qtdAcessos)} />
          <Campo rotulo="criado em" valor={formatoData.format(new Date(url.dtCriacao))} />
        </Box>

        <Stack spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={() => aoCompartilhar(url)}
          >
            share
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => aoRemover(url)}
          >
            del
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

function Campo({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <Typography variant="body2" noWrap>
      <Box component="span" sx={{ color: "text.secondary" }}>
        {rotulo}:{" "}
      </Box>
      {valor}
    </Typography>
  );
}
