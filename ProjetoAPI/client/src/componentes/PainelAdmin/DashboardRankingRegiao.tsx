import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';
import { TabelaParceiros, TabelaEstabelecimento, TabelaMelhorPerformance } from './TabelasRankingRegiao';
import stylesTable from '../styles/TabelasRaking.module.css';
import styles from '../styles/PainelParceiro.module.css';

import PieChart from './DashboardPizza';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';

export default function DashboardRankingRegiao() {
  const [activeTab, setActiveTab] = useState('parceiro');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <NavbarAdministrador />
      <div className={styles.containerConteudo}>
        <div className={styles.topContent}>
          <div className={styles.mapaContainer}>
          <PieChart />
          </div>
          <div className={stylesTable.tabsContainer}>
            <button
              className={activeTab === 'parceiro' ? styles.activeTabButton : styles.tabButton}
              onClick={() => handleTabClick('parceiro')}
            >
              Parceiro
            </button>
            <button
              className={activeTab === 'estabelecimento' ? styles.activeTabButton : styles.tabButton}
              onClick={() => handleTabClick('estabelecimento')}
            >
              Estabelecimento
            </button>
            <button
              className={activeTab === 'melhor-performance' ? styles.activeTabButton : styles.tabButton}
              onClick={() => handleTabClick('melhor-performance')}
            >
              Melhor Performance de Descarte
            </button>
            {/* Adicione mais botões de aba conforme necessário */}
          </div>
        </div>
        {activeTab === 'parceiro' && <TabelaParceiros />}
        {activeTab === 'estabelecimento' && <TabelaEstabelecimento />}
        {activeTab === 'melhor-performance' && <TabelaMelhorPerformance />}
      </div>
      <Footer />
    </>
  );
}
