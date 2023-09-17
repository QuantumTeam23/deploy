import React, { useState } from 'react';
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

  const toggleSaldoVisivel = () => {
    setSaldoVisivel(!saldoVisivel);
  };

  return (
    <>
      <NavbarEstabelecimento />

      <div className={styles.containerConteudo}>
        <div className={styles.topContent}>
          <div className={styles.headerActions}>
            <MesAno />
          </div>
        </div>
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
        <TabelaSaldoCreditoExtrato />
      </div>
      <Footer />
    </>
  );
}
