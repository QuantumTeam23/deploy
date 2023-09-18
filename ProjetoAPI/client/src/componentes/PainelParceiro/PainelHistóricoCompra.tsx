import styles from '../styles/PainelParceiro.module.css';
import TabelaHistoricoCompra from './TabelaHistoricoCompra';
import MesAno from './MesAno';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';
import { useNavigate } from 'react-router-dom';

export default function PainelHistoricoCompra() {
  const navigate = useNavigate()

  const handleClick = () => {
    const id = localStorage.getItem('idParceiro'); // Substitua pelo ID correto do parceiro
    fetch(`http://localhost:3001/read-by-id-to-edit/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTimeout(() => {
          navigate('/editar-usuario');
      }, 1100);
        localStorage.setItem('parceiroData', JSON.stringify(data));

      })
      .catch(error => {
        console.error('Erro ao buscar dados do parceiro:', error);
      });
  };

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
      <a href='#' onClick={handleClick}>editar</a>
      <TabelaHistoricoCompra />
    </div>
    <Footer />
    </>
  );
}
//tete