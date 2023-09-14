import '../styles/CadastroParceiro.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function CadastroParceiro() {
    return (
    <div >
        <div className='container-geral-cadastro-parceiro'>
            <div className="container-janela-cadastro-parceiro">
                <div className='container-esquerda-cadastro-parceiro'>
                    <span className='logo-cadastro-parceiro'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-cadastro-parceiro'>
                    <div className='titulo-cadastro-parceiro titulo-cadastro-mobile'>
                        <span >
                            <h1>Cadastro Parceiro</h1>
                        </span>
                    </div>
                    <Container>
                        <div className='campo-cadastro-parceiro campos'>
                            <Form.Group controlId='razao_social'>
                                <Form.Label>Razão social/Nome</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite a Razão Social'
                                        aria-label='razao_social'
                                        aria-describedby='razao_social-addon'
                                        className='form-control-cadastro-parceiro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='fantasia-cadastro-parceiro'>
                            <Form.Group controlId='nome_fantasia'>
                                <Form.Label>Nome Fantasia</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o nome Fantasia'
                                        aria-label='nome_fantasia'
                                        aria-describedby='nome_fantasia-addon'
                                        className='form-control-cadastro-parceiro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className="tipo-cadastro-parceiro">
                        <Form.Label>Tipo</Form.Label>
                            <Form.Select aria-label="Tipo Parceiro">
                                <option>Selecione o tipo</option>
                                <option value="1">Restaurante</option>
                                <option value="2">Condomínio</option>
                                <option value="3">Lanchonete</option>
                                <option value="4">Shopping</option>
                                <option value="5">Residência</option>
                                <option value="6">Outros</option>
                            </Form.Select> 
                        </div>
                    </Container>
                    <Container>
                        <div className='campo-cadastro-parceiro'>
                            <Form.Group controlId='cnpj'>
                                <Form.Label>CNPJ/CPF</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='cnpj'
                                        required
                                        placeholder='Digite o CNPJ'
                                        aria-label='cnpj'
                                        aria-describedby='cnpj-addon'
                                        className='form-control-cadastro-parceiro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='logradouro-cadastro-parceiro'>
                            <Form.Group controlId='logradouro'>
                                <Form.Label>Logradouro</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o endereço'
                                        aria-label='endereco'
                                        aria-describedby='endereco-addon'
                                        className='form-control-cadastro-parceiro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='numero-cadastro-parceiro '>
                            <Form.Group controlId='numero'>
                                <Form.Label>Número</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Numero'
                                        aria-label='numero'
                                        aria-describedby='numero-addon'
                                        className='form-control-cadastro-parceiro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='bairro-cadastro-parceiro '>
                            <Form.Group controlId='cep'>
                                <Form.Label>Bairro</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='bairro'
                                        aria-label='bairro'
                                        aria-describedby='bairro-addon'
                                        className='form-control-cadastro-parceiro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='campo-cadastro-parceiro'>
                            <Form.Group controlId='lcomplemento'>
                                <Form.Label>Complemento</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o complemento'
                                        aria-label='ecomplemento'
                                        aria-describedby='ecomplemento-addon'
                                        className='form-control-cadastro-parceiro'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-cadastro-parceiro'>
                    <Button variant="success">Cadastrar</Button>{' '}
                    </span>
                    <div className='registro-cadastro-parceiro'>
                        <p>Voltar para a página de <a href="#">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CadastroParceiro;
