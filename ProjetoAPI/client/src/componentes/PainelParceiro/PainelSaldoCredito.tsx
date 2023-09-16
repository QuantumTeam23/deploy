import React from 'react';
import styles from '../styles/PainelParceiro.module.css';
import MesAno from './MesAno';
import { TabelaCreditoCedido, TabelaCreditoContratado } from './TabelaSaldoCredito';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';

export default function PainelParceiroSaldoCredito() {
  return (
    <>
    <NavbarParceiro />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <h1>Saldo de crédito</h1>
        <p>xxxxxx</p>
      </div>
      <div className={styles.topContent}>
        <h2>Crédito Contratado</h2>
        <div className={styles.headerActions}>
          <MesAno />
        </div>
      </div>
      <TabelaCreditoContratado />
      <div className={styles.topContent}>
        <h2>Crédito Cedido</h2>
        <div className={styles.headerActions}>
          <MesAno />
        </div>
      </div>
      <TabelaCreditoCedido />
    </div>
    <Footer />
    </>
  );
}

