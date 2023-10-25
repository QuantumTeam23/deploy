import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from '../styles/TabelasRaking.module.css';

export const TabelaParceiros: React.FC = () => {

  type Data = {
    numRanking: string;
    regiao: string;
    nomeParceiro: string;
    QtdCreditoRecebido: number;
    total_creditos_doados: number;
    QtdOleo: number;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  useEffect(() => {
    fetch("http://localhost:3001/regiaoParceiroMaisCedido", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const initialData: Data[] = []

  const [data, setData] = useState<Data[]>(initialData.sort((a, b) => b.total_creditos_doados - a.total_creditos_doados));

  const indexedData = data.map((item, index) => ({
    ...item,
    numRanking: `${index + 1}º`,
  }));

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentData: Data[] = indexedData.slice(startIndex, endIndex);

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

  return (
    <>
      <h4>Ranking de Parceiros por Região</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Região</th>
            <th>Créditos Cedidos</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.regiao}</td>
              <td>{item.total_creditos_doados}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
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
};

export const TabelaEstabelecimento: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const handleNextPage = () => {
  //   if (endIndex < data.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  return (
    <>
      <h4>Ranking de Estabelecimento por Região</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Região</th>
            <th>Créditos Recebidos</th>
          </tr>
        </thead>
        <tbody>
          {/* {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.nomeRegiao}</td>
              <td>{item.QtdCreditoCedido}</td>
            </tr>
          ))} */}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
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
                // endIcon={<KeyboardArrowRightIcon />}
                // disabled={endIndex >= data.length}
                // onClick={handleNextPage}
                // style={{
                //   color: endIndex < data.length ? 'lightblue' : 'lightgray',
                //   fontWeight: endIndex < data.length ? 'bold' : 'normal',
                // }}
              >
                Próxima
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
   
    </>
  );
};


export const TabelaMelhorPerformance: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;


  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const handleNextPage = () => {
  //   if (endIndex < data.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  return (
    <>
      <h4>Ranking de Estabelecimentos com Melhor Descarte</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Região</th>
            <th>Óleo (Em Litros)</th>
          </tr>
        </thead>
        <tbody>
          {/* {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.nomeRegiao}</td>
              <td>{item.QtdOleo}</td>
            </tr>
          ))} */}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
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
                // endIcon={<KeyboardArrowRightIcon />}
                // disabled={endIndex >= data.length}
                // onClick={handleNextPage}
                // style={{
                //   color: endIndex < data.length ? 'lightblue' : 'lightgray',
                //   fontWeight: endIndex < data.length ? 'bold' : 'normal',
                // }}
              >
                Próxima
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
      
    </>
  );
};