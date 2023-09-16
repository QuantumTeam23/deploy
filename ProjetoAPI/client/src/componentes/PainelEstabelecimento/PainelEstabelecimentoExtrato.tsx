import styles from './PainelEstabelecimento.module.css';
import MesAno from './MesAno';
import TabelaSaldoCreditoExtrato from './TabelaSaldoCreditoExtrato';
import NavbarEstabelecimento from '../Navbars/NavbarEstabelecimento';
import Footer from '../Footer/Footer';

export default function PainelEstabelecimentoExtrato() {

  return (
    <>
    <NavbarEstabelecimento />

    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <div className={styles.headerActions}>
          <MesAno />
        </div>
      </div>
      <h2>Extrato</h2>
      <TabelaSaldoCreditoExtrato />
    </div>
    <Footer />
    </>
  );
}
//tete