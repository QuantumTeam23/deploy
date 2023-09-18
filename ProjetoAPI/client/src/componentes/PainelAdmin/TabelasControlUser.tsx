import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import styles from '../styles/TabelaControlUser.module.css';
import { useEffect, useState } from 'react';
import { EditarUsuarioPopup, RemoverUsuarioPopup } from './AcoesUsuarioPopup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelasControlUser() {
  const [editarUsuarioPopupOpen, setEditarUsuarioPopupOpen] = useState(false);
  const [removerUsuarioPopupOpen, setRemoverUsuarioPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/listarusuarios", {
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
      })
      .catch((error) => console.log(error));
  }, []);

  /*
  const data = Array.from({ length: 18 }, (_, index) => ({
    nome: `Nome ${index + 1}`,
    tipo: `Tipo ${index + 1}`,
  }));   */
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = user.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < user.length) {
      setCurrentPage(currentPage + 1);
    }
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
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.tipo}</td>
              <td>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon style={{ fontSize: 28 }} />}
                    onClick={handleEditarUsuarioClick}
                  />
                </div>
              </td>
              <td>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon style={{ fontSize: 28 }} />}
                    onClick={handleRemoverUsuarioClick}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              <Button
                startIcon={<KeyboardArrowLeftIcon />}
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
                endIcon={<KeyboardArrowRightIcon />}
                disabled={endIndex >= user.length}
                onClick={handleNextPage}
                style={{
                  color: endIndex < user.length ? 'lightblue' : 'lightgray',
                  fontWeight: endIndex < user.length ? 'bold' : 'normal',
                }}
              >
                Próxima
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>

      <EditarUsuarioPopup open={editarUsuarioPopupOpen} onClose={handleCloseEditarUsuarioPopup} />
      <RemoverUsuarioPopup open={removerUsuarioPopupOpen} onClose={handleCloseRemoverUsuarioPopup} nomeContato={`Nome de Exemplo`} />
    </>
  );
}
