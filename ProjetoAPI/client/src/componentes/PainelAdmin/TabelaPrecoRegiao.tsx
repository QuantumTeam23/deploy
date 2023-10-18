import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import styles from '../styles/TabelasEstabelecimento.module.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type RegionType = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

type ItemType = {
  regiao: RegionType;
  oleoVirgem: number;
  oleoUsado: number;
  creditosGreeneat: number;
};

export default function TabelaPrecoRegiao() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ItemType[]>([
    { regiao: 'Norte', oleoVirgem: 0, oleoUsado: 0, creditosGreeneat: 0 },
    { regiao: 'Nordeste', oleoVirgem: 0, oleoUsado: 0, creditosGreeneat: 0 },
    { regiao: 'Centro-Oeste', oleoVirgem: 0, oleoUsado: 0, creditosGreeneat: 0 },
    { regiao: 'Sudeste', oleoVirgem: 0, oleoUsado: 0, creditosGreeneat: 0 },
    { regiao: 'Sul', oleoVirgem: 0, oleoUsado: 0, creditosGreeneat: 0 },
  ]);

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEdit = (item: ItemType) => {
    Swal.fire({
      title: 'Editar Informações',
      html: `
        <div>Preço de Óleo Virgem: <input type="number" id="virgem" value="${item.oleoVirgem}" /></div>
        <div>Preço de Óleo Usado: <input type="number" id="usado" value="${item.oleoUsado}" /></div>
        <div>Créditos Greeneat: <input type="number" id="creditos" value="${item.creditosGreeneat}" /></div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      preConfirm: () => {
        const virgemInput = document.getElementById('virgem') as HTMLInputElement;
        const usadoInput = document.getElementById('usado') as HTMLInputElement;
        const creditosInput = document.getElementById('creditos') as HTMLInputElement;

        const updatedData = data.map((d) =>
          d === item
            ? {
                ...d,
                oleoVirgem: parseFloat(virgemInput.value),
                oleoUsado: parseFloat(usadoInput.value),
                creditosGreeneat: parseFloat(creditosInput.value),
              }
            : d
        );

        setData(updatedData);

        Swal.fire('Salvo!', 'As informações foram atualizadas.', 'success');
      },
    });
  };
  
  

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Região</th>
            <th>Óleo Virgem</th>
            <th>Óleo Usado</th>
            <th>Créditos Greeneat</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.regiao}</td>
              <td>{item.oleoVirgem}</td>
              <td>{item.oleoUsado}</td>
              <td>{item.creditosGreeneat}</td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <center>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(item)}
                    style={{
                      textTransform: 'none', // Remover transformação do texto
                      width: '50px', // Largura do botão
                      height: '30px', // Altura do botão
                      minWidth: 'auto', // Mínima largura automática para acomodar o ícone
                      paddingRight: '3px', // Espaçamento à direita
                      paddingLeft: '15px', // Espaçamento à esquerda
                      display: 'flex', // Usar display flex para alinhar ícone verticalmente
                      justifyContent: 'center', // Centralizar horizontalmente
                      alignItems: 'center', // Centralizar verticalmente
                      backgroundColor: '#1976D2', // Cor de fundo azul escuro
                      color: 'white', // Cor do texto branco
                      verticalAlign: 'middle', // Centralizar verticalmente
                    }}
                    startIcon={<EditIcon style={{ fontSize: 30, color: 'white' }} />} // Ajustar o tamanho e cor do ícone
                  />
                </center>
              </td>





            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>
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
                disabled={endIndex >= data.length}
                onClick={handleNextPage}
                style={{
                  color: endIndex < data.length ? 'lightblue' : 'lightgray',
                  fontWeight: endIndex < data.length ? 'bold' : 'normal',
                }}
              >
                Próxima
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
