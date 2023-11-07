import Button from '@mui/material/Button';
import styles from '../styles/TabelaColetas.module.css';
import { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EventIcon from '@mui/icons-material/Event';
import InputAdornment from '@mui/material/InputAdornment';

export default function TabelaColeta() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const id = localStorage.getItem('idParceiro');
  const [transacoes , setTransacoes] = useState([]);
  const index = [1, 2, 3, 4];
  const [searchQuery, setSearchQuery] = useState(''); // Variável de estado para armazenar a consulta de pesquisa
  const [searchQueryDataInicio, setSearchQueryDataInicio] = useState(''); // Variável de estado para armazenar a consulta de pesquisa
  const [searchQueryDataFim, setSearchQueryDataFim] = useState(''); // Variável de estado para armazenar a consulta de pesquisa

  useEffect(() => {
    fetch(`http://localhost:3001/transacoes-parceiro/${id}`, {
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransacoes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const formatarData = (date: string) => {
    const dataformat = new Date(date).toLocaleString('pt-BR');
    return dataformat;
  }


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = transacoes.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < transacoes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryDataInicio(e.target.value);
  };

  const handleSearchChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryDataFim(e.target.value);
  };





  return (
    <>      
      <h2>Coletas</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={handleSearchChange}
          value={searchQuery}
        />

        <div className={styles.dateFilters}>
          Data de:
          <div>
            <input
              type="date"
              placeholder="Data Início..."
              onChange={handleSearchChange2}
              value={searchQueryDataInicio}
            />
          </div>
          Até
          <div>
           <input
              type="date"
              placeholder="Data Final..."
              onChange={handleSearchChange3}
              value={searchQueryDataFim}
            />
          </div>
        </div>
      </div>
   
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '25%'}}>Estabelecimento</th>
            <th style={{width: '20%'}}>Data</th>
            <th style={{width: '25%'}}>Endereço</th>
            <th style={{width: '20%'}}>Volume</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.estabelecimento_razao_social}</td>
              <td>{formatarData(item.acao_data)}</td>
              <td>{item.estabelecimento_cidade}</td>
              <td>{item.quantidade_oleo_coletado} litros</td>
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
                  color: currentPage !== 1 ? 'lightblue' : 'lightgray', // Alterado para cinza claro quando desativado
                  fontWeight: currentPage !== 1 ? 'bold' : 'normal',
                }}
              >
                Anterior
              </Button>
              <Button
                endIcon={<KeyboardArrowRightIcon />}
                disabled={endIndex >= transacoes.length}
                onClick={handleNextPage}
                style={{
                  color: endIndex < transacoes.length ? 'lightblue' : 'lightgray', // Alterado para cinza claro quando desativado
                  fontWeight: endIndex < transacoes.length ? 'bold' : 'normal',
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
}
