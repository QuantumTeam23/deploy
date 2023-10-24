import React, { useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from '../styles/TabelasRaking.module.css';

const regioes: string[] = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

type Data = {
  numRanking: string;
  nomeRegiao: string;
  nomeParceiro: string;
  QtdCreditoRecebido: number;
  QtdCreditoCedido: number;
  QtdOleo: number;
};

const uniqueRegioes: string[] = Array.from(new Set(regioes));

const generateRandomData = (regioes: string[]): Data[] => {
  return regioes.map((regiao, index) => ({
    numRanking: `${index + 1}º`,
    nomeRegiao: regiao,
    nomeParceiro: `Parceiro ${index + 1}`,
    QtdCreditoRecebido: Math.floor(Math.random() * 10000) + 1,
    QtdCreditoCedido: Math.floor(Math.random() * 10000) + 1,
    QtdOleo: Math.floor(Math.random() * 10000) + 1,
  }));
};
export const TabelaParceiros: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;
  const initialData: Data[] = generateRandomData(uniqueRegioes);

  // Ordenar dados com base na quantidade de créditos cedidos em ordem decrescente
  const [data, setData] = useState<Data[]>(
    initialData.sort((a, b) => b.QtdCreditoCedido - a.QtdCreditoCedido)
  );

  // Reindexar os dados para que a contagem comece do 1º lugar
  const indexedData = data.map((parceiro, index) => ({
    ...parceiro,
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
              <td>{item.nomeRegiao}</td>
              <td>{item.QtdCreditoCedido}</td>
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
  const initialData: Data[] = generateRandomData(uniqueRegioes);

  // Ordenar dados com base na quantidade de créditos cedidos em ordem decrescente
  const [data, setData] = useState<Data[]>(
    initialData.sort((a, b) => b.QtdCreditoCedido - a.QtdCreditoCedido)
  );

  // Reindexar os dados para que a contagem comece do 1º lugar
  const indexedData = data.map((parceiro, index) => ({
    ...parceiro,
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
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.nomeRegiao}</td>
              <td>{item.QtdCreditoCedido}</td>
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


export const TabelaMelhorPerformance: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;
  const initialData: Data[] = generateRandomData(uniqueRegioes);

  // Ordenar dados com base na quantidade de créditos recebidos em ordem decrescente
  const [data, setData] = useState<Data[]>(
    initialData.sort((a, b) => b.QtdOleo - a.QtdOleo)
  );

  // Reindexar os dados para que a contagem comece do 1º lugar
  const indexedData = data.map((parceiro, index) => ({
    ...parceiro,
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
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.nomeRegiao}</td>
              <td>{item.QtdOleo}</td>
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