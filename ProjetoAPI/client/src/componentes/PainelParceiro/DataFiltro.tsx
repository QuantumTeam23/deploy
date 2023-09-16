import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EventIcon from '@mui/icons-material/Event'; // Importe o ícone da data
import styles from './PainelParceiro.module.css';

// Componente DataInicio
export function DataInicio() {
  return (
    <div className={`${styles.componenteData} ${styles.menuIcon}`}>
      <TextField
        placeholder="Data de início"
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

// Componente DataFim
export function DataFim() {
  return (
    <div className={`${styles.componenteData} ${styles.menuIcon}`}>
      <TextField
        placeholder="Data de fim"
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
