import styles from '../styles/PainelParceiro.module.css';
import MenuLateral from './MenuLateral';
import TabelaHistoricoCompra from './TabelaHistoricoCompra';
import MesAno from './MesAno';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';

export default function PainelHistoricoCompra() {

  return (
    <>
    <NavbarParceiro />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <div className={styles.headerActions}>
          <MesAno />
        </div>
      </div>
      <h2>Histórico de Compras</h2>
      <TabelaHistoricoCompra />
    </div>
    <Footer />
    </>
  );
}
//tete