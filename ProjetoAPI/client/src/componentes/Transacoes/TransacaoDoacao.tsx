import Footer from "../Footer/Footer";
import "../styles/TransacaoDoacao.css";
import NavbarTransacaoDoacao from "../Navbars/NavbarDoacao";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";
import TransacaoPopup from "./TransacaoPopup";

function TransacaoDoacao() {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

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
            >
              <option value="">Selecione o Estabelecimento</option>
              <option value="Cooperativas">Estabelecimento teste 1</option>
            </Form.Control>
          </Form.Group>
          <div style={{textAlign:"center", marginTop:"1%"}}>
            <Button 
              style={{ fontSize: 18, marginRight: "2%", marginTop:"2%" }}
              variant="success"
              onClick={handleOpenPopup}
            >
              Confirmar
            </Button>
            <Button style={{ fontSize: 18, marginTop:"2%"}} variant="success">
              Voltar
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      {popupOpen && (
        <TransacaoPopup open={popupOpen} onClose={handleClosePopup} />
      )}
    </>
  );
}

export default TransacaoDoacao;

