import { TextField, InputAdornment } from '@mui/material';

interface AliasInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

export function AliasInput({ value, onChange, error, helperText }: AliasInputProps) {
  return (
    <TextField
      label="Alias personalizado (opcional)"
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      helperText={helperText}
      placeholder="ex: meu-alias-customizado"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        },
      }}
    />
  );
}