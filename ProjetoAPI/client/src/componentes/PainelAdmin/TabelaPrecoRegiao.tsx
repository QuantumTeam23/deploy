import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import styles from '../styles/TabelasEstabelecimento.module.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type RegionType = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

type ItemType = {
  preco_id?: string;
  preco_regiao: RegionType;
  preco_oleo_virgem: number;
  preco_oleo_usado: number;
  creditosGreeneat: number;
};

export default function TabelaPrecopreco_regiao() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ItemType[]>([
    { preco_regiao: 'Norte', preco_oleo_virgem: 0, preco_oleo_usado: 0, creditosGreeneat: 0 },
    { preco_regiao: 'Nordeste', preco_oleo_virgem: 0, preco_oleo_usado: 0, creditosGreeneat: 0 },
    { preco_regiao: 'Centro-Oeste', preco_oleo_virgem: 0, preco_oleo_usado: 0, creditosGreeneat: 0 },
    { preco_regiao: 'Sudeste', preco_oleo_virgem: 0, preco_oleo_usado: 0, creditosGreeneat: 0 },
    { preco_regiao: 'Sul', preco_oleo_virgem: 0, preco_oleo_usado: 0, creditosGreeneat: 0 },
  ]);

  useEffect(() => {
    fetch(`http://localhost:3001/listPreco`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((error) => console.log(error));
  }, []);


  const formatarData = (date: string) => {
    const dataformat = new Date(date).toLocaleString('pt-BR');
    return dataformat;
  }

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
        <div>Preço de Óleo Virgem: <input type="number" id="virgem" value="${item.preco_oleo_virgem}" /></div>
        <div>Preço de Óleo Usado: <input type="number" id="usado" value="${item.preco_oleo_usado}" /></div>
        <div>Créditos Greeneat: <input type="number" id="creditos" value="${item.creditosGreeneat}" /></div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      preConfirm: () => {
        const virgemInput = document.getElementById('virgem') as HTMLInputElement;
        const usadoInput = document.getElementById('usado') as HTMLInputElement;
        const creditosInput = document.getElementById('creditos') as HTMLInputElement;
  
        const virgemValue = parseFloat(virgemInput.value);
        const usadoValue = parseFloat(usadoInput.value);
        const creditosValue = parseFloat(creditosInput.value);
  
        if (virgemValue !== 0 && usadoValue !== 0 && creditosValue !== 0) {
          const updatedData = data.map((d) =>
            d === item
              ? {
                  ...d,
                  preco_oleo_virgem: virgemValue,
                  preco_oleo_usado: usadoValue,
                  creditosGreeneat: creditosValue,
                }
              : d
          );
  
          setData(updatedData);
  
          fetch(`http://localhost:3001/editar-preco/${item.preco_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            preco_oleo_virgem: virgemValue,
            preco_oleo_usado: usadoValue,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Erro ao editar dados no servidor');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Dados editados com sucesso no servidor:', data);
          })
          .catch((error) => {
            console.error('Erro ao editar dados no servidor:', error);
          });
          Swal.fire('Salvo!', 'As informações foram atualizadas.', 'success');
        } else {
          Swal.fire('Erro!', 'Por favor, insira valores válidos maiores que zero.', 'error')
            .then(() => handleEdit(item));
        }
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
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.preco_regiao}</td>
              <td>{item.preco_oleo_virgem}</td>
              <td>{item.preco_oleo_usado}</td>
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
