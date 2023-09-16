import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; // Importe o ícone que deseja usar
import EditIcon from '@mui/icons-material/Edit';
import styles from '../styles/PainelAdmin.module.css';


export default function AdicionarUsuario({ onClick }) { // Adicione a propriedade onClick
  return (
    <IconButton aria-label="Adicionar usuário" className={styles.addIcon} onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
}

export function EditarUsuario({ onClick }) {
  return (
    <IconButton aria-label="Editar usuário" color="primary" onClick={onClick}>
      <EditIcon />
    </IconButton>
  );
}

export function RemoverUsuario({ onClick }) {
  return (
    <IconButton aria-label="Remover usuário" color="secondary" onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
}