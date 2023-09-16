import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import styles from './TabelaControlUser.module.css';
import { useState } from 'react'; // Importe useState
import { EditarUsuarioPopup, RemoverUsuarioPopup } from './AcoesUsuarioPopup'; // Importe os componentes aqui

export default function TabelasControlUser() {
  const [editarUsuarioPopupOpen, setEditarUsuarioPopupOpen] = useState(false);
  const [removerUsuarioPopupOpen, setRemoverUsuarioPopupOpen] = useState(false);

  const handleEditarUsuarioClick = () => {
    setEditarUsuarioPopupOpen(true);
  };

  const handleRemoverUsuarioClick = () => {
    setRemoverUsuarioPopupOpen(true);
  };

  const handleCloseEditarUsuarioPopup = () => {
    setEditarUsuarioPopupOpen(false);
  };

  const handleCloseRemoverUsuarioPopup = () => {
    setRemoverUsuarioPopupOpen(false);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th colSpan={2}><center>Ações</center></th>
          </tr>
        </thead>
        <tbody>
          {/* Linhas do corpo */}
          {Array.from({ length: 9 }, (_, index) => (
            /* coloquei 9 linhas, como exemplo*/
            <tr key={index}>
              <td>Nome {index + 1}</td>
              <td>Tipo {index + 1}</td>
              <td>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary" // Cor azul esverdeado
                    startIcon={<EditIcon style={{ fontSize: 28 }} />} // Aumentando o tamanho do ícone
                    onClick={handleEditarUsuarioClick}
                  />
                </div>
              </td>
              <td>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary" // Cor vermelha
                    startIcon={<DeleteIcon style={{ fontSize: 28 }} />} // Aumentando o tamanho do ícone
                    onClick={handleRemoverUsuarioClick}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>‎ </td>
            <td colSpan={2}>‎ </td>
          </tr>
        </tfoot>
      </table>

      <EditarUsuarioPopup open={editarUsuarioPopupOpen} onClose={handleCloseEditarUsuarioPopup} />
      <RemoverUsuarioPopup open={removerUsuarioPopupOpen} onClose={handleCloseRemoverUsuarioPopup} nomeContato={`Nome de Exemplo`} />
    </>
  );
}
