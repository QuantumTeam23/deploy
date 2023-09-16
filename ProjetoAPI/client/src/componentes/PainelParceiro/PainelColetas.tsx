import styles from './PainelParceiro.module.css';
import BarraPesquisa from './BarraPesquisa';
import TabelaColeta from './TabelaColeta';
import { DataFim, DataInicio } from './DataFiltro';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';

export default function PainelParceiroColetas() {


  return (
    <>
    <NavbarParceiro />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <div className={styles.headerActions}>
          Estabelecimento:  <BarraPesquisa />
          Data de: <DataInicio/> até <DataFim />
        </div>
      </div>
      <h2>Coletas</h2>
      <TabelaColeta />
    </div>
    <Footer />
    </>
  );
}
//tete