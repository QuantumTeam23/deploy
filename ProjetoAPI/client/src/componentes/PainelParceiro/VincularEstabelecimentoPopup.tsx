import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styles from '../styles/PainelAdmin.module.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';

export default function VincularEstabelecimento({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const userData = Array.from({ length: 50 }, (_, index) => ({
    nome: `Usuário ${index + 1}`,
    tipo: 'Parceiro',
    bairro: `Bairro ${index + 1}`,
    cidade: `Cidade ${index + 1}`,
    estabelecimento_estado: `Estado ${index + 1}`,
    estabelecimento_id: index + 1,
  }));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = userData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < userData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAdicionarEstabelecimento = (estabelecimentoId: number, nome: string) => {
    Swal.fire({
      title: `Deseja vincular o estabelecimento ${nome} à sua carteira?`,
      text: 'Esta ação é irreversível.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'z-index-high',
      },
      willOpen: (toast) => {
        toast.style.zIndex = '9999';
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Adicionar estabelecimento com ID ${estabelecimentoId}`);
        
        setTimeout(() => {
          Swal.close();
          Swal.fire({
            title: 'Sucesso',
            text: 'O estabelecimento foi adicionado com sucesso.',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
        }, 100);
      }
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Vincular Estabelecimento</DialogTitle>
      <DialogContent>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Vincular</th>
            </tr>
          </thead>
          <tbody>
            {currentData
              .filter((item) => item.tipo === 'Parceiro')
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.tipo}</td>
                  <td>{item.bairro}</td>
                  <td>{item.cidade}</td>
                  <td>{item.estabelecimento_estado}</td>
                  <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <IconButton onClick={() => handleAdicionarEstabelecimento(item.estabelecimento_id, item.nome)}>
                      <AddIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                <Button
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                  style={{
                    color: currentPage !== 1 ? 'lightblue' : 'lightgray',
                    fontWeight: currentPage !== 1 ? 'bold' : 'normal',
                  }}
                >
                  Anterior
                </Button>
                <Button
                  disabled={endIndex >= userData.length}
                  onClick={handleNextPage}
                  style={{
                    color: endIndex < userData.length ? 'lightblue' : 'lightgray',
                    fontWeight: endIndex < userData.length ? 'bold' : 'normal',
                  }}
                >
                  Próxima
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
