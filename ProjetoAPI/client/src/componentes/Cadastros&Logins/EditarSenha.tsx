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

const handleLogout = () => {
    localStorage.clear();
};

function EditarSenha() {
    const [usuarioDados, setUsuarioDados] = useState({
        senha: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUsuarioDados((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleEdit = () => {
        const idUser = localStorage.getItem('idUser')
        const tipo = localStorage.getItem('tipo')

            fetch(`http://localhost:3001/editSenhaRec/${idUser}/${tipo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({usuarioDados}),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao editar dados');
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados editados com sucesso:', data);
            })
            .catch(error => {
                console.error('Erro ao editar dados:', error);
            });
        localStorage.clear()

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

                        <div className='campo-editarsenha'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Nova senha</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='password'
                                        name ='novaSenha'
                                        onChange={handleInputChange}
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
                                        name = 'repetirSenha'
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
                        <Button variant="success" onClick={handleEdit}>Confirmar</Button>{' '}
                    </span>
                    <div className='volta-login-editarsenha'>
                        <p>Voltar para a página de <a href="/login" onClick={handleLogout}>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarSenha;