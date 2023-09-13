import './styles/EditarUsuario.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function EditarUsuario() {
    return (
        <div className='container-geral-editar-usuario'>
            <div className="container-janela-editar-usuario">
                <div className='container-esquerda-editar-usuario'>
                    <span className='logo-editar-usuario'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-editar-usuario'>
                    <div>
                        <span className='titulo-editar-usuario'>
                            <h1>Editar Usuário</h1>
                        </span>
                    </div>
                    <Container>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='nome'>
                                <Form.Label>Nome</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='nome'
                                        required
                                        placeholder='Digite seu nome'
                                        aria-label='nome'
                                        aria-describedby='nome-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='email'
                                        required
                                        placeholder='Digite seu email'
                                        aria-label='email'
                                        aria-describedby='email-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='nomeUsuario'>
                                <Form.Label>Nome de Usuário</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='nomeUsuario'
                                        required
                                        placeholder='Digite seu nome de usuário'
                                        aria-label='nomeUsuario'
                                        aria-describedby='nomeUsuario-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Senha</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='senha'
                                        required
                                        placeholder='Digite seu senha'
                                        aria-label='senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-editar-usuario'>
                    <Button variant="success">Editar</Button>{' '}
                    </span>
                    <div className='registro-editar-usuario'>
                        <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarUsuario;