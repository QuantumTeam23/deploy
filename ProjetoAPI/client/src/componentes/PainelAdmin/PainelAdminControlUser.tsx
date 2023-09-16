import React, { useState } from 'react';
import styles from './PainelAdmin.module.css';
import BarraPesquisa from './BarraPesquisa';
import AdicionarUsuario from './AcoesUsuario';
import AdicionarUsuarioPopup from './AcoesUsuarioPopup';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import Footer from '../Footer/Footer';
import TabelasControlUser from './TabelasControlUser';

export default function PainelAdmin() {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
    <NavbarAdministrador />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <h2>Controle de usuário</h2>
        <div className={styles.headerActions}>
          <AdicionarUsuario onClick={handleOpenPopup} />
          <BarraPesquisa />
        </div>
      </div>
      <TabelasControlUser />
      {popupOpen && <AdicionarUsuarioPopup open={popupOpen} onClose={handleClosePopup} />}
    </div>
    <Footer />
    </>
  );
}
