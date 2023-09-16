import '../styles/EditarSenha.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function EditarSenha() {
    return (
        <div className='container-geral-editarsenha'>
            <div className="container-janela-editarsenha">
                <div className='container-esquerda-editarsenha'>
                    <span className='logo-editarsenha'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-editarsenha'>
                    <div>
                        <span className='titulo-editarsenha'>
                            <h1>Editar Senha</h1>
                        </span>
                    </div>
                    <Container>
                        <div className='campo-editarsenha'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Nova senha</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='password'
                                        required
                                        placeholder='Digite a sua nova senha'
                                        aria-label='Senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-editarsenha'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container>
                        <div className='campo-editarsenha'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Repetir a senha</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='password'
                                        required
                                        placeholder='Repita a sua nova senha'
                                        aria-label='Senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-editarsenha'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-editarsenha'>
                    <Button variant="success">Confirmar</Button>{' '}
                    </span>
                    <div className='volta-login-editarsenha'>
                    <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarSenha;