import React, { useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from '../styles/TabelasRaking.module.css'




export const TabelaParceirosRanking: React.FC = () => {
  const regioes: string[] = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];


  type Data = {
    numRanking: string;
    nomeRegiao: string;
    nomeParceiro: string;
    nomeEstabelecimento: string;
    QtdCredito: number;
    QtdVolume: number;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  const generateRandomData = () => {
    return Array.from({ length: 18 }, (_, index) => ({
      numRanking: `${index + 1}º`,
      nomeParceiro: `Parceiro ${index + 1}`,
      nomeEstabelecimento: `Estabelecimento ${index + 1}`,
      nomeRegiao: regioes[Math.floor(Math.random() * regioes.length)],
      QtdCredito: Math.floor(Math.random() * 10000) + 1,
      QtdVolume: Math.floor(Math.random() * 10000) + 1,
    }));
  };

  const initialData: Data[] = generateRandomData();

  const [data, setData] = useState<Data[]>(initialData.sort((a, b) => b.QtdCredito - a.QtdCredito));

  const indexedData = data.map((usuario, index) => ({
    ...usuario,
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Parceiro</th>
            <th>Região</th>
            <th>Créditos</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.nomeParceiro}</td>
              <td>{item.nomeRegiao}</td>
              <td>{item.QtdCredito}</td>
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
      <p>ㅤ</p>
    </>
  );
};
export const TabelaEstabelecimentosRanking: React.FC = () => {
  const regioes: string[] = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

  type Data = {
    numRanking: string;
    nomeRegiao: string;
    nomeParceiro: string;
    nomeEstabelecimento: string;
    QtdVolume: number;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  const generateRandomData = () => {
    return Array.from({ length: 18 }, (_, index) => ({
      numRanking: `${index + 1}º`,
      nomeParceiro: `Parceiro ${index + 1}`,
      nomeEstabelecimento: `Estabelecimento ${index + 1}`,
      nomeRegiao: regioes[Math.floor(Math.random() * regioes.length)],
      QtdVolume: Math.floor(Math.random() * 10000) + 1,
    })).sort((a, b) => b.QtdVolume - a.QtdVolume); // Sort the data here.
  };

  const initialData: Data[] = generateRandomData();

  const [data, setData] = useState<Data[]>(initialData);

  const indexedData = data.map((estabelecimento, index) => ({
    ...estabelecimento,
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Estabelecimento</th>
            <th>Região</th>
            <th>Volume (Em Litros)</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.nomeEstabelecimento}</td>
              <td>{item.nomeRegiao}</td>
              <td>{item.QtdVolume}</td>
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
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
    </>
  );
};