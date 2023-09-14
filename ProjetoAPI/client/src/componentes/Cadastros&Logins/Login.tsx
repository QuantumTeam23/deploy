import { useState } from 'react';
import '../styles/Login.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("" as any);
    const [password, setPassword] = useState("" as any);
    const navigate = useNavigate()
    

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            
        })
        const data = await response.json()
        console.log(data)

        if (data.msg === "Usuário logado com sucesso.") {
            navigate('/cadastro-parceiro')
        }
        
    }



    return (
        <div className='container-geral-login'>
            <div className="container-janela-login">
                <div className='container-esquerda-login'>
                    <span className='logo-login'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-login'>
                    <div>
                        <span className='titulo-login'>
                            <h1>Acesse a Plataforma</h1>
                        </span>
                    </div>
                    <div className='subtitulo-login'>
                        <h3>Faça login ou registre-se para acessar <p>nossa plataforma</p></h3>
                    </div>
                    <Container>
                        <div className='campo-login-1'>
                            <Form.Group controlId='email'>
                                <Form.Label>E-mail</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='email'
                                        required
                                        placeholder='Digite seu e-mail'
                                        aria-label='E-mail'
                                        aria-describedby='email-addon'
                                        className='form-control-login-1'
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container>
                        <div className='campo-login-2'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Senha</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='senha'
                                        required
                                        placeholder='Digite sua senha'
                                        aria-label='Senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-login-2'
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <div className='esqueceu-senha-login'>
                        <a href="#">Esqueceu a senha?</a>
                    </div>
                    <span className='botao-login'>
                    <Button variant="success" onClick={handleSubmit}>Entrar</Button>{' '}
                    </span>
                    <div className='registro-login'>
                        <p>Ainda não tem conta? <a href="#">Registre-se</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;