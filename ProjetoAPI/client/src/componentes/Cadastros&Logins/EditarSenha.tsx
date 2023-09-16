import '../styles/EditarSenha.css';
import React, { ChangeEvent, useState } from 'react';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

interface FormDataEditarSenha {
    novaSenha: string;
    repetirSenha: string;
    showEmptyFieldsAlert: boolean;
    alterado: boolean;
    diferente: boolean;
}

function EditarSenha() {
    const [formData, setFormData] = useState<FormDataEditarSenha>({
        novaSenha: '',
        repetirSenha: '',
        showEmptyFieldsAlert: false,
        alterado: false,
        diferente: false,
    });

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setFormData((prevState) => ({
            ...prevState,
            diferente: false, // Reseta o estado diferente para false
        }));
        if (formData.novaSenha !== formData.repetirSenha) {
            setFormData((prevState) => ({
                ...prevState,
                diferente: true, // Define o estado diferente como true se as senhas não coincidirem
            }));
            return;
        }

        if (!formData.novaSenha || !formData.repetirSenha) {
            setFormData((prevState) => ({
                ...prevState,
                showEmptyFieldsAlert: true,
            }));
            return;
        }

        const email = localStorage.getItem('email');

        if (!email) {
            alert('Email não encontrado no localStorage.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/editSenha/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senha: formData.novaSenha,
                }),
            });

            if (response.status === 200) {
                setFormData((prevState) => ({
                    ...prevState,
                    alterado: true,
                }));

                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                const data = await response.json();
                alert(`Erro ao alterar a senha: ${data.msg}`);
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            alert('Erro ao fazer a requisição.');
        }
    };

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
                        {formData.showEmptyFieldsAlert && (
                            <Alert variant="danger">Preencha o campo do formulário.</Alert>
                        )}
                        {formData.alterado && (
                            <Alert variant="success">Senha alterada com sucesso!</Alert>
                        )}
                        {formData.diferente && (
                            <Alert variant="danger">Senhas não coincidem!</Alert>
                        )}
                        <div className='campo-editarsenha'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Nova senha</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='password'
<<<<<<< HEAD
                                        name ='novaSenha'
                                        onChange={handleInputChange}
=======
>>>>>>> 787fc18af4dd4a7f2a349e08bf7999c9956b1107
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
<<<<<<< HEAD
                                        name = 'repetirSenha'
=======
>>>>>>> 787fc18af4dd4a7f2a349e08bf7999c9956b1107
                                        required
                                        onChange={handleInputChange}
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
                        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>{' '}
                    </span>
                    <div className='volta-login-editarsenha'>
                        <p>Voltar para a página de <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarSenha;
