import React, { useState } from 'react';
import styles from '../styles/PainelParceiro.module.css';
import Footer from '../Footer/Footer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TabelaEstabelecimentosRanking, TabelaParceirosRanking } from './TabelasRanking';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';

export default function DashboardRanking() {
  const [saldoVisivel, setSaldoVisivel] = useState(false);
  return (
    <>
      <NavbarAdministrador />
      <div className={styles.containerConteudo}>
        <div className={styles.topContent}>
          <h1>
            Ranking
          </h1>
        </div>
        <div className={styles.topContent}>
          <h2>Parceiros que mais utilizam os créditos</h2>
        </div>
        <TabelaParceirosRanking />
        <div className={styles.topContent}>
          <h2>Estabelecimentos com maiores volumes descartados</h2>
        </div>
        <TabelaEstabelecimentosRanking />
      </div>
      <Footer />
    </>
  );
}
