import React from 'react';
import MenuLateralAdministrador from './NavbarAdministradorMenuLateral';

function NavbarAdministrador() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#136935' }}>
            <div className="container" style={{ maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <a href="#" className="navbar-brand">
                    <img src={require('../Imagens/logoEmpresa.png')} alt="Imagem" className="img-fluid"  style={{ maxWidth: '100px', maxHeight: '60px' }}  /> 
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span style={{ display: 'flex', alignItems: 'center' }}><MenuLateralAdministrador /></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className='navbar-nav mt-auto'>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#" style={{ marginLeft: '200px', marginRight: '200px', fontSize: '35px'}}>Painel do Administrador </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item" style={{ marginRight: '25px' }}>
                            <a className="nav-link text-white" href="#">Processos</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '25px' }}>
                            <a className="nav-link text-white" href="/painel-administrador-transacoes">Transações</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '25px' }}>
                            <a className="nav-link text-white" href="/painel-administrador-usuario">Controle de Usuários</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '10px' }}>
                            <img src={require('../Imagens/user.png')} alt="Imagem" className="img-fluid"  style={{ maxWidth: '100px', maxHeight: '40px' }}  /> 
                        </li>
                        <li className="nav-item" style={{ marginRight: '10px' }}>
                            <a href="#">
                                <img src={require('../Imagens/icone-sair.png')} alt="Imagem" className="img-fluid" style={{ maxWidth: '100px', maxHeight: '40px' }} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarAdministrador;
