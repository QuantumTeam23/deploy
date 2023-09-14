import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import CadastroParceiro from "../componentes/Cadastros&Logins/CadastroParceiro";
import Login from "../componentes/Cadastros&Logins/Login";
import EditarUsuario from "../componentes/Cadastros&Logins/EditarUsuario";
import CadastroEstabelecimento from "../componentes/Cadastros&Logins/CadastroEstabelecimento";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-parceiro" element={<CadastroParceiro />} />
                <Route path="/cadastro-estabelecimento" element={<CadastroEstabelecimento />} />
                <Route path="/editar-usuario" element={<EditarUsuario />} />
                <Route path="/" element={<Navigate to={'/login'} />} />
                <Route path="*" element={<h1>PÁGINA NÃO ENCONTRADA</h1>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default Rotas;