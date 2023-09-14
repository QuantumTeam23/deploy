import '../styles/CadastroParceiro.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, ChangeEvent } from 'react';
import Alert from 'react-bootstrap/Alert';

interface FormState {
    razao_social: string;
    nome_fantasia: string;
    email: string;
    senha: string;
    cnpj: string;
    showEmptyFieldsAlert: boolean;
    cadastrado: boolean;
    cnpjEmUso: boolean;
}

function CadastroParceiro() {
    const [formState, setFormState] = useState<FormState>({
        razao_social: '',
        nome_fantasia: '',
        email: '',
        senha: '',
        cnpj: '',
        showEmptyFieldsAlert: false,
        cadastrado: false,
        cnpjEmUso: false,
    });

    const {
        razao_social,
        nome_fantasia,
        email,
        senha,
        cnpj,
        showEmptyFieldsAlert,
        cadastrado,
        cnpjEmUso,
    } = formState;

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (razao_social === '' || nome_fantasia === '' || email === '' || senha === '' || cnpj === '') {
            setFormState((prevState) => ({
                ...prevState,
                showEmptyFieldsAlert: true,
            }));

            setTimeout(() => {
                setFormState((prevState) => ({
                    ...prevState,
                    showEmptyFieldsAlert: false,
                }));
            }, 5000);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/addParceiro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    razao_social: razao_social,
                    nome_fantasia: nome_fantasia,
                    email: email,
                    senha: senha,
                    cnpj: cnpj
                }),
            });

            if (response.status === 200) {
                console.log('Parceiro cadastrado com sucesso!');
                setFormState((prevState) => ({
                    ...prevState,
                    cadastrado: true,
                }));
                window.location.reload(); // Recarregar a página
            } else if (response.status === 409) {
                setFormState((prevState) => ({
                    ...prevState,
                    cnpjEmUso: true,
                }));
                setTimeout(() => {
                    setFormState((prevState) => ({
                        ...prevState,
                        cnpjEmUso: false,
                    }));
                }, 5000);
            } else {
                console.error('Erro ao cadastrar parceiro:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar parceiro:', error);
        }
    };

    const isFormValid = () => {
        return razao_social !== '' && nome_fantasia !== '' && email !== '' && senha !== '' && cnpj !=='';
    };

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
                        {showEmptyFieldsAlert && (
                            <Alert variant="danger">Preencha todos os campos do formulário.</Alert>
                        )}
                        {cadastrado && (
                            <Alert variant="success">Parceiro cadastrado com sucesso!!</Alert>
                        )}
                        {cnpjEmUso && (
                            <Alert variant="danger">Já existe um parceiro com esse cnpj.</Alert>
                        )}

                        <div className='campo-cadastro-1'>
                            <Form.Group controlId='razao_social'>
                                <Form.Label>Razão Social</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        name='razao_social'
                                        required
                                        placeholder='Digite a razão social'
                                        aria-label='razao_social'
                                        aria-describedby='razao_social-addon'
                                        className='form-control-cadastro'
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}

                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <div className='campo-cadastro'>
                            <Form.Group controlId='nome_fantasia'>
                                <Form.Label>Nome Fantasia</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        name='nome_fantasia'
                                        required
                                        placeholder='Digite o nome fantasia'
                                        aria-label='nome_fantasia'
                                        aria-describedby='nome_fantasia-addon'
                                        className='form-control-cadastro'
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}

                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <div className='campo-cadastro'>
                            <Form.Group controlId='cnpj'>
                                <Form.Label>CNPJ:</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='cnpj'
                                        name='cnpj'
                                        required
                                        placeholder='Digite o cnpj'
                                        aria-label='cnpj'
                                        aria-describedby='cnpj-addon'
                                        className='form-control-cadastro'
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}

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
                                        name='email'
                                        required
                                        placeholder='Digite o email'
                                        aria-label='email'
                                        aria-describedby='email-addon'
                                        className='form-control-cadastro'
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}

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
                                        name='senha'
                                        required
                                        placeholder='Digite a senha'
                                        aria-label='senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-cadastro'
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}

                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-cadastro'>
                        <Button variant="success" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            event.preventDefault();
                            handleSubmit(event as any);
                        }}>Cadastrar</Button>{' '}
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
