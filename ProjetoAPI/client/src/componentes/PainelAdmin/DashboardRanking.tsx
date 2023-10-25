import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';
import { TabelaRegiaoParceiros, TabelaRegiaoEstabelecimento, TabelaMelhorPerformanceDescarte, TabelaEstabMaiorVolDescartado, TabelaParceirosMaisDoamCreditos } from './TabelasRankingRegiao';
import stylesTable from '../styles/TabelasRaking.module.css';
import styles from '../styles/PainelParceiro.module.css';
//import data from './TabelaPrecoRegiao'

//import PieChart from './DashboardPizza';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Importe 'chart.js/auto' para corrigir problemas com canvas.
import { setDatasets } from 'react-chartjs-2/dist/utils';
import { Col, Container, Row } from 'react-bootstrap';


var dados: number[];
//valores aleatórios, para o gráfico não iniciar vazio ao abrir a tela, mas deve ser trocado por dados vindo do banco
//esses valores são os que movimentam o gráfico
dados = [80.60, 55.70, 25.30, 66.70, 45.60]

export default function DashboardRanking() {
  const [activeTab, setActiveTab] = useState('parceiro');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab == "regiao-parceiro") {
      //Os dados dessa lista devem vir do banco de dados e são os que estão na coluna  Créditos Cedidos da Tabela Ranking Parceiro
      dados = [7.99, 6.80, 2.80, 33.90, 44.56]


    }

    if (tab == "regiao-estabelecimento") {
      //Os dados dessa lista devem vir do banco de dados e são os que estão na coluna Créditos Recebidos da tabela Ranking Estabelecimento
      dados = [25.60, 80.70, 15.30, 45.70, 25]

    }

    if (tab == "melhor-performance-descarte") {
      //Os dados dessa lista devem vir do banco de dados e são os que estão na coluna Óleo(Em Litros) da tabela Ranking de Estabelecimentos
      dados = [80.60, 55.70, 25.30, 66.70, 45.60]
    }

    if (tab == "parceiros-mais-utilizam-creditos") {
      // Os dados dessa lista devem vir do banco de dados e são os que estão na coluna .....
      dados = [10.10, 15.70, 15.30, 66.70, 35.60]
    }

    if (tab == "estabelecimentos-maiores-volumes-descartados") {
      // Os dados dessa lista devem vir do banco de dados e são os que estão na coluna ......
      dados = [70.70, 85.70, 85.30, 36.70, 15.60]
    };

  };

  const PieChart: React.FC = (props) => {
    const data = {
      labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
      datasets: [
        {
          data: dados, // Quantidade de estados em cada região (exemplo)
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#4BC0C0'],

        },
      ],
    };

    return <Pie data={data} />;
  }


  return (
    <>
      <NavbarAdministrador />
      <Container style={{ marginTop: "5%", marginBottom: "10%" }}>
        <div className={styles.topContent}>
          <h1>
            Dashboard Ranking
          </h1>
        </div>
        <Row>
          <Col sm={9} >
            <Row className={stylesTable.tabsContainer}>
              <div style={{ justifyContent: "center" }}>



                <button
                  className={
                    activeTab === 'regiao-parceiro' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                  }
                  onClick={() => handleTabClick('regiao-parceiro')}
                >
                  Parceiro
                </button>

                  
                <button
                  className={
                    activeTab === 'regiao-estabelecimento' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                  }
                  onClick={() => handleTabClick('regiao-estabelecimento')}
                >
                  Estabelecimento
                </button>


                <button
                  className={
                    activeTab === 'melhor-performance-descarte' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                  }
                  onClick={() => handleTabClick('melhor-performance-descarte')}
                >
                  Melhor Performance de Descarte
                </button>


                <button
                  className={
                    activeTab === 'parceiros-mais-utilizam-creditos' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                  }
                  onClick={() => handleTabClick('parceiros-mais-utilizam-creditos')}
                >
                  Parceiros que mais doam os créditos
                </button>
                <button
                  className={
                    activeTab === 'estabelecimentos-maiores-volumes-descartados' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                  }
                  onClick={() => handleTabClick('estabelecimentos-maiores-volumes-descartados')}
                >
                  Estabelecimentos com maiores volumes descartados
                </button>

              </div>
              {/* Adicione mais botões de aba conforme necessário */}
            </Row>
            <Row sm={8} className='TabelasRankingRegiao' style={{ marginBottom: "5%" }}>
              {activeTab === 'regiao-parceiro' && <TabelaRegiaoParceiros />}
              {activeTab === 'regiao-estabelecimento' && <TabelaRegiaoEstabelecimento />}
              {activeTab === 'melhor-performance-descarte' && <TabelaMelhorPerformanceDescarte />}

              {activeTab === 'parceiros-mais-utilizam-creditos' && <TabelaParceirosMaisDoamCreditos />}
              {activeTab === 'estabelecimentos-maiores-volumes-descartados' && <TabelaEstabMaiorVolDescartado />}



            </Row>
          </Col>
          <Col sm={3} style={{ display: "flex", textAlign: "center", paddingTop: "5%", maxHeight: "367px", minHeight: "367px" }}>
            <PieChart />
          </Col>
        </Row>
      </Container>
      <Footer />

    </>
  );
}
