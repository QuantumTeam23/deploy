import './styles/Usuario.css';
import Button from 'react-bootstrap/Button';

function Usuario() {
    return (
        <div className='container-geral-user'>
            <div className="container-janela-user">
                <div className='container-esquerda-user'>
                    <span className='logo-user'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-user'>
                    <div>
                        <span className='titulo-user'>
                            <h1>Usuário</h1>
                        </span>
                    </div>
                    <div className='subtitulo-user'>
                        <h3>Selecione o tipo de usuário</h3>
                    </div>
                    <span className='botao-usuario-user-1'>
                        <Button variant="success">Parceiro Greenneat</Button>{' '}
                    </span>
                    <span className='botao-usuario-user-2'>
                        <Button variant="success">Estabelecimento</Button>{' '}
                    </span>
                    <div className='volta-login-user'>
                        <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Usuario;