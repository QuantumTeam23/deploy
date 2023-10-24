import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';
import { TabelaParceiros, TabelaEstabelecimento, TabelaMelhorPerformance } from './TabelasRankingRegiao';
import stylesTable from '../styles/TabelasRaking.module.css';
import styles from '../styles/PainelParceiro.module.css';
//import data from './TabelaPrecoRegiao'

//import PieChart from './DashboardPizza';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Importe 'chart.js/auto' para corrigir problemas com canvas.
import { setDatasets } from 'react-chartjs-2/dist/utils';
import { TabelaParceirosRanking } from './TabelasRanking';
import { Col, Container, Row } from 'react-bootstrap';


var dados: number[];
//valores aleatórios, para o gráfico não iniciar vazio ao abrir a tela, mas deve ser trocado por dados vindo do banco
//esses valores são os que movimentam o gráfico
dados = [80.60, 55.70, 25.30, 66.70, 45.60]

export default function DashboardRankingRegiao() {
  const [activeTab, setActiveTab] = useState('parceiro');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab == "parceiro") {
      //Os dados dessa lista devem vir do banco de dados e são os que estão na coluna  Créditos Cedidos da Tabela Ranking Parceiro
      dados = [7.99, 6.80, 2.80, 33.90, 44.56]


    }

    if (tab == "estabelecimento") {
      //Os dados dessa lista devem vir do banco de dados e são os que estão na coluna Créditos Recebidos da tabela Ranking Estabelecimento
      dados = [25.60, 80.70, 15.30, 45.70, 25]

    }

    if (tab == "melhor-performance") {
      //Os dados dessa lista devem vir do banco de dados e são os que estão na coluna Óleo(Em Litros) da tabela Ranking de Estabelecimentos
      dados = [80.60, 55.70, 25.30, 66.70, 45.60]

    }

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
      
        <Container style={{marginTop:"5%", marginBottom:"10%"}}>
          <Row>
            <Col sm={9} >
              <Row className={stylesTable.tabsContainer}>
                <div style={{justifyContent:"center"}}>
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

                </div>
                {/* Adicione mais botões de aba conforme necessário */}
              </Row>
              <Row sm={8} className='TabelasRankingRegiao' style={{ marginBottom: "5%" }}>
                {activeTab === 'parceiro' && <TabelaParceiros />}
                {activeTab === 'estabelecimento' && <TabelaEstabelecimento />}
                {activeTab === 'melhor-performance' && <TabelaMelhorPerformance />}
              </Row>
            </Col>
            <Col  sm={3} style={{ display: "flex", textAlign: "center",paddingTop:"5%", maxHeight: "367px", minHeight: "367px" }}>
              <PieChart />
            </Col>
          </Row>
        </Container>
        <Footer />
    
    </>
  );
}
