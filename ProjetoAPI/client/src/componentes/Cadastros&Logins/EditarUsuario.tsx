import React, { useState, ChangeEvent } from 'react';
import '../styles/EditarUsuario.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

interface FormState {
    razao_social: string;
    nome_fantasia: string;
    email: string;
    senha: string;
    cnpj: string;
    showEmptyFieldsAlert: boolean;
}

function EditarUsuario() {
    const [formState, setFormState] = useState<FormState>({
        razao_social: '',
        nome_fantasia: '',
        email: '',
        senha: '',
        cnpj: '',
        showEmptyFieldsAlert: false,
    });

    const { razao_social, nome_fantasia, email, senha, cnpj, showEmptyFieldsAlert } = formState;

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>
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
            const response = await fetch('http://localhost:3001/editParceiro/:cnpj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    razao_social: razao_social,
                    nome_fantasia: nome_fantasia,
                    email: email,
                    senha: senha,
                    cnpj: cnpj,
 
                }),
            });

            if (response.status === 200) {
                console.log('Parceiro atualizado com sucesso!');
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
        console.log('Usuário editado com sucesso!');
    
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
                            <Form.Group controlId='razao_social'>
                                <Form.Label>Nome</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='razao_social'
                                        required
                                        placeholder='Digite seu nome'
                                        aria-label='razao_social'
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
                    <Container>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='cnpj'>
                                <Form.Label>CNPJ</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='cnpj'
                                        required
                                        placeholder='Digite seu cnpj'
                                        aria-label='cnpj'
                                        aria-describedby='cnpj-addon'
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