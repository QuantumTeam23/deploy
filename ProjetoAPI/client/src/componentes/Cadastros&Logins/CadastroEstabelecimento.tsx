import './styles/CadastroEstabelecimento.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function cadastro_estabelecimento() {
    return (
    <div >
        <div className='container-geral-cadastro_estabelecimento'>
            <div className="container-janela-cadastro_estabelecimento">
                <div className='container-esquerda-cadastro_estabelecimento'>
                    <span className='logo-cadastro_estabelecimento'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-cadastro_estabelecimento'>
                    <div className='titulo-cadastro_estabelecimento titulo-cadastro-mobile'>
                        <span >
                            <h1>Cadastro Estabelecimento</h1>
                        </span>
                    </div>
                    <Container>
                        <div className='campo-cadastro_estabelecimento campos'>
                            <Form.Group controlId='razao_social'>
                                <Form.Label>Razão social/Nome</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite a Razão Social'
                                        aria-label='razao_social'
                                        aria-describedby='razao_social-addon'
                                        className='form-control-cadastro_estabelecimento'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='fantasia-cadastro_estabelecimento'>
                            <Form.Group controlId='nome_fantasia'>
                                <Form.Label>Nome Fantasia</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o nome Fantasia'
                                        aria-label='nome_fantasia'
                                        aria-describedby='nome_fantasia-addon'
                                        className='form-control-cadastro_estabelecimento'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className="tipo-cadastro_estabelecimento">
                        <Form.Label>Tipo</Form.Label>
                            <Form.Select aria-label="Tipo Estabelecimento">
                                <option>Selecione o tipo</option>
                                <option value="1">Restaurante</option>
                                <option value="2">Hotel</option>
                                <option value="3">Condomínio</option>
                                <option value="3">Cooperativa</option>
                                <option value="3">Residência</option>
                                <option value="3">Reciclagem</option>
                                <option value="3">Profissional individual</option>
                            </Form.Select> 
                        </div>
                    </Container>
                    <Container>
                        <div className='campo-cadastro_estabelecimento'>
                            <Form.Group controlId='cnpj'>
                                <Form.Label>CNPJ/CPF</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='cnpj'
                                        required
                                        placeholder='Digite o CNPJ'
                                        aria-label='cnpj'
                                        aria-describedby='cnpj-addon'
                                        className='form-control-cadastro_estabelecimento'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='logradouro-cadastro_estabelecimento'>
                            <Form.Group controlId='logradouro'>
                                <Form.Label>Logradouro</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o endereço'
                                        aria-label='endereco'
                                        aria-describedby='endereco-addon'
                                        className='form-control-cadastro_estabelecimento'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='numero-cadastro_estabelecimento '>
                            <Form.Group controlId='numero'>
                                <Form.Label>Número</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Numero'
                                        aria-label='numero'
                                        aria-describedby='numero-addon'
                                        className='form-control-cadastro_estabelecimento'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='bairro-cadastro_estabelecimento '>
                            <Form.Group controlId='cep'>
                                <Form.Label>Bairro</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='bairro'
                                        aria-label='bairro'
                                        aria-describedby='bairro-addon'
                                        className='form-control-cadastro_estabelecimento'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='campo-cadastro_estabelecimento'>
                            <Form.Group controlId='lcomplemento'>
                                <Form.Label>Complemento</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o complemento'
                                        aria-label='ecomplemento'
                                        aria-describedby='ecomplemento-addon'
                                        className='form-control-cadastro_estabelecimento'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-cadastro_estabelecimento'>
                    <Button variant="success">Cadastrar</Button>{' '}
                    </span>
                    <div className='registro-cadastro_estabelecimento'>
                        <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default cadastro_estabelecimento;
