import '../styles/Token.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Token() {
    return (
        <div className='container-geral-token'>
            <div className="container-janela-token">
                <div className='container-esquerda-token'>
                    <span className='logo-token'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-token'>
                    <div>
                        <span className='titulo-token'>
                            <h1>TOKEN</h1>
                        </span>
                    </div>
                    <Container>
                        <div className='campo-token'>
                            <Form.Group controlId='email'>
                                <Form.Label>Insira o TOKEN</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='email'
                                        required
                                        placeholder='Digite seu TOKEN'
                                        aria-label='E-mail'
                                        aria-describedby='email-addon'
                                        className='form-control-token'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-token'>
                        <Button variant="success">Confirmar</Button>{' '}
                    </span>
                    <div className='volta-login-token'>
                        <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Token;