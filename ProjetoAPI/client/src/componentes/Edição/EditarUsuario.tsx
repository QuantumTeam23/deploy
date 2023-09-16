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
                <div className='container-direita-editar-usuario'>
                    <div className='titulo-editar-usuario'>
                        <h1>Editar Usuário</h1>
                    </div>
                    <div className='campos-editar-usuario'>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <InputGroup>
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
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Senha</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='password'
                                        required
                                        placeholder='Digite seu Senha'
                                        aria-label='senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='logradouro'>
                                <Form.Label>Logradouro</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite seu logradouro'
                                        aria-label='logradouro'
                                        aria-describedby='logradouro-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='numero'>
                                <Form.Label>Número</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o número'
                                        aria-label='numero'
                                        aria-describedby='numero-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='bairro'>
                                <Form.Label>Bairro</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o bairro'
                                        aria-label='bairro'
                                        aria-describedby='bairro-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='cidade'>
                                <Form.Label>Cidade</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite a cidade'
                                        aria-label='cidade'
                                        aria-describedby='cidade-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='estado'>
                                <Form.Label>Estado</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o estado'
                                        aria-label='estado'
                                        aria-describedby='estado-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='cep'>
                                <Form.Label>CEP</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o CEP'
                                        aria-label='cep'
                                        aria-describedby='cep-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='regiao'>
                                <Form.Label>Região</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite a região'
                                        aria-label='regiao'
                                        aria-describedby='regiao-addon'
                                        className='form-control-editar-usuario'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='botoes-editar-usuario'>
                        <Button variant="danger">Cancelar</Button>
                        <Button variant="success">Editar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarUsuario;