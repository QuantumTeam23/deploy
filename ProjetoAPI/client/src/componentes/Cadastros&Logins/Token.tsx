import '../styles/Token.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, { ChangeEvent, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

interface FormDataToken {
    token: string;
    showEmptyFieldsAlert: boolean;
    valido: boolean;
}

function Token() {
    const [formDataToken, setFormDataToken] = useState<FormDataToken>({
        token: '',
        showEmptyFieldsAlert: false,
        valido: false,
    });

    const { token, showEmptyFieldsAlert, valido } = formDataToken;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFormDataToken((prevState) => ({
            ...prevState,
            token: value,
        }));
    };

    const handleSubmit = () => {
        if (token === '') {
            setFormDataToken((prevState) => ({
                ...prevState,
                showEmptyFieldsAlert: true,
            }));

            setTimeout(() => {
                setFormDataToken((prevState) => ({
                    ...prevState,
                    showEmptyFieldsAlert: false,
                }));
            }, 5000);
            return;
        }
        const tokenArmazenado = localStorage.getItem('token');

        if (tokenArmazenado === token) {
            setFormDataToken((prevState) => ({
                ...prevState,
                valido: true,
            }));

            setTimeout(() => {
                window.location.href = "/editar-senha";
            }, 2000);
        } else {
            setFormDataToken((prevState) => ({
                ...prevState,
                valido: false,
            }));
        }
    };

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
                        {showEmptyFieldsAlert && (
                            <Alert variant="danger">Preencha o campo do formulário.</Alert>
                        )}
                        {valido && (
                            <Alert variant="success">Token válido</Alert>
                        )}
                        {token && !valido && (
                            <Alert variant="danger">Token inválido</Alert>
                        )}

                        <div className='campo-token'>
                            <Form.Group controlId='email'>
                                <Form.Label>Insira o TOKEN</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        value={token}
                                        onChange={handleInputChange}
                                        required
                                        placeholder='Digite seu TOKEN'
                                        aria-label='Token'
                                        aria-describedby='email-addon'
                                        className='form-control-token'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-token'>
                        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>{' '}
                    </span>
                    <span className='botao-reenviar-token'>
                        <Button variant="secundary">Reenviar token</Button>{' '}
                    </span>
                    <div className='volta-login-token'>
                        <p>Voltar para a página de <a href="/login">Login</a></p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Token;
