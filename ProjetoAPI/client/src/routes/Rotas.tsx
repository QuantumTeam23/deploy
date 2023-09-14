import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import CadastroParceiro from "../componentes/Cadastros&Logins/CadastroParceiro";
import Login from "../componentes/Cadastros&Logins/Login";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-parceiro" element={<CadastroParceiro />} />
                <Route path="/" element={<Navigate to={'/login'} />} />
                <Route path="*" element={<h1>PÁGINA NÃO ENCONTRADA</h1>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default Rotas;