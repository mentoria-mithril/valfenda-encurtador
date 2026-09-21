import React, { useState, useEffect } from 'react';
import { Alert, Container, Stack } from '@mui/material';
import { UrlForm } from '../components/UrlForm';
import { ShortenedUrlList } from '../components/ShortenedUrlList';
import { encurtarUrl, verificarAliasDisponivel } from '../services/url';
import { listarUrls, removerUrl, type UrlEncurtada } from '../services/shortenedUrls';

export function Home() {
  const [urlOriginal, setUrlOriginal] = useState('');
  const [alias, setAlias] = useState('');
  const [aliasError, setAliasError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Placeholder até juntar com a fatia de login: trocar por estado de auth real.
  const logado = false;
  const [urls, setUrls] = useState<UrlEncurtada[]>([]);
  const [carregando, setCarregando] = useState(logado);
  const [erroLista, setErroLista] = useState<string | null>(null);

  useEffect(() => {
    if (!logado) return;

    listarUrls()
      .then(setUrls)
      .catch((e: Error) => setErroLista(e.message))
      .finally(() => setCarregando(false));
  }, [logado]);

  useEffect(() => {
    if (!alias.trim()) {
      setAliasError('');
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const disponivel = await verificarAliasDisponivel(alias.trim());
        if (!disponivel) {
          setAliasError('alias já usado!');
        } else {
          setAliasError('');
        }
      } catch {
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [alias]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (aliasError) return;

    setLoading(true);

    try {
      await encurtarUrl({
        url_original: urlOriginal,
        alias: alias.trim() ? alias.trim() : undefined,
      });

      setUrlOriginal('');
      setAlias('');

      if (logado) {
        setUrls(await listarUrls());
        setErroLista(null);
      }

      alert('URL encurtada com sucesso!');
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  function compartilhar(url: UrlEncurtada) {
    navigator.clipboard.writeText(url.urlEncurtada);
  }

  async function remover(url: UrlEncurtada) {
    const antes = urls;
    setUrls(urls.filter((u) => u.codigo !== url.codigo));
    try {
      await removerUrl(url.codigo);
    } catch (e) {
      setUrls(antes);
      setErroLista((e as Error).message);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <UrlForm
          urlOriginal={urlOriginal}
          setUrlOriginal={setUrlOriginal}
          alias={alias}
          setAlias={(val) => {
            setAlias(val);
            setAliasError('');
          }}
          aliasError={aliasError}
          errorMessage={errorMessage}
          loading={loading}
          onSubmit={handleSubmit}
        />

        {logado ? (
          <ShortenedUrlList
            urls={urls}
            carregando={carregando}
            erro={erroLista}
            aoCompartilhar={compartilhar}
            aoRemover={remover}
          />
        ) : (
          <Alert severity="info">
            Entre na sua conta para ver o histórico de URLs encurtadas.
          </Alert>
        )}
      </Stack>
    </Container>
  );
}
