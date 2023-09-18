import React, { ChangeEvent, useEffect, useState } from 'react';
import '../styles/EditarUsuario.css';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function EditarUsuario() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: '',
        senha: '',
        logradouro: '',
        logradouroNumero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        regiao: '',
    });

    useEffect(() => {
        // Recupere os dados do localStorage quando o componente for montado
        const userDataFromLocalStorage = localStorage.getItem('parceiroData');
        if (userDataFromLocalStorage !== null) {
            try {
                const parsedData = JSON.parse(userDataFromLocalStorage);
                setUserData(parsedData);
            } catch (error) {   
                // Se ocorrer um erro de análise JSON, você pode lidar com ele aqui.
                console.error('Erro ao analisar os dados do localStorage:', error);
            }
        }
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleBack = () => {
        setTimeout(() => {
            navigate('/painel-parceiro-historico-compra');
        }, 500);
        localStorage.removeItem('parceiroData')
    }

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
                                        defaultValue = {userData.email}
                                        onChange={handleInputChange}    
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
                                        placeholder='Digite sua Senha'
                                        aria-label='senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue = {userData.senha}
                                        onChange={handleInputChange}  
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
                                        defaultValue = {userData.logradouro}
                                        onChange={handleInputChange}  
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
                                        defaultValue = {userData.logradouroNumero}
                                        onChange={handleInputChange}  
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
                                        defaultValue = {userData.bairro}
                                        onChange={handleInputChange}  
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
                                        defaultValue = {userData.cidade}
                                        onChange={handleInputChange}  
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
                                        defaultValue = {userData.estado}
                                        onChange={handleInputChange}  
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
                                        defaultValue = {userData.cep}
                                        onChange={handleInputChange}  
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
                                        defaultValue = {userData.regiao}
                                        onChange={handleInputChange}  
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='botoes-editar-usuario'>
                        <Button variant="danger" onClick={handleBack}>Cancelar</Button>
                        <Button variant="success">Editar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarUsuario;