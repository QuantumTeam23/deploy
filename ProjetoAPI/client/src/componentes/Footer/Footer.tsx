import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer fixed-bottom">
      <div className="container" style={{ maxWidth: '98%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="row align-items-center">
            <div className="col">
              <a href="#" className="footer-link">
                  <img src={require('../Imagens/logoTeam.png')} alt="Imagem" className="img-fluid" style={{ maxWidth: '100px', maxHeight: '60px' }} />
              </a>
            </div>
            <div className="col text-end">
              <a href="#" className="footer-link">
                <img src={require('../Imagens/github.png')} alt="Imagem" className="img-fluid ml-md-auto" style={{ maxWidth: '100px', maxHeight: '60px' }} />
              </a>
              <a href="#" className="footer-link">
                <img src={require('../Imagens/world-wide-web.png')} alt="Imagem" className="img-fluid" style={{ maxWidth: '100px', maxHeight: '60px' }} />
              </a>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;