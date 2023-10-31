import React, { useState } from 'react';
import styles from '../styles/PainelAdmin.module.css';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import Footer from '../Footer/Footer';
import TabelaRequisicoes from './TabelaRequisicoes';

export default function PainelRequisicoes() {


  return (
    <>
    <NavbarAdministrador />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <h2>Requisições</h2>
      </div>
      <TabelaRequisicoes />
    </div>
    <Footer/>
    </>
  );
}
