import Footer from "../Footer/Footer";
import "../styles/TransacaoDoacao.css";
import NavbarTransacaoDoacao from "../Navbars/NavbarDoacao";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import TransacaoPopup from "./TransacaoPopup";

function TransacaoDoacao() {
  const [razoesSociais, setRazoesSociais] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [volumeOleo, setVolumeOleo] = useState("");
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState("");


  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleConfirm = () => {
    // Verifique se os campos foram preenchidos
    if (!volumeOleo || !selectedEstabelecimento) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const idParceiro = localStorage.getItem("idParceiro");

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
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setVolumeOleo("");
          setSelectedEstabelecimento("");
        } else {
          alert("Ocorreu um erro ao processar a transação.");
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
        alert("Ocorreu um erro ao enviar os dados.");
      });
  };

  useEffect(() => {
    // Fazer uma chamada de API para obter os estabelecimentos
    fetch("http://localhost:3001/listEstabelecimento")
      .then((response) => response.json())
      .then((data) => {
        // Extrair a razão social de cada estabelecimento
        const razoesSociais = data.map((estabelecimento: any) => estabelecimento.estabelecimento_razao_social);
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
                placeholder="Ex: 50.00"
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
            <Button style={{ fontSize: 18, marginTop: "2%" }} variant="success">
              Voltar
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      {/* {popupOpen && (
        <TransacaoPopup open={popupOpen} onClose={handleClosePopup} />
      )} */}
    </>
  );
}

export default TransacaoDoacao;

