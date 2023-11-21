import React, { useEffect, useState } from 'react';
import styles from '../styles/PainelLayoutGeral.module.css';
import TabelaColeta from './TabelaColeta';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';

export default function PainelParceiroColetas() {
  const [totalOleoColetado, settotalOleoColetado] = useState(0);
  const id = localStorage.getItem('idParceiro');

  useEffect(() => {
    fetch(`https://server-pi-blue.vercel.app/Parceiro/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        settotalOleoColetado(data[0].parceiro_volume_coleta_mes);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <NavbarParceiro />
      <div className={styles.containerConteudo}>
        <div className={styles.topContent}>
          <h1>
            Total de óleo coletado: {' '} 
            <span className={styles.saldoAtual}>{totalOleoColetado}</span> litros
          </h1>
        </div>
        <div className={styles.headerActions}>
        </div>
        <TabelaColeta />
      </div>
      <Footer />
    </>
  );
}
//tete