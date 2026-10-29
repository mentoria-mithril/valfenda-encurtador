import React from 'react';
import { Box, TextField, Button, Paper, Alert, InputAdornment } from '@mui/material';
import { AliasInput } from './AliasInput';

interface UrlFormProps {
  urlOriginal: string;
  setUrlOriginal: (value: string) => void;
  alias: string;
  setAlias: (value: string) => void;
  aliasError: string;
  errorMessage: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function UrlForm({
  urlOriginal,
  setUrlOriginal,
  alias,
  setAlias,
  aliasError,
  errorMessage,
  loading,
  onSubmit,
}: UrlFormProps) {
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mx: 'auto', mt: 4, borderRadius: 2 }}>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', md: 'flex-start' },
        }}
      >
        <TextField
          label="URL Original"
          variant="outlined"
          type="url"
          required
          fullWidth
          value={urlOriginal}
          onChange={(e) => setUrlOriginal(e.target.value)}
          placeholder="https://exemplo.com/sua-url-longa"
          sx={{ flex: 2 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ flex: 1.5 }}>
          <AliasInput
            value={alias}
            onChange={setAlias}
            error={!!aliasError}
            helperText={aliasError}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !urlOriginal || !!aliasError}
          sx={{ py: 1.8, fontWeight: 'bold', minWidth: { md: '140px' }, height: '56px' }}
        >
          {loading ? 'Encurtando...' : 'Encurtar'}
        </Button>
      </Box>
    </Paper>
  );
}