import '../styles/Concluido.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';

function Concluido() {
    return (
        <div className='container-geral-concluido'>
            <div className="container-janela-concluido">
                <div className='container-esquerda-concluido'>
                    <span className='logo-concluido'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-concluido'>
                    <div>
                        <span className='titulo-concluido'>
                            <h1>Troca de senha concluida</h1>
                        </span>
                    </div>
                    <div>
                        <span className='icone-concluido'><img src="cadeado.png" alt="" /></span>
                    </div>
                    <div className='volta-login-concluido'>
                        <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Concluido;