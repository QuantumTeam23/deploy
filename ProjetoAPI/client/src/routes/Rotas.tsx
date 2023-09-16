import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "../componentes/Cadastros&Logins/Login";
import EditarUsuario from "../componentes/Edição/EditarUsuario";
import CadastroEstabelecimento from "../componentes/Cadastros&Logins/CadastroEstabelecimento";
import CadastroParceiro from "../componentes/Cadastros&Logins/CadastroParceiro";
import Recuperacao from "../componentes/Cadastros&Logins/Recuperacao";
import Token from "../componentes/Cadastros&Logins/Token"
import Usuario from "../componentes/Cadastros&Logins/Usuario";
import EditarSenha from "../componentes/Cadastros&Logins/EditarSenha";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-estabelecimento" element={<CadastroEstabelecimento />} />
                <Route path="/cadastro-parceiro" element={<CadastroParceiro/>} />
                <Route path="/recuperacao" element={<Recuperacao/>} />
                <Route path="/token" element={<Token/>} />
                <Route path="/usuario" element={<Usuario/>} />
                <Route path="/editar-usuario" element={<EditarUsuario />} />
                <Route path="/editar-senha" element={<EditarSenha />} />
                <Route path="/" element={<Navigate to={'/login'} />} />
                <Route path="*" element={<h1>PÁGINA NÃO ENCONTRADA</h1>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default Rotas;