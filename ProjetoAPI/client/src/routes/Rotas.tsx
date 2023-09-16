import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "../componentes/Cadastros&Logins/Login";
import EditarUsuario from "../componentes/Edição/EditarUsuario";
import CadastroEstabelecimento from "../componentes/Cadastros&Logins/CadastroEstabelecimento";
import CadastroParceiro from "../componentes/Cadastros&Logins/CadastroParceiro";
import Recuperacao from "../componentes/Cadastros&Logins/Recuperacao";
import Token from "../componentes/Cadastros&Logins/Token"
import Usuario from "../componentes/Cadastros&Logins/Usuario";
import EditarSenha from "../componentes/Cadastros&Logins/EditarSenha";
import PainelAdminControlUser from "../componentes/PainelAdmin/PainelAdminControlUser";
import HistoricoTransacoes from "../componentes/PainelAdmin/PainelAdminHistTransacoes";
import PainelParceiroCarteiraEstab from "../componentes/PainelParceiro/PainelCarteiraEstab";
import PainelParceiroColetas from "../componentes/PainelParceiro/PainelColetas";
import PainelHistoricoCompra from "../componentes/PainelParceiro/PainelHistóricoCompra";
import PainelEstabelecimentoHistorico from "../componentes/PainelEstabelecimento/PainelEstabelecimentoHistoricoCompras";
import PainelEstabelecimentoExtrato from "../componentes/PainelEstabelecimento/PainelEstabelecimentoExtrato";
import PainelParceiroSaldoCredito from "../componentes/PainelParceiro/PainelSaldoCredito";


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
                
                
                <Route path="/painel-administrador-usuario" element={<PainelAdminControlUser />} />
                <Route path="/painel-administrador-transacoes" element={<HistoricoTransacoes />} />
                <Route path="/painel-parceiro-carteira-estabelecimento" element={<PainelParceiroCarteiraEstab/>} />
                <Route path="/painel-parceiro-coleta" element={<PainelParceiroColetas/>} />
                <Route path="/painel-parceiro-historico-compra" element={<PainelHistoricoCompra/>} />
                <Route path="/painel-parceiro-saldo-credito" element={<PainelParceiroSaldoCredito/>} />
                <Route path="/painel-estabelecimento-historico-compras" element={<PainelEstabelecimentoHistorico/>} />
                <Route path="/painel-estabelecimento-extrato" element={<PainelEstabelecimentoExtrato/>} />

                
                <Route path="/" element={<Navigate to={'/login'} />} />
                <Route path="*" element={<h1>PÁGINA NÃO ENCONTRADA</h1>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default Rotas;