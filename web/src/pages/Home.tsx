import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { UrlForm } from '../components/UrlForm';
import { encurtarUrl, verificarAliasDisponivel } from '../services/url';

export function Home() {
  const [urlOriginal, setUrlOriginal] = useState('');
  const [alias, setAlias] = useState('');
  const [aliasError, setAliasError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      alert('URL encurtada com sucesso!');
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
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
    </Container>
  );
}