import '../styles/CadastroParceiro.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function CadastroParceiro() {
    return (
        <div className='container-geral-cadastro'>
            <div className="container-janela-cadastro">
                <div className='container-esquerda-cadastro'>
                    <span className='logo-cadastro'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-cadastro'>
                    <div>
                        <span className='titulo-cadastro'>
                            <h1>Cadastro Parceiro</h1>
                        </span>
                    </div>
                    <Container>
                        <div className='campo-cadastro'>
                            <Form.Group controlId='nomeUsuario'>
                                <Form.Label>Nome</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o Nome'
                                        aria-label='nomeUsuario'
                                        aria-describedby='email-addon'
                                        className='form-control-cadastro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <div className='campo-cadastro'>
                            <Form.Group controlId='email'>
                                <Form.Label>Email:</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='email'
                                        required
                                        placeholder='Digite o email'
                                        aria-label='email'
                                        aria-describedby='email-addon'
                                        className='form-control-cadastro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <div className='campo-cadastro'>
                            <Form.Group controlId='cep'>
                                <Form.Label>CEP:</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o CEP'
                                        aria-label='cep'
                                        aria-describedby='cep-addon'
                                        className='form-control-cadastro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <div className='campo-cadastro'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Senha:</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='password'
                                        required
                                        placeholder='Digite a senha'
                                        aria-label='senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-cadastro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-cadastro'>
                        <Button variant="success">Cadastrar</Button>{' '}
                    </span>
                    <div className='registro-cadastro'>
                        <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastroParceiro;