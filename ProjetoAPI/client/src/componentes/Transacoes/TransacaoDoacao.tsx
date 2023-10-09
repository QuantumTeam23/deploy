import Footer from "../Footer/Footer";
import "../styles/TransacaoDoacao.css";
import NavbarTransacaoDoacao from "../Navbars/NavbarDoacao";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function TransacaoDoacao() {
  const [razoesSociais, setRazoesSociais] = useState([]);
  const [volumeOleo, setVolumeOleo] = useState("");
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState("");
  const navigate = useNavigate()

  const msgSucesso = () => {
    Swal.fire({
      title: "Sucesso",
      icon: 'success',
      text: 'Transação concluida',
      confirmButtonColor: '#de940a'
    })
  }

  const handleConfirm = () => {
    // Verifique se os campos foram preenchidos
    if (!volumeOleo || !selectedEstabelecimento) {
      Swal.fire("Erro", "Por favor, preencha todos os campos.", "error");
      return;
    }
  
    const idParceiro = localStorage.getItem("idParceiro");
    const idEstabelecimento = localStorage.getItem("idParceiro")
    const quantidadeMoedas = parseFloat(volumeOleo) * 100
    const quantidadeMoedasString = quantidadeMoedas.toString()
  
    // Exibir uma janela de confirmação usando Swal
    Swal.fire({
      title: "Confirmar Transação",
      text: `Você está doando ${quantidadeMoedas} Créditos Greennneat para o estabelecimento ${selectedEstabelecimento}, por ${volumeOleo} litros de óleo.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#198754',
      cancelButtonColor: '#ffc107'
    }).then((result) => {
      if (result.isConfirmed) {
        // O usuário confirmou, execute a função fetch
        fetch(`http://localhost:3001/transacaoParceiroEstab/${idParceiro}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            volumeOleo: parseFloat(volumeOleo), // Converter para número
            estabelecimento: selectedEstabelecimento,
          }),
        })
        .then((response) => {
          if (response.status === 500) {
            Swal.fire("Erro", "Saldo Insuficiente para realizar essa transação.", "error");
            throw new Error("Saldo do parceiro é igual a 0.00.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            Swal.fire("Sucesso", "Transação concluída com sucesso.", "success");
          } else {
            console.log("Erro", "Ocorreu um erro ao processar a transação.", "error");
          }
        })
        fetch("http://localhost:3001/insertAcaoTransacoes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            volumeOleo: parseFloat(volumeOleo),
            idParceiro: idParceiro,
            quantidadeMoedasString: quantidadeMoedasString,
            idEstabelecimento: idEstabelecimento,
          }),
        })
          .catch((error) => {
            console.error("Erro ao enviar os dados:", error);
          });
          setVolumeOleo("");
          setSelectedEstabelecimento("");
          msgSucesso()
      }
    });
  };

  useEffect(() => {

    const idParceiro = localStorage.getItem('idParceiro')

    // Fazer uma chamada de API para obter os estabelecimentos
    fetch(`http://localhost:3001/listCarteira/${idParceiro}`)
      .then((response) => response.json())
      .then((data) => {
        // Extrair a razão social de cada estabelecimento
        const razoesSociais = data.map((estabelecimento: any) => estabelecimento.estabelecimento_razao_social);
        // const idEstabelecimento = data.map((estabelecimento: any) => estabelecimento.estabelecimento_id)
        setRazoesSociais(razoesSociais);
      })
      .catch((error) => {
        console.error("Erro ao buscar estabelecimentos:", error);
      });
  }, []);

  return (
    <>
      <NavbarTransacaoDoacao />
      <div className="container" style={{ marginTop: "5%", width: "60%" }}>
        <div className="campo-inserir-valor">
          <div style={{ marginBottom: "3%" }}>
            <h3>Informe o volume de óleo, em litros, entregue pelo estabelecimento!</h3>
          </div>
          <Form.Group controlId="volumeOleo">
            <InputGroup style={{ marginBottom: "3%" }}>
              <FormControl
                type="volumeOleo"
                required
                placeholder="Ex: 1.5"
                aria-label="volume oleo"
                aria-describedby="valor-addon"
                className="form-control-transacao"
                value={volumeOleo}
                onChange={(e) => setVolumeOleo(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <div style={{ marginBottom: "3%" }}>
              <h3>Informe qual estabelecimento está realizando a entrega:</h3>
            </div>
            <Form.Control
              as="select"
              required
              className="form-control-transacao"
              style={{ marginBottom: "3%" }}
              value={selectedEstabelecimento}
              onChange={(e) => setSelectedEstabelecimento(e.target.value)}
            >
              <option value="">Selecione o Estabelecimento</option>
              {razoesSociais.map((razaoSocial) => (
                <option key={razaoSocial} value={razaoSocial}>
                  {razaoSocial}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div style={{ textAlign: "center", marginTop: "1%" }}>
            <Button
              style={{ fontSize: 18, marginRight: "2%", marginTop: "2%" }}
              variant="success"
              onClick={handleConfirm}
            >
              Confirmar
            </Button>
            <Button style={{ fontSize: 18, marginTop: "2%", color: 'white' }} variant="warning" onClick={ () => navigate('/painel-parceiro-saldo-credito')}>
              Voltar
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TransacaoDoacao;

