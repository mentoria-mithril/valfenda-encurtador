import { useState } from 'react';
import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import type { UrlEncurtada } from '../services/url';

interface ShortUrlResultProps {
  url: UrlEncurtada;
}


export function ShortUrlResult({ url }: ShortUrlResultProps) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    await navigator.clipboard.writeText(url.url_encurtada);
    setCopiado(true);
  };

    return (
    <Paper variant="outlined" sx={{ p: 3, mt: 3 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6">Sua URL encurtada</Typography>

        <Link href={url.url_encurtada} target="_blank" rel="noopener noreferrer">
          {url.url_encurtada}
        </Link>

        <Button variant="contained" onClick={copiar}>
          {copiado ? 'Copiado!' : 'Copiar'}
        </Button>

        <Box
          component="img"
          src={url.qrcode}
          alt={`QR code de ${url.url_encurtada}`}
          sx={{ width: 200, height: 200 }}
        />
      </Stack>
    </Paper>
  );
}