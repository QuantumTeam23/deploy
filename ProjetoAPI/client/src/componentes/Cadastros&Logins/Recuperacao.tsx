import '../styles/Recuperacao.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Recuperacao() {
    return (
        <div className='container-geral-recuperacao'>
            <div className="container-janela-recuperacao">
                <div className='container-esquerda-recuperacao'>
                    <span className='logo-recuperacao'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-recuperacao'>
                    <div>
                        <span className='titulo-recuperacao'>
                            <h1>E-mail de recuperação</h1>
                        </span>
                    </div>
                    <Container>
                        <div className='campo-recuperacao'>
                            <Form.Group controlId='email'>
                                <Form.Label>Insira um e-mail para recuperação</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='email'
                                        required
                                        placeholder='Digite seu e-mail'
                                        aria-label='E-mail'
                                        aria-describedby='email-addon'
                                        className='form-control-recuperacao'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-recuperacao'>
                        <Button variant="success">Confirmar</Button>{' '}
                    </span>
                    <div className='volta-login-recuperacao'>
                        <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recuperacao;