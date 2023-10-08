import React, { useEffect, useState } from 'react';
import styles from '../styles/PainelEstabelecimento.module.css';
import MesAno from './MesAno';
import TabelaSaldoCreditoExtrato from './TabelaSaldoCreditoExtrato';
import Footer from '../Footer/Footer';
import NavbarEstabelecimento from '../Navbars/NavbarEstabelecimento';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function PainelEstabelecimentoExtrato() {
  const [saldoVisivel, setSaldoVisivel] = useState(false);
  const [saldoValor, setSaldoValor] = useState(0);
  const id = localStorage.getItem('idEstabelecimento');

  //buscar dados do estabelecimento logado e setar o valor do saldo
  useEffect(() => {
    fetch(`http://localhost:3001/Estabelecimento/${id}`, {
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSaldoValor(data[0].estabelecimento_saldo);
      })
      .catch((error) => console.log(error));
  }, []);
  //buscar dados do estabelecimento logado e setar o valor do saldo
  

  const toggleSaldoVisivel = () => {
    setSaldoVisivel(!saldoVisivel);
  };

  return (
    <>
      <NavbarEstabelecimento />

      <div className={styles.containerConteudo}>
        <div className={styles.topContent}>
        <h1>
            Saldo de crédito: {' '}
            <span className={styles.saldoValue}>
              {saldoVisivel ? (
                <span className={styles.saldoAtual}>{saldoValor}</span>
              ) : (
                <span className={styles.saldoPlaceholder}>XXXXXX</span>
              )}
              {saldoVisivel ? (
                <VisibilityOffIcon onClick={toggleSaldoVisivel} style={{ cursor: 'pointer' }} />
              ) : (
                <VisibilityIcon onClick={toggleSaldoVisivel} style={{ cursor: 'pointer' }} />
              )}
              
            </span>
          </h1>
        </div>
        <div className={styles.topContent}>
        <h2>Extrato</h2>
          <div className={styles.headerActions}>
            <MesAno />
          </div>
        </div>
        <TabelaSaldoCreditoExtrato />
      </div>
      <Footer />
    </>
  );
}
